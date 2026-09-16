import {
  DISCLOSURE_QUESTIONS,
  WORKING_ITEMS,
} from "./orec-disclosure";
import type { Listing, User } from "./types";

export interface SellerModule {
  id: string;
  title: string;
  blurb: string;
}

export const SELLER_MODULES: SellerModule[] = [
  { id: "account", title: "Your account", blurb: "Name, email, phone." },
  {
    id: "owners",
    title: "Owners on title",
    blurb: "Legal names as they appear on a state-issued ID. Up to four sellers.",
  },
  { id: "property", title: "Property type", blurb: "House, condo, land, and more." },
  {
    id: "address",
    title: "Address",
    blurb: "Tulsa County only — any city in the county.",
  },
  { id: "facts", title: "Home facts", blurb: "Beds, baths, size, taxes, legal." },
  { id: "situation", title: "Your situation", blurb: "HOA, well, homestead, occupancy." },
  { id: "photos", title: "Photos & floor plan", blurb: "At least one photo to go live." },
  {
    id: "disclosures",
    title: "Oklahoma disclosures",
    blurb: "OREC Appendix A Residential Property Condition Disclosure Statement.",
  },
  {
    id: "repairs",
    title: "Inclusions & utilities",
    blurb: "What stays, what does not, and each utility.",
  },
  { id: "pricing", title: "Price", blurb: "List price and basic terms." },
  { id: "showings", title: "Showing rules", blurb: "ID and proof-of-funds defaults." },
  { id: "review", title: "Review & publish", blurb: "All modules must be complete." },
];

export function moduleComplete(
  id: string,
  listing: Listing | null,
  user: User | null,
): boolean {
  if (!user) return false;
  if (id === "account") {
    return Boolean(user.firstName && user.lastName && user.email && user.phone);
  }
  if (!listing) return false;
  switch (id) {
    case "owners":
      return listing.owners.some(
        (o) => o.firstName && o.lastName && o.email,
      );
    case "property":
      return Boolean(listing.propertyType);
    case "address":
      return Boolean(
        listing.street && listing.zip && listing.city && listing.county,
      );
    case "facts":
      if (listing.propertyType === "land") {
        return Boolean(listing.lotSqft || listing.legalDescription);
      }
      return Boolean(listing.beds && listing.baths && listing.sqft);
    case "situation":
      return (
        listing.hoa !== null &&
        listing.homestead !== null &&
        listing.occupancy !== ""
      );
    case "photos":
      return listing.photos.length > 0;
    case "disclosures": {
      const workingDone = WORKING_ITEMS.every(
        (item) => listing.disclosureWorking[item.id]?.status,
      );
      const answersDone = DISCLOSURE_QUESTIONS.every(
        (q) => listing.disclosureAnswers[q.id]?.answer,
      );
      return (
        listing.disclosureOccupied !== null &&
        Boolean(listing.disclosureZoning) &&
        workingDone &&
        answersDone &&
        listing.disclosureCertified
      );
    }
    case "repairs":
      return Boolean(
        listing.inclusions.trim() &&
          listing.utilityElectric.trim() &&
          listing.utilityGas.trim() &&
          listing.utilityWater.trim() &&
          listing.utilitySewer.trim(),
      );
    case "pricing":
      return Boolean(listing.listPrice);
    case "showings":
      return true;
    case "review":
      return listing.status === "live";
    default:
      return false;
  }
}

export function requiredComplete(listing: Listing | null, user: User | null) {
  return SELLER_MODULES.filter((m) => m.id !== "review").every((m) =>
    moduleComplete(m.id, listing, user),
  );
}

export function progress(listing: Listing | null, user: User | null) {
  const n = SELLER_MODULES.filter((m) => m.id !== "review").length;
  const done = SELLER_MODULES.filter(
    (m) => m.id !== "review" && moduleComplete(m.id, listing, user),
  ).length;
  return { done, n, pct: Math.round((done / n) * 100) };
}

export const PROPERTY_TYPES: { id: PropertyTypeLike; label: string }[] = [
  { id: "single_family", label: "Single-family home" },
  { id: "condo", label: "Condo" },
  { id: "townhouse", label: "Townhouse" },
  { id: "land", label: "Land" },
  { id: "multifamily", label: "2–4 unit / multifamily" },
];

type PropertyTypeLike =
  | "single_family"
  | "condo"
  | "townhouse"
  | "land"
  | "multifamily";
