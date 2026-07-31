import Link from "next/link";
import { socialLinks } from "@/data/social";

export default function Footer() {
  return (
    <footer className="border-t border-base-border px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-tight text-ink">
            Manoj M
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            AI Engineer — Artificial Intelligence &amp; Data Science student,
            building models and products end to end.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.icon === "mail" ? undefined : "_blank"}
                rel="noreferrer"
                className="text-ink-muted transition-colors hover:text-signal focus-ring"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col-reverse items-start justify-between gap-4 border-t border-base-border pt-6 text-xs text-ink-faint md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Manoj M. All rights reserved.</p>
        <p>Designed and built from scratch.</p>
      </div>
    </footer>
  );
}
