/**
 * Business Clarity Roadmap generator.
 *
 * Synthesizes a *draft* one-page roadmap from a lead's intake + scoring +
 * detected needs. The advisor reviews/edits it on the dashboard before
 * sending. Intentionally avoids unsupported financial claims — impact is
 * expressed as categories (time, visibility, margin clarity), never dollars.
 */

import { detectServiceNeeds, classifyBusinessType, type ServiceNeed } from "./classify";
import { scoreLead, type LeadLike } from "./scoring";
import { labelFor, REVENUE_RANGES, HEADCOUNT_BANDS, ACCOUNTING_SYSTEMS } from "./options";

export type RoadmapDraft = {
  snapshot: string;
  topIssues: string[];
  immediateWins: string[];
  priorities30: string[];
  priorities90: string[];
  systemRecs: string[];
  engagement: string;
  impactAreas: string[];
};

type RoadmapLead = LeadLike & {
  businessName: string;
  ownerName: string;
  town: string;
  whatTheySell: string;
  whereTheySell: string;
};

export function generateRoadmapDraft(lead: RoadmapLead): RoadmapDraft {
  const type = classifyBusinessType(lead);
  const needs = detectServiceNeeds(lead);
  const score = scoreLead(lead);
  const channels = lead.whereTheySell.split(",").map((s) => s.trim()).filter(Boolean);

  const snapshot = buildSnapshot(lead, type, channels);
  const topIssues = buildTopIssues(lead, needs);
  const immediateWins = buildImmediateWins(lead, needs);
  const priorities30 = buildPriorities30(lead, needs);
  const priorities90 = buildPriorities90(lead, needs, score);
  const systemRecs = buildSystemRecs(lead, channels);
  const engagement = buildEngagement(lead, score, needs);
  const impactAreas = buildImpactAreas(lead, needs);

  return { snapshot, topIssues, immediateWins, priorities30, priorities90, systemRecs, engagement, impactAreas };
}

function buildSnapshot(lead: RoadmapLead, type: string, channels: string[]): string {
  const rev = labelFor(REVENUE_RANGES, lead.revenueRange);
  const team = labelFor(HEADCOUNT_BANDS, lead.headcount);
  const sys = labelFor(ACCOUNTING_SYSTEMS, lead.accountingSystem);
  const channelText = channels.length ? channels.join(", ") : "a few channels";
  return (
    `${lead.businessName} is a ${type.toLowerCase()} based in ${lead.town || "on the Cape"}, run by ${lead.ownerName}. ` +
    `The business sells ${lead.whatTheySell.toLowerCase()} through ${channelText}, in the ${rev} range with ${team.toLowerCase()} on the team. ` +
    `Bookkeeping today runs on ${sys.toLowerCase()}. There is clear product demand; the opportunity is getting the back office organized so the owner spends less time chasing information and more time on the work that grows the business.`
  );
}

function buildTopIssues(lead: RoadmapLead, needs: ServiceNeed[]): string[] {
  // Reuse the detected need reasons (already prioritized) for the top 3.
  const issues = needs.slice(0, 3).map((n) => `${n.label} — ${n.reason.toLowerCase()}.`);
  while (issues.length < 3) {
    issues.push("No consolidated operating view — numbers live in several places at once.");
  }
  return issues.slice(0, 3);
}

function buildImmediateWins(lead: RoadmapLead, needs: ServiceNeed[]): string[] {
  const wins: string[] = [];
  if (needs.some((n) => n.slug === "financial-cleanup"))
    wins.push("Reconnect and reconcile the last few months of bank and card activity so the books reflect reality.");
  if (lead.confidentInPricing !== "yes")
    wins.push("Run a quick margin check on the top 5 products or jobs to confirm each one actually makes money.");
  if (lead.needsOnlineHelp)
    wins.push("Document the current order-to-fulfillment flow for online sales so nothing falls through the cracks.");
  if (lead.cashFlowStruggle !== "no")
    wins.push("Build a simple 8-week cash view so the next slow stretch isn't a surprise.");
  wins.push("Create one shared place for customer requests so custom orders stop living in text messages.");
  return dedupe(wins).slice(0, 4);
}

function buildPriorities30(lead: RoadmapLead, needs: ServiceNeed[]): string[] {
  const items: string[] = [];
  if (needs.some((n) => n.slug === "quickbooks" || n.slug === "financial-cleanup"))
    items.push("Get bookkeeping current and set up a clean, repeatable monthly close routine.");
  if (needs.some((n) => n.slug === "pricing-profitability"))
    items.push("Finish a pricing & profitability pass across products/services and set target margins.");
  if (lead.needsTaxHelp)
    items.push("Organize records and categories so year-end and taxes are a non-event.");
  items.push("Agree on the five numbers to watch every month and where they'll come from.");
  return dedupe(items).slice(0, 4);
}

function buildPriorities90(lead: RoadmapLead, needs: ServiceNeed[], score: ReturnType<typeof scoreLead>): string[] {
  const items: string[] = [];
  if (needs.some((n) => n.slug === "inventory-orders" || n.slug === "ecommerce-ops"))
    items.push("Connect sales channels and inventory so online, market, and wholesale orders share one source of truth.");
  if (needs.some((n) => n.slug === "systems-buildout"))
    items.push("Stand up a lightweight operating system: order intake, fulfillment, customer follow-up, and reporting.");
  items.push("Put a simple owner dashboard in place and hold a short monthly review.");
  if (score.recurringLikelihood !== "low")
    items.push("Decide which recurring tasks to keep in-house vs. hand off, so the owner's time goes to the highest-value work.");
  return dedupe(items).slice(0, 4);
}

function buildSystemRecs(lead: RoadmapLead, channels: string[]): string[] {
  const recs: string[] = [];
  if (lead.accountingSystem !== "quickbooks_online")
    recs.push("QuickBooks Online as the financial backbone, set up for this business (not a generic template).");
  else recs.push("Clean up the existing QuickBooks Online file: chart of accounts, rules, and reconciliations.");

  if (channels.some((c) => /shopify|etsy|amazon|square/i.test(c)) || lead.needsOnlineHelp)
    recs.push("A single order/inventory layer that syncs the storefront, marketplace, and in-person sales.");
  recs.push("One shared inbox or CRM-lite for customer requests and custom-order tracking.");
  recs.push("A monthly close checklist and a one-page owner dashboard for the numbers that matter.");
  return dedupe(recs).slice(0, 4);
}

function buildEngagement(lead: RoadmapLead, score: ReturnType<typeof scoreLead>, needs: ServiceNeed[]): string {
  const hasCleanup = needs.some((n) => n.slug === "financial-cleanup" || n.slug === "quickbooks");
  if (lead.engagementInterest === "one_time" || score.recurringLikelihood === "low") {
    return (
      "Start with a fixed-scope project to get the foundation in place" +
      (hasCleanup ? " (cleanup + system setup)" : "") +
      ", then reassess. No ongoing commitment required — the goal is to hand the business back to you, organized."
    );
  }
  if (score.recurringLikelihood === "high") {
    return (
      "A short setup project to get the books and systems right, then a monthly review engagement: " +
      "we keep the numbers current, run a monthly owner review, and tackle one improvement at a time. Month-to-month, cancel anytime."
    );
  }
  return (
    "Begin with a focused project to fix the top issues, with the option to move to a light monthly review " +
    "once the foundation is solid. Step up or step back as the season demands."
  );
}

function buildImpactAreas(lead: RoadmapLead, needs: ServiceNeed[]): string[] {
  // Categories only — no dollar/percentage claims.
  const areas = new Set<string>();
  areas.add("Owner time — less time chasing numbers and re-entering data.");
  if (needs.some((n) => n.slug === "pricing-profitability"))
    areas.add("Margin clarity — knowing which products, jobs, and channels actually make money.");
  if (lead.cashFlowStruggle !== "no")
    areas.add("Cash-flow visibility — fewer surprises heading into slow seasons.");
  if (lead.needsOnlineHelp || needs.some((n) => n.slug === "inventory-orders"))
    areas.add("Fewer dropped orders — customer requests and online sales handled consistently.");
  areas.add("Decision confidence — one place to look when it's time to make a call.");
  return Array.from(areas).slice(0, 5);
}

function dedupe(arr: string[]): string[] {
  return Array.from(new Set(arr));
}
