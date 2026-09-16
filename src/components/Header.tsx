"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLATFORM } from "@/lib/pricing";
import { useStore } from "@/lib/store";

const links = [
  { href: "/sell", label: "Sell" },
  { href: "/buy", label: "Buy" },
  { href: "/homes", label: "Homes" },
  { href: "/calendar", label: "Open houses" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  const pathname = usePathname();
  const { user } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_oklab,var(--bg)_92%,white)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-[1.05rem] font-semibold tracking-tight text-navy">
          {PLATFORM.name}
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-2.5 py-1.5 text-sm font-medium ${
                pathname === l.href || pathname.startsWith(l.href + "/")
                  ? "bg-brand/10 text-brand-dark"
                  : "text-muted hover:text-navy"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Link href="/dashboard" className="df-btn df-btn-primary text-sm">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="df-btn df-btn-primary text-sm">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
