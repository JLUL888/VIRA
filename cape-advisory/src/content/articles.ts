/**
 * Resource library — articles built around real owner pain points.
 *
 * Content blocks render in src/components/ArticleBody.tsx. A few flagship
 * pieces are written in full; the rest ship as structured outlines the
 * advisor can expand. This is the "content management structure": add an
 * entry here and it appears in /resources automatically.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "numbers"; items: { label: string; text: string }[] };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: "Profitability" | "Cash" | "Systems" | "Pricing" | "Bookkeeping" | "Seasonal" | "Online";
  readMinutes: number;
  status: "full" | "outline";
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "busy-but-not-profitable",
    title: "You can be busy all season and still not know if you're profitable",
    dek: "Activity is not the same as profit. Here's how to tell the difference before the season ends.",
    category: "Profitability",
    readMinutes: 5,
    status: "full",
    body: [
      { type: "p", text: "On the Cape, summer hides a lot. The markets are packed, the orders come in, the deposits hit the account, and it feels like things are working. Then the season turns, the deposits slow, and the question lands: did we actually make money, or did we just stay busy?" },
      { type: "p", text: "Busy and profitable are two different things. You can sell out every weekend and still lose money on half of what you make. The only way to know is to look — not at total revenue, but at what's left after the real cost of each sale." },
      { type: "h2", text: "Why the feeling of 'good sales' misleads" },
      { type: "p", text: "Revenue is the loudest number. It shows up in the register, the Square app, and the bank balance. Cost is quiet. Materials, booth fees, the propane for the griddle, the hours you and your spouse put in, the marketplace fees skimmed off the top — none of it announces itself. So the brain anchors on the loud number and assumes the quiet ones take care of themselves." },
      { type: "callout", text: "If you can't say which of your products or jobs makes the most money, you're pricing in the dark — and the busiest items are often the least profitable." },
      { type: "h2", text: "A simple test you can run this week" },
      { type: "numbers", items: [
        { label: "Pick 5", text: "Choose your five best-selling products or most common jobs." },
        { label: "Cost it", text: "For each, add up materials, fees, and a fair value for your labor." },
        { label: "Compare", text: "Subtract that from the price. Look at what's left, in dollars and as a percent." },
      ]},
      { type: "p", text: "Most owners find at least one popular item that barely breaks even — usually the one that takes the most labor or carries the highest fees. That's not a failure. It's information. You can re-price it, change the recipe or spec, or steer customers toward the things that actually pay." },
      { type: "h2", text: "What to do with what you find" },
      { type: "list", items: [
        "Raise the price on the low-margin favorites — modestly, and without apology.",
        "Bundle low-margin items with high-margin ones.",
        "Stop offering the things that cost you money and time with little return.",
        "Put your marketing behind the products that actually pay you.",
      ]},
      { type: "p", text: "None of this requires new software or a finance degree. It requires looking once, honestly. That's exactly what a Business Clarity Session is for." },
    ],
  },
  {
    slug: "revenue-is-not-cash",
    title: "Why revenue is not the same as cash (and why it matters in November)",
    dek: "A profitable business can still run out of money. Here's the gap, in plain terms.",
    category: "Cash",
    readMinutes: 4,
    status: "full",
    body: [
      { type: "p", text: "Two numbers get treated as the same thing and aren't: revenue and cash. Revenue is what you sold. Cash is what's actually in the account and when. The space between them is where seasonal businesses get caught." },
      { type: "h2", text: "Where the gap comes from" },
      { type: "list", items: [
        "Marketplace payouts land days or weeks after the sale.",
        "Wholesale customers pay on their schedule, not yours.",
        "You buy materials and inventory now for sales that happen later.",
        "Taxes you owe on a great summer don't come due until later — but they're real.",
      ]},
      { type: "callout", text: "You can have your best year on paper and still not be able to cover January's rent. That's a cash problem, not a profit problem — and it needs a cash answer." },
      { type: "h2", text: "The fix is a forward view" },
      { type: "p", text: "A short rolling cash forecast — even eight to thirteen weeks on one page — turns 'I think we're okay' into 'I can see we're okay through March.' It maps what's coming in against what's going out, including the slow months and the tax set-aside, so the off-season is planned instead of survived." },
      { type: "p", text: "That's the difference between running the business and the business running you." },
    ],
  },
  {
    slug: "hidden-cost-of-custom-orders",
    title: "The hidden cost of custom orders",
    dek: "Custom work feels premium. Without a process, it quietly eats your margin and your evenings.",
    category: "Pricing",
    readMinutes: 4,
    status: "full",
    body: [
      { type: "p", text: "A customer at the market asks if you can do a bigger size, a different wood, a special color. You say yes — of course you can. That 'yes' feels like a win, and sometimes it is. But custom orders carry costs that standard products don't, and most of them never make it into the price." },
      { type: "h2", text: "What custom work actually costs" },
      { type: "list", items: [
        "The back-and-forth: texts, calls, and emails to nail down what they want.",
        "Setup and changeover time that a production run spreads across many units.",
        "Mistakes and re-dos when expectations weren't written down.",
        "The mental load of tracking a one-off order that lives outside your normal flow.",
      ]},
      { type: "callout", text: "Custom orders run from text messages are the single most common place small makers lose money and drop balls at the same time." },
      { type: "h2", text: "A lightweight process beats a bigger memory" },
      { type: "numbers", items: [
        { label: "Capture", text: "One place every custom request lands — not your texts." },
        { label: "Quote", text: "A simple formula that adds a custom premium for setup and communication." },
        { label: "Confirm", text: "A short written spec and deposit before work starts." },
      ]},
      { type: "p", text: "This isn't bureaucracy. It's the difference between custom work being your best margin and your biggest headache." },
    ],
  },
  {
    slug: "five-numbers-every-owner-should-know",
    title: "The five numbers every Cape Cod business owner should know",
    dek: "You don't need a finance degree. You need five numbers, current and trusted.",
    category: "Profitability",
    readMinutes: 4,
    status: "full",
    body: [
      { type: "p", text: "Most owners track everything in their head and nothing on a page. The fix isn't a giant dashboard — it's five numbers you can actually keep current." },
      { type: "numbers", items: [
        { label: "Cash on hand", text: "What's really in the account, minus what's already spoken for." },
        { label: "Gross margin", text: "What's left after the direct cost of what you sell — by product or channel if you can." },
        { label: "Revenue by channel", text: "Market vs. online vs. wholesale, so you put effort where it pays." },
        { label: "Fixed monthly costs", text: "The nut you have to cover every month, busy or slow." },
        { label: "Money set aside for taxes", text: "So a good year doesn't become a spring surprise." },
      ]},
      { type: "callout", text: "If you can see these five numbers on one page each month, you're ahead of most businesses your size." },
      { type: "p", text: "The goal of an owner dashboard is exactly this: these numbers, current, in one place, reviewed for fifteen minutes a month. That's enough to catch most problems while they're still small." },
    ],
  },
  {
    slug: "quickbooks-alone-wont-organize-you",
    title: "Why QuickBooks alone does not organize your business",
    dek: "Software is a tool, not a system. Here's the difference — and why it matters.",
    category: "Systems",
    readMinutes: 4,
    status: "outline",
    body: [
      { type: "p", text: "Buying QuickBooks and feeling organized is like buying a tablesaw and feeling like a woodworker. The tool is real, but it doesn't do the work by itself." },
      { type: "h2", text: "The outline" },
      { type: "list", items: [
        "A tool records what you tell it; a system decides what gets recorded, by whom, and when.",
        "Most QuickBooks files are set up generically and never matched to how the business actually sells.",
        "Without a routine, the file drifts out of date and the reports stop being trustworthy.",
        "The win is the routine around the tool: capture, categorize, reconcile, review.",
      ]},
      { type: "callout", text: "Draft outline — expand with a real before/after example from a market vendor." },
    ],
  },
  {
    slug: "seasonal-cash-flow-planning",
    title: "How seasonal businesses should plan cash flow",
    dek: "Five busy months have to carry twelve months of bills. Here's how to plan for it.",
    category: "Seasonal",
    readMinutes: 4,
    status: "outline",
    body: [
      { type: "p", text: "Seasonality isn't a problem to solve — it's a pattern to plan around. The businesses that struggle aren't the ones with slow winters; they're the ones who didn't plan for them in July." },
      { type: "h2", text: "The outline" },
      { type: "list", items: [
        "Map your real season: which weeks carry the year.",
        "Know your monthly nut — what you owe even in the dead of winter.",
        "Build a set-aside rule during peak months (taxes, slow-season float, equipment).",
        "Use a rolling cash view so big purchases land at the right time.",
      ]},
      { type: "callout", text: "Draft outline — add a worked Cape Cod example (summer-heavy retailer)." },
    ],
  },
  {
    slug: "when-your-numbers-dont-match",
    title: "When your Shopify, Square, Amazon, Etsy, and bank account don't match",
    dek: "Five systems, five different totals. Here's why, and how to make them agree.",
    category: "Online",
    readMinutes: 4,
    status: "outline",
    body: [
      { type: "p", text: "Each platform reports sales its own way, takes its own fees, and pays out on its own schedule. So the totals never match the bank — and reconciling feels impossible." },
      { type: "h2", text: "The outline" },
      { type: "list", items: [
        "Gross sales vs. net payout: fees and refunds explain most of the gap.",
        "Timing: a sale today is a deposit next week.",
        "The fix: reconcile each channel's payouts to the bank, monthly.",
        "The payoff: you finally trust the revenue number.",
      ]},
      { type: "callout", text: "Draft outline — add a reconciliation walkthrough screenshot set." },
    ],
  },
  {
    slug: "stop-running-on-text-messages",
    title: "How to stop running your business from text messages",
    dek: "Your phone is a great way to talk to customers and a terrible system of record.",
    category: "Systems",
    readMinutes: 4,
    status: "outline",
    body: [
      { type: "p", text: "Texts are immediate and personal — that's why customers love them and why orders get lost in them. The goal isn't to stop texting. It's to make sure nothing important only lives in a text thread." },
      { type: "h2", text: "The outline" },
      { type: "list", items: [
        "One shared place where every order and request is captured.",
        "A quick habit: a text becomes an entry before it becomes a promise.",
        "Status you can see at a glance: requested, quoted, in progress, done.",
        "Follow-up that doesn't depend on remembering.",
      ]},
      { type: "callout", text: "Draft outline — add a simple intake-to-fulfillment diagram." },
    ],
  },
  {
    slug: "before-you-hand-books-to-tax-preparer",
    title: "What to fix before you hand your books to your tax preparer",
    dek: "A clean hand-off saves money, stress, and a spring full of 'quick questions.'",
    category: "Bookkeeping",
    readMinutes: 4,
    status: "outline",
    body: [
      { type: "p", text: "Your tax preparer is good at taxes, not at untangling a year of mixed-up records. The cleaner the hand-off, the lower the bill and the smaller the chance of a costly miss." },
      { type: "h2", text: "The outline" },
      { type: "list", items: [
        "Reconcile every bank and card account through year-end.",
        "Separate business and personal once and for all.",
        "Gather 1099 info for contractors before January.",
        "Hand over a clean report pack, not a login and a shrug.",
      ]},
      { type: "callout", text: "Draft outline — pair with the downloadable Operating Checklist." },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
