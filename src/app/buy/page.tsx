"use client";

import Link from "next/link";
import { useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { useStore } from "@/lib/store";

export default function BuyPage() {
  return (
    <RequireAuth>
      <BuyInner />
    </RequireAuth>
  );
}

function BuyInner() {
  const { buyer, updateBuyer } = useStore();
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-3xl font-semibold text-navy">Buyer interview</h1>
      <p className="mt-2 text-sm text-muted">
        This helps match listings and keeps looky-loos from wasting seller time.
        If you are not pre-approved, we can introduce a lender (referral).
      </p>
      <form
        className="mt-8 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <label className="block text-sm font-medium">
          Budget max ($)
          <input
            className="df-input mt-1.5"
            value={buyer?.budgetMax ?? ""}
            onChange={(e) => updateBuyer({ budgetMax: e.target.value })}
          />
        </label>
        <label className="block text-sm font-medium">
          Pre-approved?
          <select
            className="df-input mt-1.5"
            value={
              buyer?.preapproved === null || buyer?.preapproved === undefined
                ? ""
                : buyer.preapproved
                  ? "yes"
                  : "no"
            }
            onChange={(e) =>
              updateBuyer({
                preapproved: e.target.value === "yes",
              })
            }
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">Not yet</option>
          </select>
        </label>
        {buyer?.preapproved === false && (
          <p className="rounded-md bg-brand/10 px-3 py-2 text-sm">
            We can connect you with a lender. That referral is how DealiFi
            helps you get ready — and how we get paid later.
          </p>
        )}
        <label className="block text-sm font-medium">
          Timeline
          <input
            className="df-input mt-1.5"
            value={buyer?.timeline ?? ""}
            onChange={(e) => updateBuyer({ timeline: e.target.value })}
            placeholder="e.g. 30–60 days"
          />
        </label>
        <label className="block text-sm font-medium">
          Beds needed
          <input
            className="df-input mt-1.5"
            value={buyer?.beds ?? ""}
            onChange={(e) => updateBuyer({ beds: e.target.value })}
          />
        </label>
        <label className="block text-sm font-medium">
          Must-haves
          <textarea
            className="df-input mt-1.5 min-h-[72px]"
            value={buyer?.mustHaves ?? ""}
            onChange={(e) => updateBuyer({ mustHaves: e.target.value })}
          />
        </label>
        <label className="block text-sm font-medium">
          Commute / area
          <input
            className="df-input mt-1.5"
            value={buyer?.commute ?? ""}
            onChange={(e) => updateBuyer({ commute: e.target.value })}
          />
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={buyer?.readyToBuy === true}
            onChange={(e) => updateBuyer({ readyToBuy: e.target.checked })}
          />
          I am ready to buy a home in Tulsa, not only browsing.
        </label>
        <button type="submit" className="df-btn df-btn-primary">
          Save interview
        </button>
        {saved && (
          <p className="text-sm text-success">
            Saved.{" "}
            <Link href="/homes" className="underline">
              Browse Tulsa homes
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
