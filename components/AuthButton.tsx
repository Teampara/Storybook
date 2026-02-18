"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="text-xs text-paraspect-ink/60">Loading...</span>;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="rounded-full border border-paraspect-ink px-3 py-2 text-xs font-semibold"
      >
        Sign In
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut()}
      className="rounded-full border border-paraspect-coral px-3 py-2 text-xs font-semibold text-paraspect-coral"
    >
      Sign Out
    </button>
  );
}
