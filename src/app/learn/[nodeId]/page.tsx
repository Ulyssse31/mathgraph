"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import LessonViewer from "@/components/content/LessonViewer";
import ExerciseList from "@/components/content/ExerciseList";
import MarkdownRenderer from "@/components/content/MarkdownRenderer";
import type { LessonSection, ExerciseData } from "@/types/content";

interface NodeContent {
  node: {
    id: string;
    title: string;
    description: string;
    status: string;
    xp: number;
    module: { id: string; title: string; color: string };
  };
  lesson: { sections: LessonSection[] } | null;
  exercises: ExerciseData[];
  crossEdges: {
    id: string;
    depth: number;
    label: string;
    description: string;
    direction: "outgoing" | "incoming";
    foreignNode: {
      id: string;
      title: string;
      module: { id: string; title: string; color: string };
    };
  }[];
}

interface AttemptState {
  completed: boolean;
  hintsUsed: number;
}

export default function LearnPage({
  params,
}: {
  params: Promise<{ nodeId: string }>;
}) {
  const { nodeId } = use(params);
  const [data, setData] = useState<NodeContent | null>(null);
  const [totalXp, setTotalXp] = useState(0);
  const [attempts, setAttempts] = useState<Record<string, AttemptState>>({});

  useEffect(() => {
    fetch(`/api/nodes/${nodeId}/content`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setTotalXp(d.node.xp);
      });

    // Fetch user's existing attempts for exercises in this node
    fetch("/api/user/exercises")
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((d) => {
        if (!d?.attempts) return;
        const map: Record<string, AttemptState> = {};
        for (const a of d.attempts) {
          if (a.exercise?.nodeId === nodeId) {
            map[a.exerciseId] = {
              completed: a.completed,
              hintsUsed: a.hintsUsed,
            };
          }
        }
        setAttempts(map);
      })
      .catch(() => {
        // Not logged in — no attempts to restore
      });
  }, [nodeId]);

  const handleXpGain = (xp: number) => {
    setTotalXp((prev) => prev + xp);
    fetch(`/api/nodes/${nodeId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: data?.node.status, xp: totalXp + xp }),
    }).catch(console.error);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        Loading...
      </div>
    );
  }

  const depthLabel = (d: number) =>
    d === 1 ? "Surface" : d === 2 ? "Structural" : "Deep";

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
          <span className="text-zinc-400 text-sm">
            {data.node.module.title}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-200 text-sm font-medium">
            {data.node.title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            My Progress
          </Link>
          <div className="text-sm text-zinc-400">
            <span className="font-mono text-indigo-400">{totalXp}</span> XP
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.node.module.color }}
            />
            <span className="text-xs text-zinc-500 uppercase tracking-wider">
              {data.node.module.title}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-100">
            {data.node.title}
          </h1>
          {data.node.description && (
            <p className="text-zinc-400 mt-2">{data.node.description}</p>
          )}
        </div>

        {/* Table of contents */}
        {data.lesson && data.lesson.sections.length > 0 && (
          <nav className="mb-8 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Sommaire
            </h3>
            <ol className="space-y-1">
              {data.lesson.sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    {i + 1}. {s.title || s.type}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Lesson content */}
        {data.lesson && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-zinc-100 mb-4">Cours</h2>
            <LessonViewer sections={data.lesson.sections} />
          </section>
        )}

        {/* Cross-module connections */}
        {data.crossEdges.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-zinc-100 mb-4">
              Connexions
            </h2>
            <div className="grid gap-3">
              {data.crossEdges.map((edge) => (
                <div
                  key={edge.id}
                  className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-8 rounded-full"
                      style={{
                        backgroundColor: edge.foreignNode.module.color,
                        opacity: 0.3 + edge.depth * 0.23,
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium text-zinc-200">
                        {edge.label || edge.foreignNode.title}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {edge.foreignNode.module.title} &middot;{" "}
                        {edge.foreignNode.title}
                      </div>
                      {edge.description && (
                        <div className="text-xs text-zinc-500 mt-1">
                          <MarkdownRenderer content={edge.description} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 uppercase">
                      {depthLabel(edge.depth)}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              i < edge.depth
                                ? edge.foreignNode.module.color
                                : "#3f3f46",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exercises */}
        {data.exercises.length > 0 && (
          <section id="exercises" className="mb-12">
            <h2 className="text-xl font-bold text-zinc-100 mb-4">
              Exercices ({data.exercises.length})
            </h2>
            <ExerciseList
              exercises={data.exercises}
              onXpGain={handleXpGain}
              attempts={attempts}
            />
          </section>
        )}
      </div>
    </div>
  );
}
