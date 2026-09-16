export type Role = "seller" | "buyer" | "admin";

export type PropertyType =
  | "single_family"
  | "condo"
  | "townhouse"
  | "land"
  | "multifamily";

export type ListingStatus =
  | "draft"
  | "live"
  | "pending"
  | "sold"
  | "withdrawn";

export type Occupancy = "owner" | "tenant" | "vacant";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  createdAt: string;
}

export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface Listing {
  id: string;
  sellerId: string;
  status: ListingStatus;
  owners: Owner[];
  propertyType: PropertyType | "";
  street: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  beds: string;
  baths: string;
  sqft: string;
  lotSqft: string;
  yearBuilt: string;
  stories: string;
  legalDescription: string;
  taxParcel: string;
  annualTaxes: string;
  hoa: boolean | null;
  hoaName: string;
  hoaFee: string;
  homestead: boolean | null;
  wellSeptic: boolean | null;
  unpermittedWork: boolean | null;
  occupancy: Occupancy | "";
  saleContext: string;
  photos: { name: string; dataUrl: string }[];
  floorPlan?: { name: string; dataUrl: string };
  disclosureOccupied: boolean | null;
  disclosureWorking: Record<string, { status: string; extras: string[] }>;
  disclosureAnswers: Record<string, { answer: string; note: string }>;
  disclosureZoning: string;
  disclosureRoofAge: string;
  disclosureRoofLayers: string;
  disclosureNotWorkingExplain: string;
  disclosureYesExplain: string;
  disclosureCertified: boolean;
  knownDefects: string;
  leadPaint: boolean | null;
  utilityElectric: string;
  utilityGas: string;
  utilityWater: string;
  utilitySewer: string;
  utilityTrash: string;
  utilityInternet: string;
  inclusions: string;
  exclusions: string;
  listPrice: string;
  showingRequireId: boolean;
  showingRequireFunds: boolean;
  showingNotes: string;
  publishedAt?: string;
  updatedAt: string;
}

export interface BuyerProfile {
  userId: string;
  budgetMin: string;
  budgetMax: string;
  preapproved: boolean | null;
  timeline: string;
  beds: string;
  mustHaves: string;
  commute: string;
  readyToBuy: boolean | null;
  updatedAt: string;
}

export function emptyListing(sellerId: string): Listing {
  return {
    id: `lst-${Date.now()}`,
    sellerId,
    status: "draft",
    owners: [],
    propertyType: "",
    street: "",
    city: "",
    state: "OK",
    zip: "",
    county: "Tulsa County",
    beds: "",
    baths: "",
    sqft: "",
    lotSqft: "",
    yearBuilt: "",
    stories: "",
    legalDescription: "",
    taxParcel: "",
    annualTaxes: "",
    hoa: null,
    hoaName: "",
    hoaFee: "",
    homestead: null,
    wellSeptic: null,
    unpermittedWork: null,
    occupancy: "",
    saleContext: "typical",
    photos: [],
    disclosureOccupied: null,
    disclosureWorking: {},
    disclosureAnswers: {},
    disclosureZoning: "",
    disclosureRoofAge: "",
    disclosureRoofLayers: "",
    disclosureNotWorkingExplain: "",
    disclosureYesExplain: "",
    disclosureCertified: false,
    knownDefects: "",
    leadPaint: null,
    utilityElectric: "",
    utilityGas: "",
    utilityWater: "",
    utilitySewer: "",
    utilityTrash: "",
    utilityInternet: "",
    inclusions: "",
    exclusions: "",
    listPrice: "",
    showingRequireId: true,
    showingRequireFunds: true,
    showingNotes: "",
    updatedAt: new Date().toISOString(),
  };
}
