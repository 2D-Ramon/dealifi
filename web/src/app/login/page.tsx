"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useStore } from "@/lib/store";
import type { Role } from "@/lib/types";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { signIn } = useStore();
  const [role, setRole] = useState<Role>("seller");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-semibold text-navy">Create account / Sign in</h1>
      <p className="mt-2 text-sm text-muted">
        Sellers and buyers both need an account before listing, searching,
        messaging, or making an offer. Use your legal name as it appears on a
        state-issued ID.
      </p>
      <form
        className="mt-8 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          signIn({ email, firstName, lastName, phone, role });
          const next = search.get("next");
          router.push(
            next || (role === "buyer" ? "/buy" : "/sell"),
          );
        }}
      >
        <div className="flex gap-2">
          {(["seller", "buyer"] as const).map((r) => (
            <button
              key={r}
              type="button"
              className={`df-btn flex-1 text-sm ${
                role === r ? "df-btn-primary" : "df-btn-secondary"
              }`}
              onClick={() => setRole(r)}
            >
              I want to {r === "seller" ? "sell" : "buy"}
            </button>
          ))}
        </div>
        <input
          required
          className="df-input"
          placeholder="Legal first name (as on ID)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          required
          className="df-input"
          placeholder="Legal last name (as on ID)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          required
          type="email"
          className="df-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="df-input"
          placeholder="Mobile"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" className="df-btn df-btn-primary w-full">
          Create account / Sign in
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
