import { PLATFORM } from "@/lib/pricing";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed text-muted">
      <h1 className="text-3xl font-semibold text-navy">Terms of use</h1>
      <p className="mt-6">
        {PLATFORM.name} is software. We are not your broker, attorney, or
        escrow agent unless you separately hire one (including optional
        upsells). You are responsible for the accuracy of answers you give and
        documents you sign.
      </p>
      <p className="mt-4">
        Oklahoma real estate forms provided in the product are public OREC /
        statutory forms. They are legally binding. If you do not understand a
        form, consult an attorney. Earnest money is held by title or escrow, not
        by {PLATFORM.name}.
      </p>
      <p className="mt-4">
        Tulsa beta is currently $0. We may introduce paid plans later. E-sign is
        provided through {PLATFORM.esign}.
      </p>
      <p className="mt-4">Last updated September 16, 2026.</p>
    </div>
  );
}
