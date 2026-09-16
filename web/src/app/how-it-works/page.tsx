export const metadata = { title: "How it works" };

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-navy">How it works</h1>
      <div className="mt-8 space-y-6 text-muted">
        <section>
          <h2 className="font-semibold text-navy">Sellers</h2>
          <p className="mt-2">
            Walk through modules at your pace. The listing cannot go live until
            every required step is done. Then you get a public page, flyer, and
            a dashboard for offers, showings, and documents.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-navy">Buyers</h2>
          <p className="mt-2">
            Create an account, complete a readiness interview, and search Tulsa
            listings. Private showings need ID. Offers require you to review
            each section of the Oklahoma contract and acknowledge disclosures.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-navy">Not a broker</h2>
          <p className="mt-2">
            DealiFi provides forms and workflow. You can bring a realtor,
            attorney, or title company at any time. We do not hold earnest
            money.
          </p>
        </section>
      </div>
    </div>
  );
}
