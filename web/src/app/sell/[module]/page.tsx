import Link from "next/link";
import { RequireAuth } from "@/components/RequireAuth";
import { SellModule } from "@/components/SellModule";
import { SELLER_MODULES } from "@/lib/modules";

export function generateStaticParams() {
  return SELLER_MODULES.map((m) => ({ module: m.id }));
}

export default async function SellModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/sell" className="text-sm text-brand hover:underline">
          ← All steps
        </Link>
        <div className="mt-4">
          <SellModule moduleId={module} />
        </div>
      </div>
    </RequireAuth>
  );
}
