"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { hydrated, user } = useStore();
  const pathname = usePathname();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center text-muted">
        Loading…
      </div>
    );
  }

  if (!user) {
    const next = encodeURIComponent(pathname || "/dashboard");
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold text-navy">Account required</h1>
        <p className="mt-3 text-muted">
          Sellers and buyers must create an account and sign in before using
          DealiFi.
        </p>
        <Link
          href={`/login?next=${next}`}
          className="df-btn df-btn-primary mt-6 inline-flex"
        >
          Create account / Sign in
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
