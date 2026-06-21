/**
 * Business-type tagging + likely-service detection.
 *
 * Turns free-text intake answers into (a) a best-guess business-type tag for
 * the dashboard, and (b) a ranked list of the services this owner most likely
 * needs — used in the confirmation page's internal advisor summary and on the
 * lead detail view.
 */

import type { LeadLike } from "./scoring";

export type BusinessType =
  | "Maker / artisan"
  | "Woodworker / furniture"
  | "Food / baker"
  | "Farm / grower"
  | "Landscaping / home services"
  | "Contractor / trades"
  | "Boutique retail"
  | "Wellness / personal care"
  | "Hospitality"
  | "E-commerce seller"
  | "Other owner-operated";

// Substring matching (no trailing word boundary) so plurals like "cutting
// boards" and compounds like "hardwood" classify correctly. Order matters —
// product-type signals are checked before channel signals (e-commerce), so the
// butcher-block maker reads as a woodworker even though they sell on Amazon.
// Product-type signals are matched against WHAT the owner sells (not where),
// so a sales channel like "Farmers markets" never makes a bakery a farm.
// Substring matching handles plurals ("cutting boards") and compounds
// ("hardwood"). Order is the tie-breaker when a description spans categories.
const TYPE_KEYWORDS: [BusinessType, RegExp][] = [
  ["Woodworker / furniture", /(wood|cutting board|butcher block|charcuterie board|furniture|cabinet|carpentr|joiner|lumber|built-in|bench works)/i],
  ["Farm / grower", /(oyster|shellfish|clam|farm stand|grower|produce|vegetable|flower|nursery|csa|orchard|raw bar)/i],
  ["Food / baker", /(bak|bread|sourdough|pastr|pie|cake|jam|honey|sauce|spice|coffee|chocolate|cheese|catering|granola|pickle|provisions|pantry)/i],
  ["Landscaping / home services", /(landscap|lawn|garden|yard|tree service|hardscape|irrigation|cleaning|plow|snow)/i],
  ["Contractor / trades", /(contractor|builder|remodel|renov|painting|plumb|electric|hvac|roofing|mason|tile|deck|handyman)/i],
  ["Wellness / personal care", /(wellness|spa|massage|yoga|salon|skincare|skin care|esthet|therap|fitness|nutrition)/i],
  ["Hospitality", /(restaurant|cafe|inn|hotel|bnb|bed and breakfast|brewery|tavern|hospitality|tour|charter)/i],
  ["Maker / artisan", /(handmade|artisan|craft|ceram|pottery|leather|textile|weav|knit|candle|soap)/i],
  ["Boutique retail", /(boutique|retail|apparel|clothing|jewelry|gift|home goods|accessor)/i],
];

const ECOMMERCE_RE = /(ecommerce|e-commerce|online store|amazon|etsy|shopify|dropship|fulfillment)/i;

export function classifyBusinessType(lead: { whatTheySell: string; whereTheySell: string }): BusinessType {
  for (const [type, re] of TYPE_KEYWORDS) {
    if (re.test(lead.whatTheySell)) return type;
  }
  // Fall back to an e-commerce tag only if nothing about the product matched
  // but the channels are clearly online-first.
  if (ECOMMERCE_RE.test(lead.whereTheySell) || ECOMMERCE_RE.test(lead.whatTheySell)) {
    return "E-commerce seller";
  }
  return "Other owner-operated";
}

export type ServiceNeed = {
  slug: string;
  label: string;
  reason: string;
  weight: number; // 0–100 confidence/priority
};

/**
 * Maps intake answers to the service catalog. Returns a ranked list — highest
 * weight first. Service slugs match src/content/services.ts.
 */
export function detectServiceNeeds(lead: LeadLike): ServiceNeed[] {
  const needs: ServiceNeed[] = [];
  const push = (slug: string, label: string, reason: string, weight: number) =>
    needs.push({ slug, label, reason, weight });

  if (lead.behindOnBooks === "yes")
    push("financial-cleanup", "Financial Cleanup & Visibility", "Behind on bookkeeping", 92);
  else if (lead.behindOnBooks === "a_little")
    push("financial-cleanup", "Financial Cleanup & Visibility", "A little behind on books", 64);

  if (lead.accountingSystem === "shoebox" || lead.accountingSystem === "accountant_only")
    push("quickbooks", "QuickBooks Setup or Repair", "No day-to-day accounting system", 88);
  else if (lead.accountingSystem === "spreadsheets")
    push("quickbooks", "QuickBooks Setup or Repair", "Running on spreadsheets", 70);

  if (lead.confidentInPricing !== "yes" || lead.knowsProfitability !== "yes")
    push(
      "pricing-profitability",
      "Pricing & Profitability Review",
      lead.knowsProfitability === "no" ? "Doesn't know what's profitable" : "Unsure on pricing/margins",
      lead.knowsProfitability === "no" ? 90 : 72,
    );

  if (lead.cashFlowStruggle === "yes")
    push("cash-flow", "Cash Flow & Seasonal Planning", "Active cash-flow pressure", 85);
  else if (lead.cashFlowStruggle === "sometimes")
    push("cash-flow", "Cash Flow & Seasonal Planning", "Occasional cash-flow strain (seasonal)", 58);

  if (lead.needsOnlineHelp)
    push("ecommerce-ops", "E-Commerce & Marketplace Operations", "Wants help with online sales / orders", 80);

  if (lead.needsTaxHelp)
    push("tax-readiness", "Tax Readiness & Year-End Cleanup", "Wants help getting ready for taxes", 76);

  const channels = lead.whereTheySell.split(",").filter((s) => s.trim()).length;
  if (channels >= 3)
    push("inventory-orders", "Inventory & Order Management", `Selling across ${channels} channels`, 68);

  if (lead.engagementInterest === "monthly")
    push("owner-dashboard", "Owner Dashboard & Monthly Review", "Asked about ongoing monthly support", 74);

  // Systems buildout for multi-channel + multi-person operations.
  if (channels >= 3 && (lead.headcount === "3_5" || lead.headcount === "6_15" || lead.headcount === "16_plus"))
    push("systems-buildout", "Small Business Systems Buildout", "Multi-channel team — needs connected systems", 66);

  // Fractional controller for larger/recurring-fit operations.
  if ((lead.revenueRange === "500k_1m" || lead.revenueRange === "1m_3m" || lead.revenueRange === "over_3m") &&
      lead.engagementInterest !== "one_time")
    push("fractional-finance", "Fractional Finance / Controller Support", "Scale + interest in ongoing partnership", 64);

  // Always-valid entry point if nothing else fired strongly.
  if (needs.length === 0)
    push("clarity-session", "Business Clarity Session", "Start with a clarity session to find the bottleneck", 50);

  return needs.sort((a, b) => b.weight - a.weight);
}

/** A short, plain-English summary line for the dashboard / confirmation. */
export function summarizeNeeds(lead: { whatTheySell: string; whereTheySell: string } & LeadLike): {
  type: BusinessType;
  needs: ServiceNeed[];
  topNeeds: ServiceNeed[];
  summary: string;
} {
  const type = classifyBusinessType(lead);
  const needs = detectServiceNeeds(lead);
  const topNeeds = needs.slice(0, 3);
  const summary =
    `Looks like a ${type.toLowerCase()} operation. ` +
    `Most likely starting points: ${topNeeds.map((n) => n.label).join(", ")}.`;
  return { type, needs, topNeeds, summary };
}
