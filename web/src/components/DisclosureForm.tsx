"use client";

import {
  DISCLOSURE_QUESTIONS,
  WORKING_ITEMS,
  WORKING_STATUSES,
  ZONING_OPTIONS,
} from "@/lib/orec-disclosure";
import { useStore } from "@/lib/store";

export function DisclosureForm() {
  const { listing, updateListing } = useStore();
  if (!listing) return null;

  function setWorking(
    id: string,
    patch: Partial<{ status: string; extras: string[] }>,
  ) {
    const cur = listing!.disclosureWorking[id] ?? { status: "", extras: [] };
    updateListing({
      disclosureWorking: {
        ...listing!.disclosureWorking,
        [id]: { ...cur, ...patch },
      },
    });
  }

  function setAnswer(id: string, patch: Partial<{ answer: string; note: string }>) {
    const cur = listing!.disclosureAnswers[id] ?? { answer: "", note: "" };
    updateListing({
      disclosureAnswers: {
        ...listing!.disclosureAnswers,
        [id]: { ...cur, ...patch },
      },
    });
  }

  return (
    <div className="space-y-6 text-sm">
      <div className="rounded-lg border border-border bg-background p-4">
        <p className="font-semibold text-navy">
          Oklahoma Real Estate Commission — Appendix A
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-muted">
          Residential Property Condition Disclosure Statement (01-01-2026)
        </p>
        <p className="mt-3 text-muted">
          Oklahoma law (Title 60, O.S. § 831 et seq.) requires sellers of 1 and/or
          2 residential dwelling units to complete this form. Answer ALL
          questions. Report known conditions. Complete this form yourself. If an
          item is not on the property, or will not be included in the sale, mark
          “None/Not Included.” If you do not know the facts, mark “Do Not Know if
          Working.” This is a legally binding statement, not a warranty. If you
          do not understand it, talk to an attorney. Official PDF:{" "}
          <a
            className="text-brand underline"
            href="/forms/orec-appendix-a-disclosure.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Appendix A
          </a>
          .
        </p>
      </div>

      <label className="flex items-start gap-2">
        <span className="mt-1 w-40 shrink-0 font-medium">Seller occupying?</span>
        <select
          className="df-input"
          value={
            listing.disclosureOccupied === null
              ? ""
              : listing.disclosureOccupied
                ? "yes"
                : "no"
          }
          onChange={(e) =>
            updateListing({
              disclosureOccupied: e.target.value === "yes",
            })
          }
        >
          <option value="">Select</option>
          <option value="yes">Seller IS occupying the subject property</option>
          <option value="no">Seller IS NOT occupying the subject property</option>
        </select>
      </label>

      <div>
        <h2 className="font-semibold text-navy">
          Are the items listed below in normal working order?
        </h2>
        <div className="mt-3 space-y-3">
          {WORKING_ITEMS.map((item) => {
            const row = listing.disclosureWorking[item.id] ?? {
              status: "",
              extras: [],
            };
            return (
              <div
                key={item.id}
                className="rounded-lg border border-border p-3"
              >
                <p className="font-medium">{item.label}</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {WORKING_STATUSES.map((s) => (
                    <label key={s.id} className="flex items-center gap-1.5 text-xs">
                      <input
                        type="radio"
                        name={`w-${item.id}`}
                        checked={row.status === s.id}
                        onChange={() => setWorking(item.id, { status: s.id })}
                      />
                      {s.label}
                    </label>
                  ))}
                </div>
                {item.extras && row.status && row.status !== "none" && (
                  <div className="mt-2 flex flex-wrap gap-3">
                    {item.extras.map((ex) => (
                      <label key={ex.id} className="flex items-center gap-1.5 text-xs">
                        <input
                          type="checkbox"
                          checked={row.extras.includes(ex.id)}
                          onChange={(e) => {
                            const extras = e.target.checked
                              ? [...row.extras, ex.id]
                              : row.extras.filter((x) => x !== ex.id);
                            setWorking(item.id, { extras });
                          }}
                        />
                        {ex.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <label className="mt-3 block font-medium">
          If you answered Not Working to any items, explain
          <textarea
            className="df-input mt-1.5 min-h-[72px]"
            value={listing.disclosureNotWorkingExplain}
            onChange={(e) =>
              updateListing({ disclosureNotWorkingExplain: e.target.value })
            }
          />
        </label>
      </div>

      <div>
        <h2 className="font-semibold text-navy">Zoning and Historical</h2>
        <label className="mt-2 block font-medium">
          1. Property is zoned
          <select
            className="df-input mt-1.5"
            value={listing.disclosureZoning}
            onChange={(e) => updateListing({ disclosureZoning: e.target.value })}
          >
            <option value="">Select</option>
            {ZONING_OPTIONS.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <h2 className="font-semibold text-navy">
          Flood, additions, environmental, HOA, and miscellaneous
        </h2>
        <p className="mt-1 text-xs text-muted">
          Yes / No / Unknown. If yes, explain at the bottom (item numbers).
        </p>
        <div className="mt-3 space-y-3">
          {DISCLOSURE_QUESTIONS.map((q) => {
            const row = listing.disclosureAnswers[q.id] ?? {
              answer: "",
              note: "",
            };
            return (
              <div key={q.id} className="rounded-lg border border-border p-3">
                <p>
                  <span className="font-semibold">{q.n}.</span> {q.text}
                </p>
                <div className="mt-2 flex gap-4 text-xs">
                  {["yes", "no", "unknown"].map((a) => (
                    <label key={a} className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name={q.id}
                        checked={row.answer === a}
                        onChange={() => setAnswer(q.id, { answer: a })}
                      />
                      {a === "yes" ? "Yes" : a === "no" ? "No" : "Unknown"}
                    </label>
                  ))}
                </div>
                {q.id === "q15" && (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <input
                      className="df-input"
                      placeholder="16. Approximate age of roof covering"
                      value={listing.disclosureRoofAge}
                      onChange={(e) =>
                        updateListing({ disclosureRoofAge: e.target.value })
                      }
                    />
                    <input
                      className="df-input"
                      placeholder="Number of layers, if known"
                      value={listing.disclosureRoofLayers}
                      onChange={(e) =>
                        updateListing({ disclosureRoofLayers: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <label className="mt-3 block font-medium">
          If you answered YES to any items on pages 2–4, list the item number(s)
          and explain
          <textarea
            className="df-input mt-1.5 min-h-[88px]"
            value={listing.disclosureYesExplain}
            onChange={(e) =>
              updateListing({ disclosureYesExplain: e.target.value })
            }
          />
        </label>
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-1"
          checked={listing.disclosureCertified}
          onChange={(e) =>
            updateListing({ disclosureCertified: e.target.checked })
          }
        />
        <span>
          On the date this form is completed, based on my CURRENT ACTUAL
          KNOWLEDGE of the property, the information above is true and accurate.
          A real estate licensee has no duty to independently inspect the
          property or verify these statements. This disclosure is not valid after
          180 days from the date completed.
        </span>
      </label>
    </div>
  );
}
