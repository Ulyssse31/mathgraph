"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LessonViewer from "@/components/content/LessonViewer";
import ExerciseList from "@/components/content/ExerciseList";
import MarkdownRenderer from "@/components/content/MarkdownRenderer";
import ThemeToggle from "@/components/ThemeToggle";
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
  const router = useRouter();
  const [data, setData] = useState<NodeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalXp, setTotalXp] = useState(0);
  const [attempts, setAttempts] = useState<Record<string, AttemptState>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/nodes/${nodeId}/content`)
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((d) => {
        setData(d);
        setTotalXp(0);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));

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
      .catch(() => {});
  }, [nodeId]);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min(100, (scrollTop / docHeight) * 100));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: observe each section
  useEffect(() => {
    if (!data?.lesson?.sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-section-index"));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("[data-section-index]");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [data]);

  const handleXpGain = (xp: number) => {
    setTotalXp((prev) => prev + xp);
  };

  const scrollToSection = (i: number) => {
    const el = document.getElementById(`section-${i}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-zinc-500 dark:text-zinc-500">
        <div className="space-y-3 text-center">
          <div className="h-6 w-48 bg-zinc-800 rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-32 bg-zinc-800/60 rounded animate-pulse mx-auto" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl">:(</div>
          <h1 className="text-xl font-bold text-zinc-100">Concept not found</h1>
          <p className="text-sm text-zinc-400">
            This concept doesn&apos;t exist or has been removed.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Go back
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const depthLabel = (d: number) =>
    d === 1 ? "Surface" : d === 2 ? "Structural" : "Deep";

  const sections = data.lesson?.sections ?? [];

  const tocContent = (
    <nav>
      <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
        Table of Contents
      </h3>
      <ol className="space-y-0.5">
        {sections.map((s, i) => (
          <li key={i}>
            <button
              onClick={() => scrollToSection(i)}
              className={`group w-full text-left text-[13px] py-1.5 px-3 rounded transition-all flex items-center gap-2 ${
                activeSection === i
                  ? "text-accent font-medium"
                  : "text-zinc-500 dark:text-zinc-500 hover:text-foreground"
              }`}
            >
              {/* Dot indicator */}
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                  activeSection === i
                    ? "bg-accent scale-125"
                    : "bg-zinc-300 dark:bg-zinc-600 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-500"
                }`}
              />
              {s.title || s.type}
            </button>
          </li>
        ))}
        {data.exercises.length > 0 && (
          <li>
            <button
              onClick={() => {
                document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
                setTocOpen(false);
              }}
              className="group w-full text-left text-[13px] py-1.5 px-3 rounded transition-all flex items-center gap-2 text-zinc-500 dark:text-zinc-500 hover:text-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-zinc-300 dark:bg-zinc-600 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-500" />
              Exercices
            </button>
          </li>
        )}
      </ol>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <div
        className="reading-progress"
        style={{ width: `${readProgress}%` }}
      />

      {/* Header */}
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer p-1"
            aria-label="Go back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <Link
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            MathGraph
          </Link>
          <span className="text-zinc-300 dark:text-zinc-600 hidden sm:inline">/</span>
          <span className="text-zinc-500 dark:text-zinc-400 text-sm hidden sm:inline">
            {data.node.module.title}
          </span>
          <span className="text-zinc-300 dark:text-zinc-600 hidden sm:inline">/</span>
          <span className="text-foreground text-sm font-medium hidden sm:inline truncate max-w-[200px]">
            {data.node.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            My Progress
          </Link>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-mono text-indigo-500 dark:text-indigo-400">{totalXp}</span> XP
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-10">
        {/* Sidebar TOC — desktop only */}
        {sections.length > 0 && (
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-20">{tocContent}</div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-2xl">
          {/* Title */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: data.node.module.color }}
              />
              <span className="text-xs text-zinc-500 uppercase tracking-wider">
                {data.node.module.title}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              {data.node.title}
            </h1>
            {data.node.description && (
              <p className="text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
                {data.node.description}
              </p>
            )}
          </div>

          {/* Lesson content */}
          {data.lesson && (
            <section className="mb-14">
              <LessonViewer sections={data.lesson.sections} />
            </section>
          )}

          {/* Cross-module connections */}
          {data.crossEdges.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Connexions
              </h2>
              <div className="grid gap-3">
                {data.crossEdges.map((edge) => (
                  <div
                    key={edge.id}
                    className="p-4 rounded-xl bg-card border border-card-border flex items-center justify-between"
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
                        <div className="text-sm font-medium text-foreground">
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
                      <span className="text-[10px] text-zinc-500 uppercase">
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
                                  : "var(--card-border)",
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
            <section id="exercises" className="mb-14">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Exercices ({data.exercises.length})
              </h2>
              <ExerciseList
                exercises={data.exercises}
                onXpGain={handleXpGain}
                attempts={attempts}
              />
            </section>
          )}
        </main>
      </div>

      {/* Mobile TOC floating button */}
      {sections.length > 0 && (
        <>
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
            aria-label="Table of contents"
          >
            {tocOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            )}
          </button>

          {/* Mobile TOC overlay */}
          {tocOpen && (
            <div className="lg:hidden fixed inset-0 z-40">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setTocOpen(false)}
              />
              <div className="absolute bottom-20 right-6 w-64 bg-background border border-card-border rounded-xl p-4 shadow-xl">
                {tocContent}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
