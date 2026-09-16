"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/RequireAuth";
import { SELLER_MODULES, moduleComplete, progress } from "@/lib/modules";
import { useStore } from "@/lib/store";

export default function SellIndexPage() {
  return (
    <RequireAuth>
      <SellIndexInner />
    </RequireAuth>
  );
}

function SellIndexInner() {
  const { user, listing } = useStore();
  const p = progress(listing, user);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-navy">Your listing</h1>
      <p className="mt-2 text-sm text-muted">
        Modules can be done in any order. The listing cannot go live until all
        are complete. {p.done}/{p.n} done ({p.pct}%).
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-brand"
          style={{ width: `${p.pct}%` }}
        />
      </div>
      <ul className="mt-8 space-y-2">
        {SELLER_MODULES.map((m) => {
          const done = moduleComplete(m.id, listing, user);
          return (
            <li key={m.id}>
              <Link
                href={`/sell/${m.id}`}
                className="df-card flex items-center justify-between p-4 hover:border-brand/40"
              >
                <div>
                  <p className="font-medium text-navy">{m.title}</p>
                  <p className="text-sm text-muted">{m.blurb}</p>
                </div>
                <span className="text-sm text-brand">{done ? "Done" : "Start"}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
