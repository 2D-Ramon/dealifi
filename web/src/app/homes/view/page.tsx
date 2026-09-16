"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RequireAuth } from "@/components/RequireAuth";
import { useStore } from "@/lib/store";

export default function HomeDetailPage() {
  return (
    <RequireAuth>
      <Suspense>
        <HomeDetailInner />
      </Suspense>
    </RequireAuth>
  );
}

function HomeDetailInner() {
  const search = useSearchParams();
  const id = search.get("id");
  const { listing, user } = useStore();

  if (!listing || listing.id !== id || listing.status !== "live") {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <p className="text-muted">Listing not live.</p>
        <Link href="/homes" className="mt-4 inline-block text-brand">
          Back to homes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {listing.photos[0] && (
        <img
          src={listing.photos[0].dataUrl}
          alt=""
          className="mb-6 h-64 w-full rounded-xl object-cover"
        />
      )}
      <p className="text-sm uppercase tracking-wider text-brand">Tulsa · FSBO</p>
      <h1 className="mt-1 text-3xl font-semibold text-navy">
        ${Number(listing.listPrice || 0).toLocaleString()}
      </h1>
      <p className="mt-1 text-muted">
        {listing.street}, {listing.city}, {listing.state} {listing.zip}
      </p>
      <p className="mt-4 text-sm">
        {listing.beds} beds · {listing.baths} baths · {listing.sqft} sqft
      </p>
      <div className="mt-8 df-card p-5 text-sm">
        <p>
          Private showing: ID {listing.showingRequireId ? "required" : "optional"}
          . Proof of funds{" "}
          {listing.showingRequireFunds ? "required" : "optional"}.
        </p>
        <p className="mt-2 text-muted">
          Address / access for private showings is hidden until the seller
          approves and ID is on file.
        </p>
        {user?.role === "buyer" ? (
          <p className="mt-4 text-muted">
            Showing requests and offers ship next. Disclosures must be
            acknowledged before an offer.
          </p>
        ) : (
          <Link href="/login" className="df-btn df-btn-primary mt-4 inline-flex">
            Sign in as a buyer
          </Link>
        )}
      </div>
    </div>
  );
}
