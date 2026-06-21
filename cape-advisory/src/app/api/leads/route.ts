import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { intakeSchema, normalizeChannels } from "@/lib/validation";
import { isAdvisorAuthed } from "@/lib/auth";

/**
 * POST /api/leads — public intake submission for the Business Clarity Session.
 * Validates server-side, drops bot submissions via honeypot, and stores the
 * lead. Returns the new lead id so the client can route to the confirmation.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: a real user never fills this. Pretend success, store nothing.
  if (data.company_website && data.company_website.length > 0) {
    return NextResponse.json({ ok: true, id: "skipped" });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        businessName: data.businessName,
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        town: data.town,
        links: data.links || "",
        whatTheySell: data.whatTheySell,
        whereTheySell: normalizeChannels(data.whereTheySell),
        revenueRange: data.revenueRange,
        headcount: data.headcount,
        accountingSystem: data.accountingSystem,
        biggestFrustration: data.biggestFrustration,
        confidentInPricing: data.confidentInPricing,
        knowsProfitability: data.knowsProfitability,
        cashFlowStruggle: data.cashFlowStruggle,
        behindOnBooks: data.behindOnBooks,
        needsOnlineHelp: data.needsOnlineHelp,
        needsTaxHelp: data.needsTaxHelp,
        engagementInterest: data.engagementInterest,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("Lead create failed", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your details. Please try again." },
      { status: 500 },
    );
  }
}

/**
 * GET /api/leads — advisor-only list endpoint (JSON), gated by the dashboard
 * passphrase. Useful for exports/integrations.
 */
export async function GET() {
  if (!(await isAdvisorAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, leads });
}
