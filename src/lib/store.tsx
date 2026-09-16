"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BuyerProfile, Listing, Role, User } from "./types";
import { emptyListing } from "./types";
import { requiredComplete } from "./modules";

const KEY = "dealifi-mvp-v2";

interface Persisted {
  user: User | null;
  listing: Listing | null;
  buyer: BuyerProfile | null;
}

interface Store {
  hydrated: boolean;
  user: User | null;
  listing: Listing | null;
  buyer: BuyerProfile | null;
  signIn: (input: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: Role;
  }) => void;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
  ensureListing: () => Listing;
  updateListing: (patch: Partial<Listing>) => void;
  publishListing: () => { ok: boolean; error?: string };
  updateBuyer: (patch: Partial<BuyerProfile>) => void;
}

const Ctx = createContext<Store | null>(null);

function load(): Persisted {
  if (typeof window === "undefined") {
    return { user: null, listing: null, buyer: null };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { user: null, listing: null, buyer: null };
    return JSON.parse(raw) as Persisted;
  } catch {
    return { user: null, listing: null, buyer: null };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [buyer, setBuyer] = useState<BuyerProfile | null>(null);

  useEffect(() => {
    const d = load();
    setUser(d.user);
    setListing(d.listing);
    setBuyer(d.buyer);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ user, listing, buyer }));
  }, [hydrated, user, listing, buyer]);

  const signIn = useCallback(
    (input: {
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      role: Role;
    }) => {
      const next: User = {
        id: user?.id ?? `usr-${Date.now()}`,
        email: input.email.trim().toLowerCase(),
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        phone: input.phone.trim(),
        role: input.role,
        createdAt: user?.createdAt ?? new Date().toISOString(),
      };
      setUser(next);
    },
    [user],
  );

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((u) => (u ? { ...u, ...patch } : u));
  }, []);

  const ensureListing = useCallback(() => {
    if (listing) return listing;
    if (!user) throw new Error("Sign in first");
    const created = emptyListing(user.id);
    setListing(created);
    return created;
  }, [listing, user]);

  const updateListing = useCallback((patch: Partial<Listing>) => {
    setListing((cur) => {
      const base = cur ?? (user ? emptyListing(user.id) : null);
      if (!base) return cur;
      return { ...base, ...patch, updatedAt: new Date().toISOString() };
    });
  }, [user]);

  const publishListing = useCallback(() => {
    if (!user || !listing) {
      return { ok: false, error: "Create your account and listing first." };
    }
    if (!requiredComplete(listing, user)) {
      return {
        ok: false,
        error: "Finish every module before the listing can go live.",
      };
    }
    setListing({
      ...listing,
      status: "live",
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { ok: true };
  }, [listing, user]);

  const updateBuyer = useCallback(
    (patch: Partial<BuyerProfile>) => {
      if (!user) return;
      setBuyer((cur) => ({
        budgetMin: "",
        budgetMax: "",
        preapproved: null,
        timeline: "",
        beds: "",
        mustHaves: "",
        commute: "",
        readyToBuy: null,
        updatedAt: new Date().toISOString(),
        ...cur,
        ...patch,
        userId: user.id,
      }));
    },
    [user],
  );

  const value = useMemo(
    () => ({
      hydrated,
      user,
      listing,
      buyer,
      signIn,
      signOut,
      updateUser,
      ensureListing,
      updateListing,
      publishListing,
      updateBuyer,
    }),
    [
      hydrated,
      user,
      listing,
      buyer,
      signIn,
      signOut,
      updateUser,
      ensureListing,
      updateListing,
      publishListing,
      updateBuyer,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}
