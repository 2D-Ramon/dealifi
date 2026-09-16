"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { RequireAuth } from "@/components/RequireAuth";
import { SellModule } from "@/components/SellModule";

export default function SellModulePage() {
  const params = useParams<{ module: string }>();

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/sell" className="text-sm text-brand hover:underline">
          ← All steps
        </Link>
        <div className="mt-4">
          <SellModule moduleId={params.module} />
        </div>
      </div>
    </RequireAuth>
  );
}
