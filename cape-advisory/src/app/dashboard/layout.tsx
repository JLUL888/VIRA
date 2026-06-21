import Link from "next/link";
import { isAdvisorAuthed } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { loginAction, logoutAction } from "./actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdvisorAuthed();

  if (!authed) {
    return <LoginScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper-deep">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Logo />
            </Link>
            <span className="hidden rounded-full bg-harbor px-2.5 py-1 text-xs font-semibold text-paper sm:inline">
              Advisor console
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="font-medium text-ink/80 hover:text-harbor">
              Leads
            </Link>
            <Link href="/" className="font-medium text-ink/60 hover:text-harbor">
              View site
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="btn-ghost px-3 py-1.5 text-xs">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line py-6 text-center text-xs text-fog">
        Internal advisor console — not indexed, not linked publicly beyond the footer.
      </footer>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo subdued />
        </div>
        <div className="card bg-paper p-7">
          <h1 className="text-xl font-semibold text-ink">Advisor sign-in</h1>
          <p className="mt-1 text-sm text-fog">
            Internal console for managing Business Clarity Session leads.
          </p>
          <form action={loginAction} className="mt-6 space-y-4">
            <div>
              <label htmlFor="password" className="field-label">
                Passphrase
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="field"
                autoFocus
                required
              />
              <p className="field-hint">
                Set via <code className="text-ink/70">ADVISOR_DASHBOARD_PASSWORD</code>.
                Default seed value is <code className="text-ink/70">capecod</code>.
              </p>
            </div>
            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
