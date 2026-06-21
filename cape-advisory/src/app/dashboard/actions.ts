"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { ADVISOR_COOKIE, dashboardPassword, tokenFor } from "@/lib/auth";
import { generateRoadmapDraft } from "@/lib/roadmap";

/* ----------------------- Auth ----------------------- */

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const required = dashboardPassword();
  if (!required || password === required) {
    const jar = await cookies();
    jar.set(ADVISOR_COOKIE, tokenFor(required ?? "open"), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/dashboard");
  }
  redirect("/dashboard?error=1");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ADVISOR_COOKIE);
  redirect("/dashboard");
}

/* ----------------------- Lead updates ----------------------- */

export async function updateLeadAction(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status") ?? "new");
  const advisorNotes = String(formData.get("advisorNotes") ?? "");
  await prisma.lead.update({
    where: { id },
    data: { status, advisorNotes },
  });
  revalidatePath(`/dashboard/leads/${id}`);
  revalidatePath("/dashboard");
}

export async function quickStatusAction(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/leads/${id}`);
}

/* ----------------------- Roadmap ----------------------- */

/** Generate (or regenerate) a draft roadmap from the lead's intake. */
export async function generateRoadmapAction(formData: FormData) {
  const leadId = String(formData.get("id"));
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) redirect("/dashboard");

  const draft = generateRoadmapDraft({
    businessName: lead.businessName,
    ownerName: lead.ownerName,
    town: lead.town,
    whatTheySell: lead.whatTheySell,
    whereTheySell: lead.whereTheySell,
    revenueRange: lead.revenueRange,
    headcount: lead.headcount,
    accountingSystem: lead.accountingSystem,
    cashFlowStruggle: lead.cashFlowStruggle,
    behindOnBooks: lead.behindOnBooks,
    confidentInPricing: lead.confidentInPricing,
    knowsProfitability: lead.knowsProfitability,
    needsOnlineHelp: lead.needsOnlineHelp,
    needsTaxHelp: lead.needsTaxHelp,
    engagementInterest: lead.engagementInterest,
    biggestFrustration: lead.biggestFrustration,
  });

  await prisma.roadmap.upsert({
    where: { leadId },
    create: {
      leadId,
      snapshot: draft.snapshot,
      topIssues: JSON.stringify(draft.topIssues),
      immediateWins: JSON.stringify(draft.immediateWins),
      priorities30: JSON.stringify(draft.priorities30),
      priorities90: JSON.stringify(draft.priorities90),
      systemRecs: JSON.stringify(draft.systemRecs),
      engagement: draft.engagement,
      impactAreas: JSON.stringify(draft.impactAreas),
    },
    update: {
      snapshot: draft.snapshot,
      topIssues: JSON.stringify(draft.topIssues),
      immediateWins: JSON.stringify(draft.immediateWins),
      priorities30: JSON.stringify(draft.priorities30),
      priorities90: JSON.stringify(draft.priorities90),
      systemRecs: JSON.stringify(draft.systemRecs),
      engagement: draft.engagement,
      impactAreas: JSON.stringify(draft.impactAreas),
    },
  });

  revalidatePath(`/dashboard/leads/${leadId}/roadmap`);
  redirect(`/dashboard/leads/${leadId}/roadmap`);
}

/** Save advisor edits to the roadmap. Multiline textareas are split to arrays. */
export async function saveRoadmapAction(formData: FormData) {
  const leadId = String(formData.get("id"));
  const lines = (key: string) =>
    JSON.stringify(
      String(formData.get(key) ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    );

  await prisma.roadmap.update({
    where: { leadId },
    data: {
      snapshot: String(formData.get("snapshot") ?? ""),
      topIssues: lines("topIssues"),
      immediateWins: lines("immediateWins"),
      priorities30: lines("priorities30"),
      priorities90: lines("priorities90"),
      systemRecs: lines("systemRecs"),
      engagement: String(formData.get("engagement") ?? ""),
      impactAreas: lines("impactAreas"),
      preparedBy: String(formData.get("preparedBy") ?? ""),
    },
  });

  // Advance status to roadmap_sent if still early.
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (lead && ["new", "contacted", "scheduled"].includes(lead.status)) {
    await prisma.lead.update({ where: { id: leadId }, data: { status: "roadmap_sent" } });
  }

  revalidatePath(`/dashboard/leads/${leadId}/roadmap`);
  revalidatePath(`/dashboard/leads/${leadId}`);
  redirect(`/dashboard/leads/${leadId}/roadmap?saved=1`);
}
