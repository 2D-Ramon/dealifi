"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/RequireAuth";
import { progress } from "@/lib/modules";
import { useStore } from "@/lib/store";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardInner />
    </RequireAuth>
  );
}

function DashboardInner() {
  const { user, listing, signOut } = useStore();
  const p = progress(listing, user);
  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-navy">
            Hello, {user.firstName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {user.role === "seller" ? "Seller" : "Buyer"} dashboard · Tulsa beta
          </p>
        </div>
        <button type="button" className="df-btn df-btn-secondary text-sm" onClick={signOut}>
          Sign out
        </button>
      </div>

      {user.role === "seller" ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="df-card p-5">
            <p className="text-sm text-muted">Listing</p>
            <p className="mt-1 text-lg font-semibold">
              {listing?.status === "live" ? "Live" : "Draft"} · {p.pct}%
            </p>
            <Link href="/sell" className="mt-3 inline-block text-sm text-brand">
              Continue listing →
            </Link>
          </article>
          <article className="df-card p-5">
            <p className="text-sm text-muted">Offers</p>
            <p className="mt-1 text-lg font-semibold">None yet</p>
            <p className="mt-2 text-sm text-muted">
              Structured offers + DocuSign land in week 6.
            </p>
          </article>
          <article className="df-card p-5">
            <p className="text-sm text-muted">Messages</p>
            <p className="mt-1 text-lg font-semibold">In-app only</p>
            <p className="mt-2 text-sm text-muted">Threads open when a buyer writes.</p>
          </article>
          <article className="df-card p-5">
            <p className="text-sm text-muted">E-sign</p>
            <p className="mt-2 text-sm text-muted">
              DocuSign. Add keys to web/.env.local when you are ready to send
              envelopes.
            </p>
          </article>
        </div>
      ) : (
        <div className="mt-8 df-card p-5">
          <p className="font-semibold">Buyer</p>
          <p className="mt-2 text-sm text-muted">
            Finish your interview, then browse Tulsa homes. An account is
            required to offer.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/buy" className="df-btn df-btn-primary text-sm">
              Interview
            </Link>
            <Link href="/homes" className="df-btn df-btn-secondary text-sm">
              Homes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
