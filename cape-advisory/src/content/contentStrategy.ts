/**
 * Content engine assets: post templates, carousel concepts, newsletter ideas,
 * workshop topics, and downloadable checklist lists. Powers the lower section
 * of /resources and is a working toolkit for the advisor.
 */

export const blogTemplate = {
  title: "Blog post template (pain → reframe → simple fix → soft CTA)",
  structure: [
    "Headline: name the specific pain in the owner's words.",
    "Open: a concrete Cape Cod scene (a market, a slow January, a custom order).",
    "Reframe: the misunderstanding underneath the pain (e.g. busy ≠ profitable).",
    "The simple test or fix: 3 steps the owner can do this week.",
    "What to do with what you find: a short, practical list.",
    "Soft CTA: 'This is exactly what a free Business Clarity Session is for.'",
  ],
};

export const linkedinTemplates: { title: string; body: string }[] = [
  {
    title: "The reframe post",
    body:
      "Most small business owners I meet on the Cape can tell me their best-selling product.\n\nFar fewer can tell me their most profitable one.\n\nThey're rarely the same thing.\n\nThe busiest item is often the one with the thinnest margin — most labor, highest fees, lowest price.\n\nYou don't need new software to find it. You need to cost five products once, honestly.\n\nThat's usually where the first real money is hiding.",
  },
  {
    title: "The story post",
    body:
      "At a farmers market this weekend, I watched a woodworker tell a customer, 'Yes, you can find that online too — the admin side just isn't very organized.'\n\nGreat product. Real demand. Custom orders. A back office held together by text messages.\n\nThat's not a failing. It's the most common shape a growing small business takes.\n\nThe product got good fast. The systems didn't get a chance to keep up.\n\nThat gap is fixable — and it's where I spend my time.",
  },
  {
    title: "The list post",
    body:
      "Five numbers every small business owner should be able to see on one page each month:\n\n1. Cash on hand (minus what's already spoken for)\n2. Gross margin\n3. Revenue by channel\n4. Fixed monthly costs\n5. Money set aside for taxes\n\nIf you can see these five, you're ahead of most businesses your size.\n\nIf you can't, that's the first thing worth fixing.",
  },
];

export const instagramCarousels: { title: string; slides: string[] }[] = [
  {
    title: "Are you making money on every sale?",
    slides: [
      "Cover: 'Are you making money on every sale?'",
      "Busy ≠ profitable. They're different numbers.",
      "Pick your 5 best sellers.",
      "Add up materials + fees + your real labor.",
      "Subtract from the price. Look at what's left.",
      "The popular item is often the thinnest margin.",
      "That's not bad news — it's a lever.",
      "CTA: Free 20-min pricing check. Link in bio.",
    ],
  },
  {
    title: "Stop running your business from text messages",
    slides: [
      "Cover: 'Your phone is not a system.'",
      "Texts are great for talking to customers.",
      "They're a terrible place to store orders.",
      "One lost thread = one lost order.",
      "Fix: one shared place every request lands.",
      "Status at a glance: requested → quoted → done.",
      "Follow-up that doesn't rely on memory.",
      "CTA: Free Business Clarity Session.",
    ],
  },
  {
    title: "Revenue is not cash",
    slides: [
      "Cover: 'A great year on paper. Empty account in January.'",
      "Revenue = what you sold.",
      "Cash = what's in the bank, and when.",
      "Payouts lag. Wholesale pays late. Taxes come due.",
      "That gap catches seasonal businesses.",
      "Fix: a simple 8–13 week cash view.",
      "Plan the slow months in July, not December.",
      "CTA: Let's map your season. Link in bio.",
    ],
  },
];

export const newsletterIdeas: { title: string; angle: string }[] = [
  { title: "Cape Cod Small Business Fixes", angle: "One specific, useful operating fix per issue. Short. Practical. No fluff." },
  { title: "The Off-Season Tune-Up", angle: "A fall/winter series on cleaning up books and systems before the next season." },
  { title: "Five Numbers Friday", angle: "A rotating deep-dive on one of the five numbers every owner should know." },
  { title: "Before You File", angle: "A pre-tax-season checklist drip for getting books preparer-ready." },
];

export const workshopTopics: { title: string; promise: string }[] = [
  { title: "Are You Making Money on Every Sale?", promise: "A working session on costing and pricing your actual products." },
  { title: "Cash Flow for Seasonal Businesses", promise: "Plan five busy months to carry twelve months of bills." },
  { title: "Get Your Books Ready for Tax Season", promise: "What to fix now so spring is a non-event." },
  { title: "From Text Messages to a System", promise: "A lightweight way to capture orders, inventory, and follow-up." },
  { title: "The Owner's Dashboard", promise: "Build the one page you'll actually look at every month." },
];

export const downloadableChecklists: { title: string; href: string; description: string }[] = [
  {
    title: "Small Business Operating Checklist",
    href: "/checklist",
    description: "The full operating self-assessment across nine areas of the business.",
  },
  {
    title: "Are You Making Money on Every Sale?",
    href: "/checklist#pricing",
    description: "The market-handout one-pager: a 5-minute margin gut-check.",
  },
];
