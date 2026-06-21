/**
 * Lead scoring + advisory-fit engine.
 *
 * Produces a transparent, explainable score from intake answers. Each
 * dimension the brief calls for is scored independently and weighted, so the
 * advisor can see *why* a lead ranked where it did rather than trusting a
 * black box.
 *
 * Dimensions (per brief):
 *   revenueScale, complexity, currentSystems, urgency, ownerPain,
 *   benefitPotential, recurringLikelihood
 */

export type LeadLike = {
  revenueRange: string;
  headcount: string;
  whereTheySell: string;
  accountingSystem: string;
  cashFlowStruggle: string;
  behindOnBooks: string;
  confidentInPricing: string;
  knowsProfitability: string;
  needsOnlineHelp: boolean;
  needsTaxHelp: boolean;
  engagementInterest: string;
  biggestFrustration: string;
};

export type ScoreDimension = {
  key: string;
  label: string;
  score: number; // 0–100 for this dimension
  note: string;
};

export type LeadScore = {
  total: number; // 0–100 composite
  tier: "A" | "B" | "C";
  tierLabel: string;
  urgency: "high" | "medium" | "low";
  recurringLikelihood: "high" | "medium" | "low";
  dimensions: ScoreDimension[];
  headline: string;
};

const REVENUE_POINTS: Record<string, number> = {
  under_100k: 35,
  "100k_250k": 60,
  "250k_500k": 80,
  "500k_1m": 95,
  "1m_3m": 100,
  over_3m: 85, // may be beyond the ideal owner-operator niche
  prefer_not: 55,
};

const HEADCOUNT_POINTS: Record<string, number> = {
  just_me: 35,
  "1_2": 55,
  "3_5": 80,
  "6_15": 95,
  "16_plus": 85,
};

function channelCount(whereTheySell: string): number {
  return whereTheySell
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function scoreLead(lead: LeadLike): LeadScore {
  // 1. Revenue scale — real revenue is the niche.
  const revenueScale = clamp(REVENUE_POINTS[lead.revenueRange] ?? 50);

  // 2. Complexity — more channels + more people = more operating surface.
  const channels = channelCount(lead.whereTheySell);
  const complexity = clamp(
    HEADCOUNT_POINTS[lead.headcount] ?? 50 * 0.5 +
      Math.min(channels, 5) * 10 +
      (lead.needsOnlineHelp ? 12 : 0),
  );

  // 3. Current systems — weaker systems = bigger gap to close (more value).
  const systemsGap = (() => {
    switch (lead.accountingSystem) {
      case "shoebox":
        return 100;
      case "accountant_only":
        return 90;
      case "spreadsheets":
        return 80;
      case "wave":
        return 55;
      case "xero":
      case "quickbooks_desktop":
        return 45;
      case "quickbooks_online":
        return 35;
      default:
        return 60;
    }
  })();

  // 4. Urgency — taxes, being behind, and cash flow pressure raise urgency.
  const urgencyRaw =
    (lead.behindOnBooks === "yes" ? 40 : lead.behindOnBooks === "a_little" ? 22 : 0) +
    (lead.cashFlowStruggle === "yes" ? 35 : lead.cashFlowStruggle === "sometimes" ? 18 : 0) +
    (lead.needsTaxHelp ? 25 : 0);
  const urgencyScore = clamp(urgencyRaw);

  // 5. Owner pain — self-reported uncertainty on pricing/profit + frustration.
  const painRaw =
    (lead.confidentInPricing === "no" ? 30 : lead.confidentInPricing === "somewhat" ? 18 : 4) +
    (lead.knowsProfitability === "no" ? 30 : lead.knowsProfitability === "somewhat" ? 18 : 4) +
    Math.min(28, Math.round((lead.biggestFrustration?.length ?? 0) / 6));
  const ownerPain = clamp(painRaw);

  // 6. Benefit potential — how much an operator can move the needle.
  const benefitPotential = clamp(
    revenueScale * 0.35 + systemsGap * 0.3 + ownerPain * 0.2 + complexity * 0.15,
  );

  // 7. Recurring likelihood — monthly interest + scale + complexity.
  const recurringRaw =
    (lead.engagementInterest === "monthly" ? 55 : lead.engagementInterest === "unsure" ? 30 : 12) +
    revenueScale * 0.25 +
    complexity * 0.2;
  const recurringScore = clamp(recurringRaw);

  const dimensions: ScoreDimension[] = [
    { key: "revenue", label: "Revenue scale", score: revenueScale, note: revenueNote(revenueScale) },
    { key: "complexity", label: "Operating complexity", score: complexity, note: `${channels || "few"} sales channel(s), ${lead.headcount.replace(/_/g, " ")} team` },
    { key: "systems", label: "Systems gap", score: systemsGap, note: systemsNote(lead.accountingSystem) },
    { key: "urgency", label: "Urgency", score: urgencyScore, note: urgencyNote(lead) },
    { key: "pain", label: "Owner pain", score: ownerPain, note: painNote(lead) },
    { key: "benefit", label: "Benefit potential", score: benefitPotential, note: "Estimated room to improve time, money, or visibility" },
    { key: "recurring", label: "Recurring fit", score: recurringScore, note: recurringNote(lead) },
  ];

  // Composite weighting — favors real revenue, fit, and recurring potential.
  const total = clamp(
    revenueScale * 0.18 +
      complexity * 0.13 +
      systemsGap * 0.14 +
      urgencyScore * 0.16 +
      ownerPain * 0.13 +
      benefitPotential * 0.13 +
      recurringScore * 0.13,
  );

  const tier: LeadScore["tier"] = total >= 72 ? "A" : total >= 52 ? "B" : "C";
  const tierLabel =
    tier === "A"
      ? "Strong fit — prioritize"
      : tier === "B"
        ? "Good fit — worth a session"
        : "Lower fit — nurture";

  const urgency: LeadScore["urgency"] =
    urgencyScore >= 60 ? "high" : urgencyScore >= 30 ? "medium" : "low";
  const recurringLikelihood: LeadScore["recurringLikelihood"] =
    recurringScore >= 60 ? "high" : recurringScore >= 38 ? "medium" : "low";

  return {
    total,
    tier,
    tierLabel,
    urgency,
    recurringLikelihood,
    dimensions,
    headline: buildHeadline(tier, urgency, recurringLikelihood),
  };
}

function revenueNote(s: number): string {
  if (s >= 90) return "Meaningful revenue — squarely in the niche";
  if (s >= 60) return "Real revenue, growing";
  return "Earlier stage — confirm there's real volume";
}
function systemsNote(sys: string): string {
  if (sys === "shoebox" || sys === "accountant_only") return "No working books day-to-day";
  if (sys === "spreadsheets") return "Running on spreadsheets";
  return "Has an accounting tool — likely underused";
}
function urgencyNote(l: LeadLike): string {
  const bits: string[] = [];
  if (l.behindOnBooks === "yes") bits.push("behind on books");
  if (l.cashFlowStruggle === "yes") bits.push("cash-flow pressure");
  if (l.needsTaxHelp) bits.push("tax exposure");
  return bits.length ? `Flagged: ${bits.join(", ")}` : "No acute time pressure flagged";
}
function painNote(l: LeadLike): string {
  const bits: string[] = [];
  if (l.confidentInPricing !== "yes") bits.push("unsure on pricing");
  if (l.knowsProfitability !== "yes") bits.push("unclear profitability");
  return bits.length ? bits.join(", ") : "Feels in control of the numbers";
}
function recurringNote(l: LeadLike): string {
  if (l.engagementInterest === "monthly") return "Asked about ongoing support";
  if (l.engagementInterest === "unsure") return "Open — could convert to monthly";
  return "Looking for a one-time fix (for now)";
}

function buildHeadline(
  tier: LeadScore["tier"],
  urgency: LeadScore["urgency"],
  recurring: LeadScore["recurringLikelihood"],
): string {
  const lead =
    tier === "A"
      ? "High-priority lead."
      : tier === "B"
        ? "Solid opportunity."
        : "Keep warm.";
  const u = urgency === "high" ? " Move quickly — they have active pressure." : urgency === "medium" ? " Some time sensitivity." : "";
  const r = recurring === "high" ? " Good monthly-retainer potential." : recurring === "medium" ? " Possible ongoing work." : "";
  return `${lead}${u}${r}`.trim();
}
