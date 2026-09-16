import Link from "next/link";
import { PLATFORM } from "@/lib/pricing";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-stone-300">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-6 px-4 py-10 text-sm">
        <div>
          <p className="font-semibold text-white">{PLATFORM.name}</p>
          <p className="mt-2 max-w-xs text-stone-400">
            {PLATFORM.tagline} {PLATFORM.geography} first. Software only — not a
            brokerage, not legal advice.
          </p>
        </div>
        <ul className="space-y-1.5">
          <li>
            <Link href="/how-it-works" className="hover:text-white">
              How it works
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-white">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/legal/terms" className="hover:text-white">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/legal/privacy" className="hover:text-white">
              Privacy
            </Link>
          </li>
        </ul>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {PLATFORM.name} · Tulsa beta · E-sign via{" "}
        {PLATFORM.esign}
      </p>
    </footer>
  );
}
