import { z } from "zod";

/**
 * Validation schema for the Business Clarity Session intake.
 * Used on both the API route (server-side trust boundary) and to type the
 * form. Keep field names aligned with the Prisma Lead model.
 */
export const intakeSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(160),
  ownerName: z.string().trim().min(1, "Your name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(40),
  town: z.string().trim().min(1, "Town is required").max(80),
  links: z.string().trim().max(500).optional().default(""),

  whatTheySell: z
    .string()
    .trim()
    .min(2, "Tell us what you sell")
    .max(500),
  whereTheySell: z
    .array(z.string())
    .min(1, "Pick at least one place you sell")
    .or(z.string().min(1)),

  revenueRange: z.string().min(1, "Select a revenue range"),
  headcount: z.string().min(1, "Select a headcount band"),
  accountingSystem: z.string().min(1, "Select an accounting system"),

  biggestFrustration: z
    .string()
    .trim()
    .min(2, "Tell us your biggest frustration")
    .max(1000),

  confidentInPricing: z.enum(["yes", "somewhat", "no"]),
  knowsProfitability: z.enum(["yes", "somewhat", "no"]),
  cashFlowStruggle: z.enum(["yes", "sometimes", "no"]),
  behindOnBooks: z.enum(["yes", "a_little", "no"]),
  needsOnlineHelp: z.coerce.boolean().default(false),
  needsTaxHelp: z.coerce.boolean().default(false),
  engagementInterest: z.enum(["one_time", "monthly", "unsure"]),

  // Honeypot — must stay empty. Bots fill it in.
  company_website: z.string().max(0).optional().default(""),
});

export type IntakeInput = z.infer<typeof intakeSchema>;

/** Normalizes the channel field to a comma-separated string for storage. */
export function normalizeChannels(
  value: string[] | string | undefined,
): string {
  if (Array.isArray(value)) return value.join(", ");
  return value ?? "";
}
