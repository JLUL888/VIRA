import { cookies } from "next/headers";

/**
 * Minimal shared-passphrase gate for the internal advisor dashboard.
 *
 * This is intentionally simple — appropriate for a single-advisor internal
 * tool. For multi-user production use, swap this for a real auth provider
 * (e.g. Auth.js). The gate is a no-op if ADVISOR_DASHBOARD_PASSWORD is unset,
 * which keeps local development frictionless.
 */
const COOKIE = "advisor_session";

export function dashboardPassword(): string | null {
  const pw = process.env.ADVISOR_DASHBOARD_PASSWORD?.trim();
  return pw && pw.length > 0 ? pw : null;
}

export async function isAdvisorAuthed(): Promise<boolean> {
  const required = dashboardPassword();
  if (!required) return true; // gate disabled
  const jar = await cookies();
  return jar.get(COOKIE)?.value === tokenFor(required);
}

export function tokenFor(password: string): string {
  // Not cryptographic — just avoids storing the raw passphrase in the cookie.
  let h = 0;
  const salted = `clearharbor:${password}`;
  for (let i = 0; i < salted.length; i++) {
    h = (Math.imul(31, h) + salted.charCodeAt(i)) | 0;
  }
  return `v1_${(h >>> 0).toString(36)}`;
}

export const ADVISOR_COOKIE = COOKIE;
