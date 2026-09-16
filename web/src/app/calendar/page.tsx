"use client";

import { RequireAuth } from "@/components/RequireAuth";

export default function CalendarPage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-navy">
          Tulsa County open houses
        </h1>
        <p className="mt-3 text-muted">
          Public calendar of every DealiFi open house in Tulsa County. Other
          counties come after OKC. None scheduled yet — sellers add times from
          the listing dashboard.
        </p>
      </div>
    </RequireAuth>
  );
}
