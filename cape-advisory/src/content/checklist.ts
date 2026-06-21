/**
 * The "Small Business Operating Checklist" — the downloadable/printable lead
 * magnet. Rendered at /checklist with a print-friendly layout. Nine areas,
 * each a short set of yes/no self-assessment prompts an owner can score.
 */

export type ChecklistSection = {
  id: string;
  title: string;
  intro: string;
  items: string[];
};

export const checklistSections: ChecklistSection[] = [
  {
    id: "money-basics",
    title: "Money basics",
    intro: "Can you trust the numbers enough to make a decision today?",
    items: [
      "Business and personal money run through separate accounts.",
      "Every bank and card account is reconciled through last month.",
      "You can see, right now, how much cash is actually available.",
      "You know your fixed monthly costs — the nut you cover busy or slow.",
    ],
  },
  {
    id: "pricing",
    title: "Pricing & margin",
    intro: "Are you making money on every sale?",
    items: [
      "You know the true cost (materials, fees, labor) of your top products or jobs.",
      "You know which products, jobs, or channels are most profitable.",
      "Your prices are set on margin, not just on what feels right or what others charge.",
      "Custom orders carry a premium for the extra setup and communication.",
    ],
  },
  {
    id: "cash-flow",
    title: "Cash flow & seasonality",
    intro: "Will the slow months be planned or survived?",
    items: [
      "You have a forward view of cash for at least the next 8–13 weeks.",
      "You set money aside during busy months for the slow ones.",
      "You set money aside for taxes as you earn, not at filing time.",
      "Big purchases and hiring are timed against your season.",
    ],
  },
  {
    id: "bookkeeping",
    title: "Bookkeeping routine",
    intro: "Does the bookkeeping keep itself current?",
    items: [
      "Bookkeeping happens on a regular routine, not just at tax time.",
      "Receipts and expenses are captured as they happen.",
      "There's a simple month-end close checklist.",
      "You produce a basic monthly report you actually read.",
    ],
  },
  {
    id: "orders",
    title: "Orders & inventory",
    intro: "Is anything important only living in your head or your texts?",
    items: [
      "Every order and custom request lands in one shared place.",
      "You can see order status at a glance: requested, quoted, in progress, done.",
      "You know what inventory you have and what's already promised.",
      "Fulfillment steps are clear enough that someone could help you.",
    ],
  },
  {
    id: "online",
    title: "Online & marketplace sales",
    intro: "Do your channels agree with your bank?",
    items: [
      "Online sales connect back to your inventory and bookkeeping.",
      "Marketplace payouts (Shopify, Etsy, Amazon, Square) are reconciled to the bank.",
      "You know your net margin online after fees, not just gross sales.",
      "There's a routine for online customer follow-up.",
    ],
  },
  {
    id: "customers",
    title: "Customer follow-up",
    intro: "Do customers and requests fall through the cracks?",
    items: [
      "Customer requests are captured, not just remembered.",
      "You follow up on quotes and custom inquiries reliably.",
      "You can reach past customers when you want to.",
      "Repeat and referral business is encouraged on purpose, not by luck.",
    ],
  },
  {
    id: "taxes-compliance",
    title: "Taxes & compliance",
    intro: "Is tax season a fire drill or a non-event?",
    items: [
      "Year-end records are reconciled and organized.",
      "Contractor (1099) information is collected through the year.",
      "Your tax preparer gets a clean hand-off package, not a login.",
      "You understand, roughly, what you'll owe before it's due.",
    ],
  },
  {
    id: "systems-time",
    title: "Systems & your time",
    intro: "Is the business easier to run than it was a year ago?",
    items: [
      "Your core tools (sales, payments, books) are connected, not siloed.",
      "Core workflows are written down somewhere other than your memory.",
      "You spend more time on the work that grows the business than on admin.",
      "If you stepped away for two weeks, the operation would hold together.",
    ],
  },
];

export const checklistMeta = {
  title: "Small Business Operating Checklist",
  subtitle: "A 10-minute self-assessment for owner-operated Cape Cod businesses.",
  scoring:
    "Tick the ones that are true today. Fewer than half checked in any one area is a good place to start. The point isn't a grade — it's spotting the one or two areas worth fixing first.",
};
