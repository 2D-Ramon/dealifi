export const PLATFORM = {
  name: "DealiFi",
  tagline: "Sell or buy a home without a required agent.",
  mission:
    "Answer a few questions. List your home. Take offers. Get to the closing table — with Oklahoma forms, e-sign, and a deal dashboard.",
  supportEmail: "hello@dealifi.com",
  geography: "Tulsa, Oklahoma",
  esign: "DocuSign",
} as const;

export type SellerPlanId = "flat_basic" | "flat_plus" | "flat_full" | "success";
export type BuyerPlanId = "subscription" | "flat_offer" | "success";

export interface Plan {
  id: string;
  side: "seller" | "buyer";
  name: string;
  priceLabel: string;
  blurb: string;
}

/** Beta: every plan is $0. Pickers stay so we can turn prices on later. */
export const BETA_FREE = true;

export const SELLER_PLANS: Plan[] = [
  {
    id: "flat_basic",
    side: "seller",
    name: "List",
    priceLabel: BETA_FREE ? "$0 during beta" : "$199",
    blurb: "Live listing, flyer, and share link.",
  },
  {
    id: "flat_plus",
    side: "seller",
    name: "List + docs",
    priceLabel: BETA_FREE ? "$0 during beta" : "$499",
    blurb: "Oklahoma disclosures, e-sign, and document vault.",
  },
  {
    id: "flat_full",
    side: "seller",
    name: "Full deal room",
    priceLabel: BETA_FREE ? "$0 during beta" : "$799",
    blurb: "Offers, showings, timeline, and invited parties.",
  },
  {
    id: "success",
    side: "seller",
    name: "Pay at closing",
    priceLabel: BETA_FREE ? "$0 during beta" : "1% at close",
    blurb: "No listing fee. Invoice when you close.",
  },
];

export const BUYER_PLANS: Plan[] = [
  {
    id: "subscription",
    side: "buyer",
    name: "Search",
    priceLabel: BETA_FREE ? "$0 during beta" : "$19/mo",
    blurb: "Alerts, saved search, and messaging.",
  },
  {
    id: "flat_offer",
    side: "buyer",
    name: "Make an offer",
    priceLabel: BETA_FREE ? "$0 during beta" : "$99",
    blurb: "Unlock the offer packet and e-sign.",
  },
  {
    id: "success",
    side: "buyer",
    name: "Pay at closing",
    priceLabel: BETA_FREE ? "$0 during beta" : "0.5% at close",
    blurb: "Use the full buyer deal room; pay when you close.",
  },
];
