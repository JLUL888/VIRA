import Link from "next/link";
import { Logo } from "./Logo";
import { brand } from "@/lib/brand";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-ink text-paper">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo subdued />
          <p className="mt-4 max-w-xs text-sm leading-6 text-paper/70">
            {brand.positioning}
          </p>
          <p className="mt-4 text-sm text-paper/60">{brand.contact.region}</p>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { href: "/services", label: "Services" },
            { href: "/about", label: "About" },
            { href: "/resources", label: "Resources" },
            { href: "/local-strategy", label: "On the Cape" },
          ]}
        />
        <FooterCol
          title="Get started"
          links={[
            { href: "/clarity-session", label: "Business Clarity Session" },
            { href: "/checklist", label: "Operating Checklist" },
            { href: "/contact", label: "Contact" },
          ]}
        />
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
            Reach us
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>
              <a href={`mailto:${brand.contact.email}`} className="hover:text-wood">
                {brand.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${brand.contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-wood">
                {brand.contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-paper/50 sm:flex-row sm:items-center">
          <p>
            © {year} {brand.fullName}. Serving {brand.contact.serviceArea}.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-paper/80">
              Advisor login
            </Link>
            <span className="text-paper/30">
              Working brand name — easily changed in config.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm text-paper/80">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-wood">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
