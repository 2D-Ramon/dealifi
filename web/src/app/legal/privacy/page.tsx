import { PLATFORM } from "@/lib/pricing";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed text-muted">
      <h1 className="text-3xl font-semibold text-navy">Privacy</h1>
      <p className="mt-6">
        During beta, listing drafts and accounts are stored in your browser
        (localStorage) until we connect the production database. Do not enter
        real Social Security numbers or bank accounts in this beta.
      </p>
      <p className="mt-4">
        When live, we will store profiles, listings, documents, and ID uploads
        to operate showings and e-sign. We will not sell your data. Contact{" "}
        {PLATFORM.supportEmail}.
      </p>
    </div>
  );
}
