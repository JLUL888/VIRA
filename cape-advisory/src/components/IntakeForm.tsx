"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  REVENUE_RANGES,
  HEADCOUNT_BANDS,
  ACCOUNTING_SYSTEMS,
  SALES_CHANNELS,
  SCALE_3,
  BOOKS_SCALE,
  CASHFLOW_SCALE,
  ENGAGEMENT_INTEREST,
} from "@/lib/options";

type FieldErrors = Record<string, string[] | undefined>;

const initial = {
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  town: "",
  links: "",
  whatTheySell: "",
  whereTheySell: [] as string[],
  revenueRange: "",
  headcount: "",
  accountingSystem: "",
  biggestFrustration: "",
  confidentInPricing: "",
  knowsProfitability: "",
  cashFlowStruggle: "",
  behindOnBooks: "",
  needsOnlineHelp: false,
  needsTaxHelp: false,
  engagementInterest: "",
  company_website: "", // honeypot
};

export function IntakeForm() {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [topError, setTopError] = useState<string | null>(null);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleChannel(channel: string) {
    setForm((f) => ({
      ...f,
      whereTheySell: f.whereTheySell.includes(channel)
        ? f.whereTheySell.filter((c) => c !== channel)
        : [...f.whereTheySell, channel],
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTopError(null);
    setErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setErrors(json.fieldErrors ?? {});
        setTopError(json.error ?? "Please review the highlighted fields.");
        setSubmitting(false);
        // Move focus to the error summary
        document.getElementById("form-error-summary")?.focus();
        return;
      }

      router.push(`/clarity-session/confirmation?id=${encodeURIComponent(json.id)}`);
    } catch {
      setTopError("Network error — please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      {topError && (
        <div
          id="form-error-summary"
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
        >
          {topError}
        </div>
      )}

      {/* Honeypot — visually hidden, not display:none so bots still see it */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={form.company_website}
          onChange={(e) => set("company_website", e.target.value)}
        />
      </div>

      {/* Section 1 */}
      <Fieldset legend="About you & the business" step="1">
        <div className="grid gap-5 sm:grid-cols-2">
          <Text label="Business name" name="businessName" value={form.businessName} onChange={(v) => set("businessName", v)} error={errors.businessName} required />
          <Text label="Your name" name="ownerName" value={form.ownerName} onChange={(v) => set("ownerName", v)} error={errors.ownerName} required />
          <Text label="Email" name="email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} required />
          <Text label="Phone" name="phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} required />
          <Text label="Town" name="town" value={form.town} onChange={(v) => set("town", v)} error={errors.town} required hint="Mashpee, Falmouth, Sandwich…" />
          <Text label="Website / Instagram / Etsy / Amazon / Shopify" name="links" value={form.links} onChange={(v) => set("links", v)} error={errors.links} hint="Any links — paste whatever you've got" />
        </div>
      </Fieldset>

      {/* Section 2 */}
      <Fieldset legend="What you sell & where" step="2">
        <Textarea label="What do you sell?" name="whatTheySell" value={form.whatTheySell} onChange={(v) => set("whatTheySell", v)} error={errors.whatTheySell} required hint="A sentence is plenty — e.g. 'custom hardwood cutting boards and charcuterie boards.'" />
        <div className="mt-5">
          <span className="field-label">Where do you sell? <span className="text-fog">(pick all that apply)</span></span>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SALES_CHANNELS.map((channel) => {
              const checked = form.whereTheySell.includes(channel);
              return (
                <label
                  key={channel}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition ${
                    checked ? "border-harbor bg-harbor-50 text-ink" : "border-line bg-white text-ink/80 hover:border-harbor/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-line text-harbor focus:ring-harbor"
                    checked={checked}
                    onChange={() => toggleChannel(channel)}
                  />
                  {channel}
                </label>
              );
            })}
          </div>
          <FieldError error={errors.whereTheySell} />
        </div>
      </Fieldset>

      {/* Section 3 */}
      <Fieldset legend="The shape of the business" step="3">
        <div className="grid gap-5 sm:grid-cols-3">
          <Select label="Approx. annual revenue" name="revenueRange" value={form.revenueRange} onChange={(v) => set("revenueRange", v)} error={errors.revenueRange} options={REVENUE_RANGES} required />
          <Select label="People (employees / contractors)" name="headcount" value={form.headcount} onChange={(v) => set("headcount", v)} error={errors.headcount} options={HEADCOUNT_BANDS} required />
          <Select label="Accounting system used" name="accountingSystem" value={form.accountingSystem} onChange={(v) => set("accountingSystem", v)} error={errors.accountingSystem} options={ACCOUNTING_SYSTEMS} required />
        </div>
      </Fieldset>

      {/* Section 4 */}
      <Fieldset legend="Where it hurts" step="4">
        <Textarea label="Biggest business frustration right now" name="biggestFrustration" value={form.biggestFrustration} onChange={(v) => set("biggestFrustration", v)} error={errors.biggestFrustration} required hint="Be honest — this is the most useful answer on the form." rows={4} />
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Radio label="Do you feel confident in your pricing?" name="confidentInPricing" value={form.confidentInPricing} onChange={(v) => set("confidentInPricing", v)} error={errors.confidentInPricing} options={SCALE_3} />
          <Radio label="Do you know which products/services are most profitable?" name="knowsProfitability" value={form.knowsProfitability} onChange={(v) => set("knowsProfitability", v)} error={errors.knowsProfitability} options={SCALE_3} />
          <Radio label="Do you struggle with cash flow?" name="cashFlowStruggle" value={form.cashFlowStruggle} onChange={(v) => set("cashFlowStruggle", v)} error={errors.cashFlowStruggle} options={CASHFLOW_SCALE} />
          <Radio label="Are you behind on bookkeeping?" name="behindOnBooks" value={form.behindOnBooks} onChange={(v) => set("behindOnBooks", v)} error={errors.behindOnBooks} options={BOOKS_SCALE} />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Check label="I need help with online sales or order management" checked={form.needsOnlineHelp} onChange={(v) => set("needsOnlineHelp", v)} />
          <Check label="I need help preparing for taxes" checked={form.needsTaxHelp} onChange={(v) => set("needsTaxHelp", v)} />
        </div>
      </Fieldset>

      {/* Section 5 */}
      <Fieldset legend="What you're looking for" step="5">
        <Radio
          label="At this point, are you interested in…"
          name="engagementInterest"
          value={form.engagementInterest}
          onChange={(v) => set("engagementInterest", v)}
          error={errors.engagementInterest}
          options={ENGAGEMENT_INTEREST}
          stack
        />
      </Fieldset>

      <div className="border-t border-line pt-6">
        <button type="submit" className="btn-primary w-full px-7 py-4 text-base sm:w-auto" disabled={submitting}>
          {submitting ? "Sending…" : "Request my free Clarity Session"}
        </button>
        <p className="mt-3 text-sm text-fog">
          No cost, no obligation. We&rsquo;ll reach out to schedule, and you&rsquo;ll leave the
          session with a one-page roadmap. Your details are used only to prepare for the
          conversation.
        </p>
      </div>
    </form>
  );
}

/* ---------------- Field primitives ---------------- */

function Fieldset({ legend, step, children }: { legend: string; step: string; children: React.ReactNode }) {
  return (
    <fieldset className="card bg-white/70 p-6 sm:p-7">
      <legend className="flex items-center gap-3 px-1">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-harbor text-xs font-semibold text-paper">
          {step}
        </span>
        <span className="text-lg font-semibold text-ink">{legend}</span>
      </legend>
      <div className="mt-5">{children}</div>
    </fieldset>
  );
}

function FieldError({ error }: { error?: string[] }) {
  if (!error?.length) return null;
  return <p className="mt-1 text-xs font-medium text-red-700">{error[0]}</p>;
}

function Text({
  label, name, value, onChange, error, type = "text", required, hint,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  error?: string[]; type?: string; required?: boolean; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {required && <span className="text-wood">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="field"
        value={value}
        required={required}
        aria-invalid={!!error}
        aria-describedby={hint ? `${name}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p id={`${name}-hint`} className="field-hint">{hint}</p>}
      <FieldError error={error} />
    </div>
  );
}

function Textarea({
  label, name, value, onChange, error, required, hint, rows = 3,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  error?: string[]; required?: boolean; hint?: string; rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {required && <span className="text-wood">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="field"
        value={value}
        required={required}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="field-hint">{hint}</p>}
      <FieldError error={error} />
    </div>
  );
}

function Select({
  label, name, value, onChange, error, options, required,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  error?: string[]; options: readonly { value: string; label: string }[]; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {required && <span className="text-wood">*</span>}
      </label>
      <select
        id={name}
        name={name}
        className="field"
        value={value}
        required={required}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <FieldError error={error} />
    </div>
  );
}

function Radio({
  label, name, value, onChange, error, options, stack,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  error?: string[]; options: readonly { value: string; label: string }[]; stack?: boolean;
}) {
  return (
    <fieldset>
      <legend className="field-label">{label}</legend>
      <div className={stack ? "mt-1 space-y-2" : "mt-1 flex flex-wrap gap-2"}>
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition ${
                stack ? "w-full" : ""
              } ${checked ? "border-harbor bg-harbor-50 text-ink" : "border-line bg-white text-ink/80 hover:border-harbor/40"}`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="h-4 w-4 border-line text-harbor focus:ring-harbor"
              />
              {o.label}
            </label>
          );
        })}
      </div>
      <FieldError error={error} />
    </fieldset>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
      checked ? "border-harbor bg-harbor-50 text-ink" : "border-line bg-white text-ink/80 hover:border-harbor/40"
    }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-line text-harbor focus:ring-harbor"
      />
      <span>{label}</span>
    </label>
  );
}
