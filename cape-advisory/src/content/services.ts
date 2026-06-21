/**
 * Service catalog — the modular offerings. Each entry uses the same shape so
 * the Services page and lead-needs mapping stay consistent. Slugs match
 * src/lib/classify.ts.
 *
 * Copy rules: plain English, owner problem → outcome → tangible deliverables.
 * No overpromising, no invented results.
 */

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  outcome: string;
  includes: string[];
  format: string; // typical engagement shape
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "clarity-session",
    name: "Business Clarity Session",
    tagline: "The free, no-pressure starting point.",
    problem:
      "You're busy and the business is working, but you're not fully sure where the money or the time is going — and the back office has fallen behind the product.",
    outcome:
      "A clear, honest read on your biggest bottleneck and a one-page roadmap of what to fix first, what can wait, and where you're losing time, money, or visibility.",
    includes: [
      "A one-hour working session (in person on the Cape, or by video)",
      "A walk-through of how you sell, track orders, get paid, and keep books",
      "A plain-English read on your biggest operating bottleneck",
      "A one-page operating roadmap you keep — no obligation to hire anyone",
    ],
    format: "Free · ~1 hour · no commitment",
    featured: true,
  },
  {
    slug: "financial-cleanup",
    name: "Financial Cleanup & Visibility",
    tagline: "Get the books to tell the truth again.",
    problem:
      "The bookkeeping is behind, miscategorized, or only exists for tax time — so you can't trust the numbers to make a decision.",
    outcome:
      "Books that are current and accurate, plus a simple monthly view you'll actually look at.",
    includes: [
      "Catch-up bookkeeping to bring records current",
      "Bank, card, and payment-processor reconciliation (Square, Shopify, Stripe, PayPal)",
      "A cleaned-up chart of accounts that fits your business",
      "A short monthly report pack: what came in, what went out, what's left",
    ],
    format: "Fixed-scope project",
  },
  {
    slug: "quickbooks",
    name: "QuickBooks Setup or Repair",
    tagline: "Set it up once, set it up right.",
    problem:
      "QuickBooks is either not set up, set up wrong, or you're paying for it and not using it.",
    outcome:
      "A QuickBooks file built for how your business actually works, with the routines to keep it clean.",
    includes: [
      "New QuickBooks Online setup, or a repair of your existing file",
      "Connected bank/card feeds and sensible categorization rules",
      "Products/services and sales-channel mapping",
      "A short written guide + walkthrough so it stays organized",
    ],
    format: "Fixed-scope project",
  },
  {
    slug: "pricing-profitability",
    name: "Pricing & Profitability Review",
    tagline: "Find out if you're making money on every sale.",
    problem:
      "You set prices by feel or by what competitors charge, and you're not sure which products, jobs, customers, or channels are actually profitable.",
    outcome:
      "A clear view of margin by product, job, or channel — and a pricing approach you can defend.",
    includes: [
      "True cost build-up for your main products or services (materials, labor, fees)",
      "Margin by product / job / channel, including market vs. online vs. wholesale",
      "Identification of low- or negative-margin work",
      "A simple, repeatable pricing model you can update yourself",
    ],
    format: "Fixed-scope project",
  },
  {
    slug: "cash-flow",
    name: "Cash Flow & Seasonal Planning",
    tagline: "Plan for the slow months before they arrive.",
    problem:
      "Revenue is seasonal and lumpy. Some months are flush and some are tight, and it's hard to know how much you can safely spend or set aside.",
    outcome:
      "A forward cash view that shows what's coming so the off-season isn't a scramble.",
    includes: [
      "A rolling 13-week (and seasonal) cash-flow view",
      "Mapping of your busy and slow periods against fixed costs",
      "A simple set-aside plan for taxes, equipment, and slow stretches",
      "A short review of timing for big purchases and hiring",
    ],
    format: "Project + optional monthly review",
  },
  {
    slug: "inventory-orders",
    name: "Inventory & Order Management",
    tagline: "Stop tracking orders in your head.",
    problem:
      "Custom orders and inventory live in texts, notebooks, and memory, so things slip — and you can't see what you have or what's promised.",
    outcome:
      "One reliable place for orders and inventory, so nothing falls through the cracks.",
    includes: [
      "A simple order intake + tracking workflow (from request to delivered)",
      "A practical inventory approach sized to your business (not enterprise software)",
      "Custom-order handling so special requests are captured and quoted consistently",
      "Clear hand-off steps if anyone helps you fulfill",
    ],
    format: "Fixed-scope project",
  },
  {
    slug: "ecommerce-ops",
    name: "E-Commerce & Marketplace Operations",
    tagline: "Make online selling a system, not a side scramble.",
    problem:
      "You sell (or want to sell) on Shopify, Etsy, or Amazon, but it's disconnected from your inventory, books, and customer follow-up.",
    outcome:
      "Online and marketplace sales that run on a repeatable process and reconcile cleanly.",
    includes: [
      "Review/setup of your Shopify, Etsy, or Amazon storefront operations",
      "Connecting online sales to inventory and bookkeeping",
      "Reconciliation of marketplace payouts vs. bank deposits",
      "A simple fulfillment and customer-follow-up routine",
    ],
    format: "Fixed-scope project",
  },
  {
    slug: "bookkeeping-workflow",
    name: "Bookkeeping Workflow Design",
    tagline: "A routine that keeps itself organized.",
    problem:
      "Bookkeeping happens in bursts (usually at tax time), which means it's always behind and always stressful.",
    outcome:
      "A lightweight weekly/monthly routine that keeps records current with minimal effort.",
    includes: [
      "A documented weekly + monthly bookkeeping routine",
      "Receipt and expense capture that fits how you work",
      "A month-end close checklist",
      "Decision on what you keep vs. what you hand off",
    ],
    format: "Fixed-scope project",
  },
  {
    slug: "tax-readiness",
    name: "Tax Readiness & Year-End Cleanup",
    tagline: "Hand your preparer clean books, not a shoebox.",
    problem:
      "Tax season is a fire drill, and you're never sure your preparer has what they need or that you're capturing everything.",
    outcome:
      "Organized, reconciled year-end records and a clean hand-off package for your tax preparer.",
    includes: [
      "Year-end reconciliation and cleanup",
      "Organized records for income, expenses, and 1099 contractors",
      "A tax-preparer hand-off package",
      "A short list of what to track during the year to make next time easy",
    ],
    format: "Seasonal project",
  },
  {
    slug: "owner-dashboard",
    name: "Owner Dashboard & Monthly Review",
    tagline: "The five numbers that run your business, every month.",
    problem:
      "You don't have a simple, regular read on how the business is doing until something goes wrong.",
    outcome:
      "A one-page dashboard and a short monthly conversation that keep you ahead of problems.",
    includes: [
      "A one-page owner dashboard tailored to your business",
      "A monthly review of the numbers and what they mean",
      "Tracking of a few key trends (cash, margin, channel performance)",
      "A running short-list of next improvements",
    ],
    format: "Monthly engagement",
  },
  {
    slug: "systems-buildout",
    name: "Small Business Systems Buildout",
    tagline: "Connect the tools you already use.",
    problem:
      "Your tools (Square, Shopify, QuickBooks, spreadsheets, your phone) don't talk to each other, so you re-enter the same information and still don't trust it.",
    outcome:
      "A connected, documented operating system sized to your business — no enterprise bloat.",
    includes: [
      "A map of your current tools and where information breaks",
      "A right-sized stack with the pieces connected",
      "Documented core workflows: sell, fulfill, get paid, follow up, report",
      "Written SOPs so the system survives a busy season",
    ],
    format: "Scoped project",
  },
  {
    slug: "fractional-finance",
    name: "Fractional Finance / Controller Support",
    tagline: "Senior finance help, sized to a small business.",
    problem:
      "You're growing and the financial side needs more horsepower than a bookkeeper, but a full-time controller or CFO is overkill.",
    outcome:
      "Experienced, part-time finance leadership that keeps the numbers reliable as you grow.",
    includes: [
      "Ownership of the monthly close and reporting",
      "Budgeting, forecasting, and cash planning",
      "Margin, pricing, and investment analysis as decisions come up",
      "A steady hand for banking, vendor, and growth conversations",
    ],
    format: "Ongoing, part-time",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Categories used to group the catalog on the Services page. */
export const serviceGroups: { title: string; blurb: string; slugs: string[] }[] = [
  {
    title: "Start here",
    blurb: "The free first step that produces a roadmap you keep.",
    slugs: ["clarity-session"],
  },
  {
    title: "Get the foundation right",
    blurb: "Clean books, working systems, and numbers you can trust.",
    slugs: ["financial-cleanup", "quickbooks", "bookkeeping-workflow", "tax-readiness"],
  },
  {
    title: "Know your numbers",
    blurb: "Pricing, margin, and cash — so decisions get easier.",
    slugs: ["pricing-profitability", "cash-flow", "owner-dashboard"],
  },
  {
    title: "Run the operation",
    blurb: "Orders, inventory, online selling, and connected systems.",
    slugs: ["inventory-orders", "ecommerce-ops", "systems-buildout"],
  },
  {
    title: "Grow with support",
    blurb: "Senior finance help for businesses that are scaling.",
    slugs: ["fractional-finance"],
  },
];
