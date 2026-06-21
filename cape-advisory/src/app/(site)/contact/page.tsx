import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${brand.fullName} — serving ${brand.contact.serviceArea}.`,
};

export default function ContactPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
            Let&rsquo;s talk — no pitch, no pressure.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-ink/80">
            The easiest way to start is the free Business Clarity Session. Prefer to just
            reach out first? Use whatever&rsquo;s below.
          </p>

          <div className="mt-8 space-y-5">
            <ContactRow label="Email" value={brand.contact.email} href={`mailto:${brand.contact.email}`} />
            <ContactRow
              label="Phone"
              value={brand.contact.phone}
              href={`tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`}
            />
            <ContactRow label="Service area" value={brand.contact.serviceArea} />
          </div>

          <div className="mt-10 rounded-2xl border border-harbor/30 bg-harbor-50/50 p-6">
            <p className="font-semibold text-harbor">{brand.primaryOffer.short}</p>
            <p className="mt-1 text-sm text-ink/80">{brand.primaryOffer.deliverable}</p>
            <Link href="/clarity-session" className="btn-primary mt-4">
              Book the session
            </Link>
          </div>
        </div>

        <div className="card bg-white/70 p-7">
          <h2 className="text-lg font-semibold text-ink">Send a quick note</h2>
          <p className="mt-1 text-sm text-fog">
            For a full intake, the{" "}
            <Link href="/clarity-session" className="text-harbor hover:underline">
              Clarity Session form
            </Link>{" "}
            tells us more. This is just to say hello.
          </p>
          {/* Simple mailto-based contact to keep it functional without extra infra. */}
          <form
            action={`mailto:${brand.contact.email}`}
            method="post"
            encType="text/plain"
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="name" className="field-label">Your name</label>
              <input id="name" name="name" type="text" className="field" required />
            </div>
            <div>
              <label htmlFor="email" className="field-label">Email</label>
              <input id="email" name="email" type="email" className="field" required />
            </div>
            <div>
              <label htmlFor="message" className="field-label">Message</label>
              <textarea id="message" name="message" rows={5} className="field" required />
            </div>
            <button type="submit" className="btn-primary w-full">Send</button>
            <p className="field-hint">
              This opens your email app. Prefer the form?{" "}
              <Link href="/clarity-session" className="text-harbor hover:underline">
                Use the Clarity Session intake.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="w-24 shrink-0 text-sm font-semibold uppercase tracking-wide text-fog">
        {label}
      </span>
      {href ? (
        <a href={href} className="text-lg text-ink hover:text-harbor">
          {value}
        </a>
      ) : (
        <span className="text-lg text-ink">{value}</span>
      )}
    </div>
  );
}
