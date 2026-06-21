"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { brand } from "@/lib/brand";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/local-strategy", label: "On the Cape" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" aria-label={`${brand.fullName} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-harbor"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/clarity-session" className="btn-primary text-sm">
            Book a Clarity Session
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper md:hidden"
          aria-label="Mobile"
        >
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-paper-deep"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/clarity-session"
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              Book a Clarity Session
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
