"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ExerciseAttempt {
  id: string;
  completed: boolean;
  hintsUsed: number;
  score: number;
  createdAt: string;
  exerciseId: string;
  exercise: {
    id: string;
    title: string;
    type: string;
    difficulty: number;
    nodeId: string;
    node: {
      id: string;
      title: string;
      code: string;
      module: { id: string; title: string; color: string };
    };
  };
}

interface DashboardData {
  attempts: ExerciseAttempt[];
  stats: {
    totalCompleted: number;
    totalXp: number;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [tab, setTab] = useState<"solving" | "completed">("solving");
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    fetch("/api/user/exercises")
      .then((r) => {
        if (r.status === 401) {
          setUnauthorized(true);
          setLoading(false);
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) {
          setData(d);
          setLoading(false);
        }
      })
      .catch(() => {
        setUnauthorized(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        Loading...
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-zinc-200 mb-2">Sign in required</h1>
          <p className="text-zinc-500 mb-4">You need to be signed in to view your progress.</p>
          <Link
            href="/auth/signin"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const solving = data.attempts.filter((a) => !a.completed);
  const completed = data.attempts.filter((a) => a.completed);
  const current = tab === "solving" ? solving : completed;

  const difficultyStars = (d: number) =>
    Array.from({ length: 5 }, (_, i) => (i < d ? "\u2605" : "\u2606")).join("");

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            MathGraph
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-200 text-sm font-medium">My Progress</span>
        </div>
        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-zinc-300"
        >
          &larr; Back to Graph
        </Link>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-2xl font-bold text-indigo-400">
              {data.stats.totalCompleted}
            </div>
            <div className="text-xs text-zinc-500 mt-1">Exercises Completed</div>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-2xl font-bold text-emerald-400">
              {data.stats.totalXp}
            </div>
            <div className="text-xs text-zinc-500 mt-1">Total XP</div>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-2xl font-bold text-amber-400">
              {solving.length}
            </div>
            <div className="text-xs text-zinc-500 mt-1">In Progress</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-lg bg-zinc-900 border border-zinc-800 w-fit">
          <button
            onClick={() => setTab("solving")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "solving"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Solving ({solving.length})
          </button>
          <button
            onClick={() => setTab("completed")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "completed"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Completed ({completed.length})
          </button>
        </div>

        {/* Exercise list */}
        {current.length === 0 ? (
          <div className="text-center py-16 text-zinc-600">
            {tab === "solving"
              ? "No exercises in progress. Start learning!"
              : "No completed exercises yet."}
          </div>
        ) : (
          <div className="space-y-3">
            {current.map((attempt) => (
              <Link
                key={attempt.id}
                href={`/learn/${attempt.exercise.nodeId}#exercises`}
                className="block p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: attempt.exercise.node.module.color }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-zinc-200">
                          {attempt.exercise.title}
                        </h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">
                          {attempt.exercise.type}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {attempt.exercise.node.module.title} &middot;{" "}
                        {attempt.exercise.node.title}
                        {attempt.exercise.node.code && (
                          <span className="ml-1 font-mono text-zinc-600">
                            ({attempt.exercise.node.code})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-amber-400 font-mono">
                      {difficultyStars(attempt.exercise.difficulty)}
                    </span>
                    {attempt.completed && (
                      <span className="text-emerald-400 font-medium">
                        +{attempt.score} XP
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
