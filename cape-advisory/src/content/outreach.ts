/**
 * Cape Cod local business-development strategy + outreach playbook.
 * Powers the /local-strategy page. This is an internal/strategic asset shown
 * publicly as a credibility and transparency piece — it signals the practice
 * is built specifically for the Cape, not parachuted in.
 */

export type Channel = {
  name: string;
  who: string;
  approach: string;
};

export const localChannels: Channel[] = [
  {
    name: "Farmers markets",
    who: "Makers, bakers, food vendors, growers selling weekend-to-weekend.",
    approach: "Show up as a regular. Buy something. Ask how the season's going before you ever mention what you do.",
  },
  {
    name: "Mashpee Commons & retail centers",
    who: "Boutique retailers and food businesses with a physical footprint.",
    approach: "Slow, in-person relationships. Offer a genuinely useful one-pager, not a pitch.",
  },
  {
    name: "Local artisan & craft fairs",
    who: "Woodworkers, ceramicists, textile and leather makers, custom-product sellers.",
    approach: "The custom-order conversation is the opening: 'How do you keep all those special requests straight?'",
  },
  {
    name: "Chambers of Commerce",
    who: "Falmouth, Mashpee, Sandwich, Hyannis, and the regional Cape Cod chamber.",
    approach: "Join, attend, contribute. Offer to run a free small-business workshop, not a sales seminar.",
  },
  {
    name: "Local business associations",
    who: "Village business groups, Main Street associations, BNI-style referral groups.",
    approach: "Be the member who answers operating questions for free. Referrals follow usefulness.",
  },
  {
    name: "Contractors & home-services businesses",
    who: "Builders, landscapers, cleaners, trades — strong revenue, weak back office.",
    approach: "Talk job costing and cash flow during the busy season, when the pain is loudest.",
  },
  {
    name: "Food businesses",
    who: "Bakeries, caterers, farm stands, specialty food makers, small producers.",
    approach: "Margin and waste are the hooks. 'Do you know which items actually pay?'",
  },
  {
    name: "Seasonal & hospitality businesses",
    who: "Summer-heavy retail, inns, tour/charter operators, seasonal services.",
    approach: "Seasonal cash planning in spring; cleanup and review in the off-season.",
  },
  {
    name: "Real estate-adjacent businesses",
    who: "Property managers, stagers, home services tied to the real estate cycle.",
    approach: "Partner with agents and managers who already trust you with referrals.",
  },
  {
    name: "Small manufacturers & producers",
    who: "Makers who've grown into small-batch production with real inventory.",
    approach: "Systems and inventory are the entry point; controller support is the growth path.",
  },
];

export type ReferralPartner = { name: string; why: string };

export const referralPartners: ReferralPartner[] = [
  { name: "Bookkeepers", why: "They hit the ceiling of what they can do and need an operator to hand the harder work to." },
  { name: "Insurance agents", why: "They sit with owners regularly and hear the operating pain first." },
  { name: "Payroll providers", why: "Natural adjacency — payroll is one piece of a system you can build the rest of." },
  { name: "Attorneys", why: "Business formation and transactions surface the need to get organized." },
  { name: "Banks & lenders", why: "Loan readiness requires clean books — a clear referral trigger." },
  { name: "Commercial real estate pros", why: "New leases mean growth, and growth means operating strain." },
  { name: "Tax preparers / CPAs", why: "They want clean books at hand-off and don't do year-round operating work." },
];

export type PlaybookStep = {
  title: string;
  detail: string;
  tactic: string;
};

export const playbook: PlaybookStep[] = [
  {
    title: "Be a regular, not a vendor",
    detail: "Attend the markets and fairs as a neighbor. Buy things. Learn names. Talk shop without pitching.",
    tactic: "Goal: be a familiar, useful face before anyone needs you.",
  },
  {
    title: "Lead with a one-pager, not a service",
    detail: "Hand out a simple, genuinely helpful checklist — 'Are You Making Money on Every Sale?' — with a soft invite to a free 20-minute pricing check.",
    tactic: "The checklist does the selling by being useful on its own.",
  },
  {
    title: "Offer a free 20-minute pricing & profitability check",
    detail: "A low-commitment, high-value mini-session for vendors. It naturally surfaces the bigger operating issues.",
    tactic: "Bridges a market chat to the full Business Clarity Session.",
  },
  {
    title: "Build a referral bench",
    detail: "Partner with bookkeepers, insurance agents, payroll providers, attorneys, banks, and CRE pros. Send them business; earn it back.",
    tactic: "Referrals compound; cold outreach doesn't.",
  },
  {
    title: "Host a small-business breakfast or evening workshop",
    detail: "A short, practical session — pricing, cash flow, or getting ready for taxes — hosted with a chamber or a host business.",
    tactic: "Teaching is the most credible marketing there is.",
  },
  {
    title: "Publish short, local content",
    detail: "A steady drip of 'Cape Cod Small Business Fixes' — one specific, useful idea at a time, in plain language.",
    tactic: "Local + specific + useful beats polished + generic.",
  },
];

export const positioningNotes = {
  niche:
    "Owner-led businesses with real revenue and real operating friction — not startups with ideas, not businesses that only need a tax return, not enterprises that need a full-time CFO.",
  archetype:
    "The custom-product maker selling at a Mashpee market: strong product, real demand, custom orders, online and in-person sales, inventory, customer messages, tax exposure, uneven cash flow — and no consolidated operating view.",
  bridge:
    "The conversation moves from a market chat ('I heard you mention the admin side is a little scattered') to something useful — a free roadmap — without forcing a tax or bookkeeping pitch.",
};
