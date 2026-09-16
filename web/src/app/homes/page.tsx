"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/RequireAuth";
import { useStore } from "@/lib/store";

export default function HomesPage() {
  return (
    <RequireAuth>
      <HomesInner />
    </RequireAuth>
  );
}

function HomesInner() {
  const { listing } = useStore();
  const live = listing?.status === "live" ? [listing] : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-navy">Tulsa homes</h1>
      <p className="mt-2 text-sm text-muted">
        Listings live on DealiFi only in this beta. No MLS syndication yet.
      </p>
      {live.length === 0 ? (
        <p className="mt-10 text-muted">
          No live listings yet.{" "}
          <Link href="/sell" className="text-brand underline">
            List a home
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {live.map((l) => (
            <li key={l.id}>
              <Link href={`/homes/${l.id}`} className="df-card block overflow-hidden">
                {l.photos[0] && (
                  <img
                    src={l.photos[0].dataUrl}
                    alt=""
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="font-semibold text-navy">
                    ${Number(l.listPrice || 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted">
                    {l.street}, {l.city} {l.zip}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {l.beds} bd · {l.baths} ba · {l.sqft} sqft
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
