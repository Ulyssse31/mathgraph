"use client";

import Link from "next/link";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="text-center max-w-md space-y-4">
        <div className="text-4xl">:(</div>
        <h1 className="text-xl font-bold text-zinc-100">
          Failed to load project
        </h1>
        <p className="text-sm text-zinc-400">
          This project may not exist or there was a connection issue.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/projects"
            className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
