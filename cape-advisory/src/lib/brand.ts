/**
 * Single source of truth for brand identity.
 *
 * The name is intentionally NOT hardcoded across the app. Change the values
 * here to re-brand the entire platform — nav, footer, metadata, emails, and
 * the roadmap header all read from this object.
 *
 * Candidate names considered: Clear Harbor Advisory, HarborPoint Advisory,
 * Cape Operating Co., The Owner's Office, Local Ledger Advisory,
 * Northstar Business Advisory. Default below is the working name.
 */
export const brand = {
  name: "Clear Harbor",
  fullName: "Clear Harbor Advisory",
  // Short tagline used under the logo / in metadata.
  tagline: "Operating support for Cape Cod businesses",
  // The positioning sentence — the elevator pitch.
  positioning:
    "We help Cape Cod owner-operators turn a good local business into an organized, scalable one — without making it corporate.",
  // Primary offer.
  primaryOffer: {
    name: "Business Clarity Session",
    short: "Free 1-hour Business Clarity Session",
    deliverable:
      "A one-page operating roadmap: what to fix first, what can wait, and where the business is losing time, money, or visibility.",
  },
  contact: {
    email: "hello@clearharboradvisory.com",
    phone: "(508) 555-0142",
    region: "Cape Cod, Massachusetts",
    serviceArea:
      "Mashpee, Falmouth, Sandwich, Barnstable, Hyannis, Yarmouth, Dennis, and the rest of the Cape",
  },
  founder: {
    // Verifiable background only — no invented credentials or results.
    summary:
      "A CPA and finance operator who grew up on Cape Cod, studied at Boston College, and spent years in New York finance — private equity, audit, corporate accounting and financial reporting, operational process redesign, and systems implementation.",
  },
  social: {
    instagram: "#",
    linkedin: "#",
  },
} as const;

export type Brand = typeof brand;
