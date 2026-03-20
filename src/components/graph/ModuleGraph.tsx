"use client";

import { useState, useMemo } from "react";
import type { MathModule, ModuleEdge } from "@/types/graph";

interface ModuleGraphProps {
  modules: (MathModule & { _count?: { nodes: number } })[];
  moduleEdges: ModuleEdge[];
  onModuleClick: (moduleId: string) => void;
}

// Defines the display order of categories
const CATEGORY_ORDER = [
  "Pure Mathematics — Algebra",
  "Pure Mathematics — Calculus and Analysis",
  "Pure Mathematics — Geometry and Topology",
  "Pure Mathematics — Combinatorics",
  "Pure Mathematics — Logic",
  "Pure Mathematics — Number Theory",
  "Applied Mathematics — Dynamical Systems and Differential Equations",
  "Applied Mathematics — Mathematical Physics",
  "Applied Mathematics — Theory of Computation",
  "Applied Mathematics — Information Theory and Signal Processing",
  "Applied Mathematics — Probability and Statistics",
  "Applied Mathematics — Game Theory",
  "Applied Mathematics — Operations Research",
  "Meta-Skills",
];

function ModuleCard({
  module,
  onClick,
}: {
  module: MathModule & { _count?: { nodes: number } };
  onClick: () => void;
}) {
  const count = module._count?.nodes ?? 0;

  return (
    <button
      onClick={onClick}
      className="group relative text-left w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-200 hover:bg-zinc-900 hover:border-zinc-700 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: module.color,
      }}
    >
      {/* Color glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at left, ${module.color}08, transparent 70%)`,
        }}
      />

      <div className="relative">
        {/* Header: code badge + title */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {module.code && (
              <span
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${module.color}20`,
                  color: module.color,
                }}
              >
                {module.code}
              </span>
            )}
            <h3
              className="text-base font-bold leading-tight"
              style={{ color: module.color }}
            >
              {module.title}
            </h3>
          </div>
          <span
            className="text-xs font-mono px-2 py-1 rounded-md shrink-0 ml-2"
            style={{
              backgroundColor: `${module.color}15`,
              color: module.color,
            }}
          >
            {count}
          </span>
        </div>

        {/* Author */}
        <p className="text-xs text-zinc-500 mb-2">
          par {module.author}
        </p>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-3">
          {module.description}
        </p>

        {/* Progress bar (placeholder — 0% for now) */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: "0%",
                backgroundColor: module.color,
              }}
            />
          </div>
          <span className="text-[10px] text-zinc-600">0%</span>
        </div>
      </div>
    </button>
  );
}

export default function ModuleGraph({
  modules,
  moduleEdges,
  onModuleClick,
}: ModuleGraphProps) {
  const [search, setSearch] = useState("");

  // Group modules by category, preserving defined order
  const grouped = useMemo(() => {
    const filtered = search.trim()
      ? modules.filter((m) => {
          const q = search.toLowerCase();
          return (
            m.title.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.code.toLowerCase().includes(q) ||
            m.category.toLowerCase().includes(q)
          );
        })
      : modules;

    const map = new Map<string, typeof modules>();
    for (const m of filtered) {
      const cat = m.category || "Other";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(m);
    }

    // Sort by defined order
    const ordered: { category: string; modules: typeof modules }[] = [];
    for (const cat of CATEGORY_ORDER) {
      const mods = map.get(cat);
      if (mods && mods.length > 0) {
        ordered.push({ category: cat, modules: mods });
        map.delete(cat);
      }
    }
    // Any remaining categories not in CATEGORY_ORDER
    for (const [cat, mods] of map) {
      if (mods.length > 0) {
        ordered.push({ category: cat, modules: mods });
      }
    }

    return ordered;
  }, [modules, search]);

  const totalFiltered = grouped.reduce((s, g) => s + g.modules.length, 0);

  // Extract top-level grouping (Pure / Applied / Meta)
  const pureGroups = grouped.filter((g) => g.category.startsWith("Pure Mathematics"));
  const appliedGroups = grouped.filter((g) => g.category.startsWith("Applied Mathematics"));
  const metaGroups = grouped.filter((g) => !g.category.startsWith("Pure") && !g.category.startsWith("Applied"));

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            MathGraph
          </h1>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto">
            Explore the interconnected world of mathematics. Each module is a
            graph of concepts — choose where to begin your journey.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Pure Mathematics */}
        {pureGroups.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400/70 mb-6 flex items-center gap-2">
              <span className="h-px flex-1 bg-indigo-400/10" />
              Pure Mathematics
              <span className="h-px flex-1 bg-indigo-400/10" />
            </h2>
            {pureGroups.map((group) => {
              // Extract subcategory name (after " — ")
              const subcat = group.category.replace("Pure Mathematics — ", "");
              return (
                <section key={group.category} className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 ml-1">
                    {subcat}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.modules.map((m) => (
                      <ModuleCard
                        key={m.id}
                        module={m}
                        onClick={() => onModuleClick(m.id)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Applied Mathematics */}
        {appliedGroups.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400/70 mb-6 flex items-center gap-2">
              <span className="h-px flex-1 bg-amber-400/10" />
              Applied Mathematics
              <span className="h-px flex-1 bg-amber-400/10" />
            </h2>
            {appliedGroups.map((group) => {
              const subcat = group.category.replace("Applied Mathematics — ", "");
              return (
                <section key={group.category} className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 ml-1">
                    {subcat}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.modules.map((m) => (
                      <ModuleCard
                        key={m.id}
                        module={m}
                        onClick={() => onModuleClick(m.id)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Meta-Skills */}
        {metaGroups.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wider text-teal-400/70 mb-6 flex items-center gap-2">
              <span className="h-px flex-1 bg-teal-400/10" />
              Meta-Skills
              <span className="h-px flex-1 bg-teal-400/10" />
            </h2>
            {metaGroups.map((group) => (
              <section key={group.category} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.modules.map((m) => (
                    <ModuleCard
                      key={m.id}
                      module={m}
                      onClick={() => onModuleClick(m.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Empty state */}
        {totalFiltered === 0 && (
          <div className="text-center py-16 text-zinc-600">
            No modules match &ldquo;{search}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
