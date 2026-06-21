/**
 * Seed data — fictional Cape Cod businesses spanning the target archetypes.
 * These are illustrative only. No real businesses, results, or revenue.
 *
 * Run: npm run db:seed   (or npm run setup for push + seed)
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedLead = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  town: string;
  links: string;
  whatTheySell: string;
  whereTheySell: string;
  revenueRange: string;
  headcount: string;
  accountingSystem: string;
  biggestFrustration: string;
  confidentInPricing: string;
  knowsProfitability: string;
  cashFlowStruggle: string;
  behindOnBooks: string;
  needsOnlineHelp: boolean;
  needsTaxHelp: boolean;
  engagementInterest: string;
  status: string;
  advisorNotes: string;
};

const leads: SeedLead[] = [
  {
    businessName: "Sippewissett Board Co.",
    ownerName: "Dan Fuller",
    email: "dan@sippewissettboards.com",
    phone: "(508) 555-0117",
    town: "Mashpee",
    links: "sippewissettboards.com · IG @sippewissettboards · Amazon storefront",
    whatTheySell: "Custom hardwood cutting boards, butcher blocks, and charcuterie boards",
    whereTheySell: "Farmers markets, Mashpee Commons, Amazon, Word of mouth",
    revenueRange: "250k_500k",
    headcount: "1_2",
    accountingSystem: "spreadsheets",
    biggestFrustration:
      "Custom orders come in by text at markets and I lose track. People ask if they can buy a specific size online and I honestly don't know what's in stock or listed. The admin side hasn't kept up with the orders.",
    confidentInPricing: "somewhat",
    knowsProfitability: "no",
    cashFlowStruggle: "sometimes",
    behindOnBooks: "yes",
    needsOnlineHelp: true,
    needsTaxHelp: true,
    engagementInterest: "unsure",
    status: "new",
    advisorNotes: "Met at the Mashpee market — the archetype. Strong product, real demand, scattered back office.",
  },
  {
    businessName: "Bourne & Bramble Bakehouse",
    ownerName: "Maria Couto",
    email: "hello@bourneandbramble.com",
    phone: "(508) 555-0188",
    town: "Sandwich",
    links: "IG @bourneandbramble",
    whatTheySell: "Sourdough, pastries, and seasonal pies; wedding and event orders",
    whereTheySell: "Farmers markets, Storefront / studio, Instagram / Facebook, Wholesale / vendors",
    revenueRange: "100k_250k",
    headcount: "3_5",
    accountingSystem: "quickbooks_online",
    biggestFrustration:
      "We're busy every weekend but I can't tell if the wedding cakes actually make money once I count the hours. QuickBooks is a mess of uncategorized transactions.",
    confidentInPricing: "no",
    knowsProfitability: "no",
    cashFlowStruggle: "yes",
    behindOnBooks: "a_little",
    needsOnlineHelp: false,
    needsTaxHelp: false,
    engagementInterest: "monthly",
    status: "contacted",
    advisorNotes: "Wedding orders likely under-priced for labor. QBO exists but is unreconciled.",
  },
  {
    businessName: "Outer Cape Hardscapes",
    ownerName: "Tom Reardon",
    email: "tom@outercapehardscapes.com",
    phone: "(508) 555-0123",
    town: "Eastham",
    links: "outercapehardscapes.com",
    whatTheySell: "Patios, walls, walkways, and landscape construction",
    whereTheySell: "Word of mouth, Wholesale / vendors",
    revenueRange: "500k_1m",
    headcount: "6_15",
    accountingSystem: "quickbooks_desktop",
    biggestFrustration:
      "Jobs run over and I find out after. I don't know my real cost per job until the season's over, and cash gets tight in the spring before deposits come in.",
    confidentInPricing: "somewhat",
    knowsProfitability: "no",
    cashFlowStruggle: "yes",
    behindOnBooks: "a_little",
    needsOnlineHelp: false,
    needsTaxHelp: true,
    engagementInterest: "monthly",
    status: "scheduled",
    advisorNotes: "Classic job-costing + cash-flow gap. Strong fractional-controller candidate.",
  },
  {
    businessName: "Sea Glass & Cedar",
    ownerName: "Priya Anand",
    email: "priya@seaglassandcedar.com",
    phone: "(508) 555-0150",
    town: "Falmouth",
    links: "seaglassandcedar.com (Shopify) · Etsy: SeaGlassCedar · IG @seaglassandcedar",
    whatTheySell: "Handmade candles, soaps, and home goods",
    whereTheySell: "Shopify, Etsy, Farmers markets, Instagram / Facebook",
    revenueRange: "100k_250k",
    behindOnBooks: "no",
    accountingSystem: "wave",
    headcount: "just_me",
    biggestFrustration:
      "Shopify, Etsy, and my bank never match and I dread reconciling. I don't know my real margin after all the fees.",
    confidentInPricing: "somewhat",
    knowsProfitability: "somewhat",
    cashFlowStruggle: "no",
    needsOnlineHelp: true,
    needsTaxHelp: false,
    engagementInterest: "one_time",
    status: "new",
    advisorNotes: "Multi-channel reconciliation pain. Good fit for e-commerce ops cleanup.",
  },
  {
    businessName: "Cotuit Coastal Provisions",
    ownerName: "Greg Mello",
    email: "greg@cotuitcoastal.com",
    phone: "(508) 555-0199",
    town: "Cotuit",
    links: "IG @cotuitcoastal",
    whatTheySell: "Small-batch hot sauces, jams, and pantry goods",
    whereTheySell: "Farmers markets, Local fairs / craft shows, Wholesale / vendors, Shopify",
    revenueRange: "under_100k",
    headcount: "just_me",
    accountingSystem: "shoebox",
    biggestFrustration:
      "I run everything from a notebook and Venmo. I have no idea if I'm actually making money or just moving it around.",
    confidentInPricing: "no",
    knowsProfitability: "no",
    cashFlowStruggle: "sometimes",
    behindOnBooks: "yes",
    needsOnlineHelp: true,
    needsTaxHelp: true,
    engagementInterest: "unsure",
    status: "new",
    advisorNotes: "Earliest-stage of the group — needs foundational setup. Confirm real volume.",
  },
  {
    businessName: "Nauset Wellness Studio",
    ownerName: "Karen Webb",
    email: "karen@nausetwellness.com",
    phone: "(508) 555-0166",
    town: "Orleans",
    links: "nausetwellness.com",
    whatTheySell: "Massage, yoga classes, and wellness memberships",
    whereTheySell: "Storefront / studio, Instagram / Facebook, Word of mouth",
    revenueRange: "250k_500k",
    headcount: "3_5",
    accountingSystem: "quickbooks_online",
    biggestFrustration:
      "Memberships, class packs, and walk-ins all get tracked differently. I can't tell which offering actually carries the studio.",
    confidentInPricing: "somewhat",
    knowsProfitability: "no",
    cashFlowStruggle: "no",
    behindOnBooks: "no",
    needsOnlineHelp: false,
    needsTaxHelp: false,
    engagementInterest: "monthly",
    status: "roadmap_sent",
    advisorNotes: "Wants the owner dashboard + monthly review. Roadmap sent; following up.",
  },
  {
    businessName: "Wellfleet Oyster Outfit",
    ownerName: "Sam Pierce",
    email: "sam@wellfleetoysteroutfit.com",
    phone: "(508) 555-0144",
    town: "Wellfleet",
    links: "IG @wellfleetoysteroutfit",
    whatTheySell: "Oyster grants, raw bar catering, and seasonal wholesale",
    whereTheySell: "Wholesale / vendors, Local fairs / craft shows, Word of mouth",
    revenueRange: "250k_500k",
    headcount: "1_2",
    accountingSystem: "spreadsheets",
    biggestFrustration:
      "Cash is feast or famine with the season. I need to plan the winter while the summer money is still here.",
    confidentInPricing: "yes",
    knowsProfitability: "somewhat",
    cashFlowStruggle: "yes",
    behindOnBooks: "a_little",
    needsOnlineHelp: false,
    needsTaxHelp: true,
    engagementInterest: "one_time",
    status: "new",
    advisorNotes: "Seasonal cash-flow planning is the headline need.",
  },
  {
    businessName: "Barnstable Bench Works",
    ownerName: "Eli Schwartz",
    email: "eli@barnstablebench.com",
    phone: "(508) 555-0133",
    town: "Barnstable",
    links: "barnstablebench.com · Etsy: BarnstableBench",
    whatTheySell: "Reclaimed-wood furniture and custom built-ins",
    whereTheySell: "Etsy, Local fairs / craft shows, Word of mouth, Storefront / studio",
    revenueRange: "100k_250k",
    headcount: "1_2",
    accountingSystem: "accountant_only",
    biggestFrustration:
      "My accountant does my taxes but nobody helps during the year. Custom quotes are guesses and I'm always behind on paperwork.",
    confidentInPricing: "no",
    knowsProfitability: "no",
    cashFlowStruggle: "sometimes",
    behindOnBooks: "yes",
    needsOnlineHelp: true,
    needsTaxHelp: true,
    engagementInterest: "one_time",
    status: "new",
    advisorNotes: "Mirror of the butcher-block archetype in furniture. Pricing + cleanup first.",
  },
  {
    businessName: "Dennisport Tide & Thread",
    ownerName: "Lauren Marsh",
    email: "lauren@tideandthread.com",
    phone: "(508) 555-0102",
    town: "Dennis",
    links: "tideandthread.com (Shopify) · IG @tideandthread",
    whatTheySell: "Coastal apparel and accessories boutique",
    whereTheySell: "Storefront / studio, Shopify, Instagram / Facebook",
    revenueRange: "500k_1m",
    headcount: "6_15",
    accountingSystem: "quickbooks_online",
    biggestFrustration:
      "Inventory between the shop floor and the website never matches. We're growing but it feels more chaotic, not less.",
    confidentInPricing: "yes",
    knowsProfitability: "somewhat",
    cashFlowStruggle: "no",
    behindOnBooks: "no",
    needsOnlineHelp: true,
    needsTaxHelp: false,
    engagementInterest: "monthly",
    status: "new",
    advisorNotes: "Systems buildout + inventory sync. Good recurring potential.",
  },
];

async function main() {
  console.log("Seeding…");
  await prisma.roadmap.deleteMany();
  await prisma.lead.deleteMany();

  for (const lead of leads) {
    await prisma.lead.create({ data: lead });
  }
  console.log(`Seeded ${leads.length} leads.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
