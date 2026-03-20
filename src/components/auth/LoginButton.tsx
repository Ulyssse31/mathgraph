"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-20 h-8 rounded-lg bg-zinc-800 animate-pulse" />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        {session.user.image && (
          <img
            src={session.user.image}
            alt=""
            className="w-7 h-7 rounded-full border border-zinc-700"
          />
        )}
        <span className="text-xs text-zinc-400 hidden sm:inline">
          {session.user.name || session.user.email}
        </span>
        <button
          onClick={() => signOut()}
          className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/auth/signin"
      className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
    >
      Sign In
    </Link>
  );
}
