import { BUYER_PLANS, SELLER_PLANS } from "@/lib/pricing";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-navy">Pricing</h1>
      <p className="mt-2 text-muted">
        Tulsa beta is <strong className="text-navy">$0</strong> for every plan.
        Pick how you would pay later — ACH preferred; card fees pass through.
      </p>
      <h2 className="mt-10 font-semibold text-navy">Sellers</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SELLER_PLANS.map((p) => (
          <article key={p.id} className="df-card p-5">
            <p className="text-sm text-brand">{p.priceLabel}</p>
            <h3 className="mt-1 font-semibold">{p.name}</h3>
            <p className="mt-2 text-sm text-muted">{p.blurb}</p>
          </article>
        ))}
      </div>
      <h2 className="mt-10 font-semibold text-navy">Buyers</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {BUYER_PLANS.map((p) => (
          <article key={p.id} className="df-card p-5">
            <p className="text-sm text-brand">{p.priceLabel}</p>
            <h3 className="mt-1 font-semibold">{p.name}</h3>
            <p className="mt-2 text-sm text-muted">{p.blurb}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
