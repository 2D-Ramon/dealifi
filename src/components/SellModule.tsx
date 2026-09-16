"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DisclosureForm } from "@/components/DisclosureForm";
import {
  PROPERTY_TYPES,
  SELLER_MODULES,
  moduleComplete,
  requiredComplete,
} from "@/lib/modules";
import { useStore } from "@/lib/store";
import { TULSA_COUNTY, TULSA_COUNTY_CITIES } from "@/lib/tulsa";
import type { Occupancy, Owner, PropertyType } from "@/lib/types";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function SellModule({ moduleId }: { moduleId: string }) {
  const router = useRouter();
  const { user, listing, updateUser, updateListing, ensureListing, publishListing } =
    useStore();
  const [error, setError] = useState("");
  const idx = SELLER_MODULES.findIndex((m) => m.id === moduleId);
  const mod = SELLER_MODULES[idx];
  const next = SELLER_MODULES[idx + 1];
  const prev = idx > 0 ? SELLER_MODULES[idx - 1] : null;

  useEffect(() => {
    if (user && moduleId !== "account") ensureListing();
  }, [ensureListing, moduleId, user]);

  if (!mod) {
    return <p className="text-muted">Unknown step.</p>;
  }

  function goNext() {
    setError("");
    if (moduleId === "review") return;
    if (!user) {
      setError("Sign in first.");
      return;
    }
    const L = listing;
    if (!moduleComplete(moduleId, L, user)) {
      setError("Finish this step before continuing.");
      return;
    }
    if (next) router.push(`/sell/${next.id}`);
  }

  return (
    <div className="df-card p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand">
        Step {idx + 1} of {SELLER_MODULES.length}
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-navy">{mod.title}</h1>
      <p className="mt-1 text-sm text-muted">{mod.blurb}</p>

      <div className="mt-6 space-y-4">
        {moduleId === "account" && user && (
          <>
            <Field label="First name">
              <input
                className="df-input"
                value={user.firstName}
                onChange={(e) => updateUser({ firstName: e.target.value })}
              />
            </Field>
            <Field label="Last name">
              <input
                className="df-input"
                value={user.lastName}
                onChange={(e) => updateUser({ lastName: e.target.value })}
              />
            </Field>
            <Field label="Email">
              <input
                className="df-input"
                type="email"
                value={user.email}
                onChange={(e) => updateUser({ email: e.target.value })}
              />
            </Field>
            <Field label="Mobile (SMS codes later)">
              <input
                className="df-input"
                value={user.phone}
                onChange={(e) => updateUser({ phone: e.target.value })}
              />
            </Field>
          </>
        )}

        {moduleId === "owners" && listing && (
          <OwnersEditor
            owners={listing.owners}
            onChange={(owners) => updateListing({ owners })}
            seed={user}
          />
        )}

        {moduleId === "property" && listing && (
          <div className="grid gap-2">
            {PROPERTY_TYPES.map((t) => (
              <label
                key={t.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-sm ${
                  listing.propertyType === t.id
                    ? "border-brand bg-brand/5"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="ptype"
                  checked={listing.propertyType === t.id}
                  onChange={() =>
                    updateListing({ propertyType: t.id as PropertyType })
                  }
                />
                {t.label}
              </label>
            ))}
          </div>
        )}

        {moduleId === "address" && listing && (
          <>
            <p className="text-sm text-muted">
              Property must be in <strong className="text-navy">{TULSA_COUNTY}</strong>,
              not only the City of Tulsa. Pick the city or town as it appears on
              mail.
            </p>
            <Field label="Street">
              <input
                className="df-input"
                value={listing.street}
                onChange={(e) => updateListing({ street: e.target.value })}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="City / town (Tulsa County)">
                <select
                  className="df-input"
                  value={listing.city}
                  onChange={(e) =>
                    updateListing({
                      city: e.target.value,
                      county: TULSA_COUNTY,
                      state: "OK",
                    })
                  }
                >
                  <option value="">Select city in Tulsa County</option>
                  {TULSA_COUNTY_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="ZIP">
                <input
                  className="df-input"
                  value={listing.zip}
                  onChange={(e) => updateListing({ zip: e.target.value })}
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="County">
                <input className="df-input" value={TULSA_COUNTY} readOnly />
              </Field>
              <Field label="State">
                <input className="df-input" value="OK" readOnly />
              </Field>
            </div>
          </>
        )}

        {moduleId === "facts" && listing && (
          <>
            {listing.propertyType !== "land" && (
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Beds">
                  <input
                    className="df-input"
                    value={listing.beds}
                    onChange={(e) => updateListing({ beds: e.target.value })}
                  />
                </Field>
                <Field label="Baths">
                  <input
                    className="df-input"
                    value={listing.baths}
                    onChange={(e) => updateListing({ baths: e.target.value })}
                  />
                </Field>
                <Field label="Sqft">
                  <input
                    className="df-input"
                    value={listing.sqft}
                    onChange={(e) => updateListing({ sqft: e.target.value })}
                  />
                </Field>
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Lot sqft">
                <input
                  className="df-input"
                  value={listing.lotSqft}
                  onChange={(e) => updateListing({ lotSqft: e.target.value })}
                />
              </Field>
              <Field label="Year built">
                <input
                  className="df-input"
                  value={listing.yearBuilt}
                  onChange={(e) => updateListing({ yearBuilt: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Legal description">
              <textarea
                className="df-input min-h-[72px]"
                value={listing.legalDescription}
                onChange={(e) =>
                  updateListing({ legalDescription: e.target.value })
                }
              />
            </Field>
            <Field label="Annual taxes ($)">
              <input
                className="df-input"
                value={listing.annualTaxes}
                onChange={(e) => updateListing({ annualTaxes: e.target.value })}
              />
            </Field>
          </>
        )}

        {moduleId === "situation" && listing && (
          <>
            <YesNo
              label="HOA?"
              value={listing.hoa}
              onChange={(hoa) => updateListing({ hoa })}
            />
            {listing.hoa && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="HOA name">
                  <input
                    className="df-input"
                    value={listing.hoaName}
                    onChange={(e) => updateListing({ hoaName: e.target.value })}
                  />
                </Field>
                <Field label="HOA fee">
                  <input
                    className="df-input"
                    value={listing.hoaFee}
                    onChange={(e) => updateListing({ hoaFee: e.target.value })}
                  />
                </Field>
              </div>
            )}
            <YesNo
              label="Oklahoma homestead exemption?"
              value={listing.homestead}
              onChange={(homestead) => updateListing({ homestead })}
            />
            <YesNo
              label="Well or septic (not city water/sewer)?"
              value={listing.wellSeptic}
              onChange={(wellSeptic) => updateListing({ wellSeptic })}
            />
            <YesNo
              label="Unpermitted additions or work you know about?"
              value={listing.unpermittedWork}
              onChange={(unpermittedWork) => updateListing({ unpermittedWork })}
            />
            <Field label="Occupancy">
              <select
                className="df-input"
                value={listing.occupancy}
                onChange={(e) =>
                  updateListing({ occupancy: e.target.value as Occupancy })
                }
              >
                <option value="">Select</option>
                <option value="owner">Owner occupied</option>
                <option value="tenant">Tenant occupied</option>
                <option value="vacant">Vacant</option>
              </select>
            </Field>
            <Field label="Why you are selling (helps branching, stays private)">
              <select
                className="df-input"
                value={listing.saleContext}
                onChange={(e) => updateListing({ saleContext: e.target.value })}
              >
                <option value="typical">Typical move</option>
                <option value="inherited">Inherited</option>
                <option value="divorce">Divorce / split</option>
                <option value="investor">Investor / rental</option>
                <option value="other">Other</option>
              </select>
            </Field>
          </>
        )}

        {moduleId === "photos" && listing && (
          <Field label="Photos (at least one)">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = [...(e.target.files ?? [])];
                files.forEach((file) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    updateListing({
                      photos: [
                        ...listing.photos,
                        {
                          name: file.name,
                          dataUrl: String(reader.result ?? ""),
                        },
                      ],
                    });
                  };
                  reader.readAsDataURL(file);
                });
              }}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {listing.photos.map((p) => (
                <img
                  key={p.name + p.dataUrl.slice(0, 24)}
                  src={p.dataUrl}
                  alt=""
                  className="h-20 w-20 rounded-md object-cover ring-1 ring-border"
                />
              ))}
            </div>
          </Field>
        )}

        {moduleId === "disclosures" && listing && <DisclosureForm />}

        {moduleId === "repairs" && listing && (
          <>
            <Field label="Inclusions (what stays)">
              <textarea
                className="df-input min-h-[64px]"
                value={listing.inclusions}
                onChange={(e) => updateListing({ inclusions: e.target.value })}
                placeholder="Refrigerator, washer, window treatments…"
              />
            </Field>
            <Field label="Exclusions (what doesn’t stay)">
              <input
                className="df-input"
                value={listing.exclusions}
                onChange={(e) => updateListing({ exclusions: e.target.value })}
                placeholder="Mounted TV, curtains, shed…"
              />
            </Field>
            <p className="text-xs text-muted">
              Repairs and defects are answered on the Oklahoma disclosure form
              in the previous step.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Electric">
                <input
                  className="df-input"
                  value={listing.utilityElectric}
                  onChange={(e) =>
                    updateListing({ utilityElectric: e.target.value })
                  }
                  placeholder="PSO, OG&E…"
                />
              </Field>
              <Field label="Gas">
                <input
                  className="df-input"
                  value={listing.utilityGas}
                  onChange={(e) =>
                    updateListing({ utilityGas: e.target.value })
                  }
                  placeholder="ONG, propane…"
                />
              </Field>
              <Field label="Water">
                <input
                  className="df-input"
                  value={listing.utilityWater}
                  onChange={(e) =>
                    updateListing({ utilityWater: e.target.value })
                  }
                  placeholder="City of Tulsa, rural water…"
                />
              </Field>
              <Field label="Sewer">
                <input
                  className="df-input"
                  value={listing.utilitySewer}
                  onChange={(e) =>
                    updateListing({ utilitySewer: e.target.value })
                  }
                  placeholder="City sewer, septic…"
                />
              </Field>
              <Field label="Trash">
                <input
                  className="df-input"
                  value={listing.utilityTrash}
                  onChange={(e) =>
                    updateListing({ utilityTrash: e.target.value })
                  }
                />
              </Field>
              <Field label="Internet / cable">
                <input
                  className="df-input"
                  value={listing.utilityInternet}
                  onChange={(e) =>
                    updateListing({ utilityInternet: e.target.value })
                  }
                />
              </Field>
            </div>
          </>
        )}

        {moduleId === "pricing" && listing && (
          <Field label="List price ($)">
            <input
              className="df-input"
              value={listing.listPrice}
              onChange={(e) => updateListing({ listPrice: e.target.value })}
            />
          </Field>
        )}

        {moduleId === "showings" && listing && (
          <>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={listing.showingRequireId}
                onChange={(e) =>
                  updateListing({ showingRequireId: e.target.checked })
                }
              />
              Require government ID before private showing address is revealed
              (recommended).
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={listing.showingRequireFunds}
                onChange={(e) =>
                  updateListing({ showingRequireFunds: e.target.checked })
                }
              />
              Require pre-approval or proof of funds before showing
              (recommended).
            </label>
            <Field label="Showing notes (lockbox later)">
              <textarea
                className="df-input min-h-[64px]"
                value={listing.showingNotes}
                onChange={(e) =>
                  updateListing({ showingNotes: e.target.value })
                }
              />
            </Field>
          </>
        )}

        {moduleId === "review" && listing && user && (
          <ReviewBlock
            onPublish={() => {
              const res = publishListing();
              if (!res.ok) {
                setError(res.error ?? "Could not publish.");
                return;
              }
              router.push(`/homes/view?id=${listing.id}`);
            }}
          />
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="df-btn df-btn-secondary"
          onClick={() =>
            router.push(prev ? `/sell/${prev.id}` : "/sell")
          }
        >
          Back
        </button>
        {moduleId !== "review" && (
          <button type="button" className="df-btn df-btn-primary" onClick={goNext}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-2 flex gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            className={`df-btn text-sm ${
              value === v ? "df-btn-primary" : "df-btn-secondary"
            }`}
            onClick={() => onChange(v)}
          >
            {v ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
}

function OwnersEditor({
  owners,
  onChange,
  seed,
}: {
  owners: Owner[];
  onChange: (owners: Owner[]) => void;
  seed: { firstName: string; lastName: string; email: string; phone: string } | null;
}) {
  const seeded = useRef(false);
  useEffect(() => {
    if (seeded.current) return;
    if (owners.length === 0 && seed?.firstName) {
      seeded.current = true;
      onChange([
        {
          id: "own-1",
          firstName: seed.firstName,
          lastName: seed.lastName,
          email: seed.email,
          phone: seed.phone,
          isPrimary: true,
        },
      ]);
    }
  }, [owners.length, seed, onChange]);

  function patch(i: number, p: Partial<Owner>) {
    onChange(owners.map((o, idx) => (idx === i ? { ...o, ...p } : o)));
  }

  return (
    <div className="space-y-4">
      <p className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted">
        Use each owner’s <strong className="text-navy">legal name exactly as it
        appears on their state-issued ID</strong> (driver license or ID card).
        This must match title.
      </p>
      {owners.map((o, i) => (
        <div key={o.id} className="grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-2">
          <p className="sm:col-span-2 text-xs font-semibold uppercase text-muted">
            Seller {i + 1}
            {o.isPrimary ? " · primary" : ""}
          </p>
          <input
            className="df-input"
            placeholder="Legal first name (as on ID)"
            value={o.firstName}
            onChange={(e) => patch(i, { firstName: e.target.value })}
          />
          <input
            className="df-input"
            placeholder="Legal last name (as on ID)"
            value={o.lastName}
            onChange={(e) => patch(i, { lastName: e.target.value })}
          />
          <input
            className="df-input sm:col-span-2"
            placeholder="Email"
            value={o.email}
            onChange={(e) => patch(i, { email: e.target.value })}
          />
        </div>
      ))}
      {owners.length < 4 && (
        <button
          type="button"
          className="df-btn df-btn-secondary text-sm"
          onClick={() =>
            onChange([
              ...owners,
              {
                id: `own-${Date.now()}`,
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                isPrimary: false,
              },
            ])
          }
        >
          Add another owner
        </button>
      )}
    </div>
  );
}

function ReviewBlock({ onPublish }: { onPublish: () => void }) {
  const { listing, user } = useStore();
  const ready = requiredComplete(listing, user);
  return (
    <div>
      <ul className="space-y-1 text-sm">
        {SELLER_MODULES.filter((m) => m.id !== "review").map((m) => (
          <li key={m.id}>
            {moduleComplete(m.id, listing, user) ? "✓" : "○"} {m.title}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">
        Beta pricing is $0. E-sign via DocuSign when keys are connected.
      </p>
      <button
        type="button"
        disabled={!ready}
        className="df-btn df-btn-primary mt-4 disabled:opacity-50"
        onClick={onPublish}
      >
        Publish listing
      </button>
    </div>
  );
}
