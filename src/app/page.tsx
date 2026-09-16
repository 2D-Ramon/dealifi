import Link from "next/link";
import { PLATFORM } from "@/lib/pricing";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">
        Tulsa beta · {PLATFORM.esign} · $0 while we learn
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-navy sm:text-5xl">
        List your home. Take offers. Close — without a required agent.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{PLATFORM.mission}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/sell" className="df-btn df-btn-primary">
          I want to sell
        </Link>
        <Link href="/buy" className="df-btn df-btn-secondary">
          I want to buy
        </Link>
      </div>
      <ol className="mt-14 grid gap-4 sm:grid-cols-3">
        {[
          ["Answer", "TurboTax-style questions. Branch for HOA, well, homestead, and more."],
          ["Go live", "Listing, flyer, and share link. All modules must be complete."],
          ["Deal room", "Offers on Oklahoma forms, showings, timeline, title and lender invited in."],
        ].map(([t, b]) => (
          <li key={t} className="df-card p-5">
            <p className="font-semibold text-navy">{t}</p>
            <p className="mt-2 text-sm text-muted">{b}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm text-muted">
        DealiFi is software, not a brokerage. Optional realtor review and lender
        help are upsells. Earnest money stays with title.
      </p>
    </div>
  );
}
