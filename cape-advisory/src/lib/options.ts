/**
 * Shared option sets used by the intake form, the scoring engine, and the
 * dashboard. Keeping them in one place keeps labels and values consistent.
 */

export const REVENUE_RANGES = [
  { value: "under_100k", label: "Under $100k" },
  { value: "100k_250k", label: "$100k – $250k" },
  { value: "250k_500k", label: "$250k – $500k" },
  { value: "500k_1m", label: "$500k – $1M" },
  { value: "1m_3m", label: "$1M – $3M" },
  { value: "over_3m", label: "Over $3M" },
  { value: "prefer_not", label: "Prefer not to say" },
] as const;

export const HEADCOUNT_BANDS = [
  { value: "just_me", label: "Just me" },
  { value: "1_2", label: "1–2 people" },
  { value: "3_5", label: "3–5 people" },
  { value: "6_15", label: "6–15 people" },
  { value: "16_plus", label: "16+ people" },
] as const;

export const ACCOUNTING_SYSTEMS = [
  { value: "quickbooks_online", label: "QuickBooks Online" },
  { value: "quickbooks_desktop", label: "QuickBooks Desktop" },
  { value: "xero", label: "Xero" },
  { value: "wave", label: "Wave" },
  { value: "spreadsheets", label: "Spreadsheets" },
  { value: "shoebox", label: "Notebook / shoebox / nothing formal" },
  { value: "accountant_only", label: "My accountant handles it at tax time" },
  { value: "other", label: "Other" },
] as const;

export const SALES_CHANNELS = [
  "Farmers markets",
  "Mashpee Commons",
  "Local fairs / craft shows",
  "Storefront / studio",
  "Shopify",
  "Etsy",
  "Amazon",
  "Square",
  "Instagram / Facebook",
  "Word of mouth",
  "Wholesale / vendors",
] as const;

export const SCALE_3 = [
  { value: "yes", label: "Yes" },
  { value: "somewhat", label: "Somewhat" },
  { value: "no", label: "No" },
] as const;

export const BOOKS_SCALE = [
  { value: "no", label: "No — caught up" },
  { value: "a_little", label: "A little behind" },
  { value: "yes", label: "Yes — behind" },
] as const;

export const CASHFLOW_SCALE = [
  { value: "no", label: "Rarely" },
  { value: "sometimes", label: "Sometimes" },
  { value: "yes", label: "Often" },
] as const;

export const ENGAGEMENT_INTEREST = [
  { value: "one_time", label: "A one-time project / cleanup" },
  { value: "monthly", label: "Ongoing monthly support" },
  { value: "unsure", label: "Not sure yet — just want clarity" },
] as const;

export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "scheduled", label: "Session scheduled" },
  { value: "roadmap_sent", label: "Roadmap sent" },
  { value: "client", label: "Client" },
  { value: "archived", label: "Archived" },
] as const;

export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string | null | undefined,
): string {
  if (!value) return "—";
  return options.find((o) => o.value === value)?.label ?? value;
}
