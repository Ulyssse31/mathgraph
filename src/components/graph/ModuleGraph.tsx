"use client";

import { useState, useMemo } from "react";
import type { MathModule, ModuleEdge } from "@/types/graph";

interface ModuleGraphProps {
  modules: (MathModule & { _count?: { nodes: number } })[];
  moduleEdges: ModuleEdge[];
  onModuleClick: (moduleId: string) => void;
}

// MSC 2020 section order and styling
const SECTIONS: {
  category: string;
  label: string;
  color: string;
  colorBg: string;
}[] = [
  { category: "Foundations & Logic", label: "Foundations & Logic", color: "text-purple-400/70", colorBg: "bg-purple-400/10" },
  { category: "Algebra", label: "Algebra", color: "text-indigo-400/70", colorBg: "bg-indigo-400/10" },
  { category: "Analysis", label: "Analysis", color: "text-blue-400/70", colorBg: "bg-blue-400/10" },
  { category: "Geometry & Topology", label: "Geometry & Topology", color: "text-emerald-400/70", colorBg: "bg-emerald-400/10" },
  { category: "Applied Math & Computation", label: "Applied Math & Computation", color: "text-cyan-400/70", colorBg: "bg-cyan-400/10" },
  { category: "Probability, Statistics & Decision Sciences", label: "Probability, Statistics & Decision Sciences", color: "text-green-400/70", colorBg: "bg-green-400/10" },
  { category: "Mathematical Physics", label: "Mathematical Physics", color: "text-rose-400/70", colorBg: "bg-rose-400/10" },
  { category: "History & Culture", label: "History & Culture", color: "text-amber-400/70", colorBg: "bg-amber-400/10" },
];

const ICON_SYMBOLS: Record<string, string> = {
  function:  "∫",
  grid:      "⊕",
  infinity:  "∞",
  circle:    "∮",
  star:      "★",
  layers:    "⊗",
  compass:   "△",
  cpu:       "⊢",
  chart:     "∑",
  network:   "⟳",
  book:      "α",
  lightbulb: "λ",
};

function ModuleCard({
  module,
  onClick,
}: {
  module: MathModule & { _count?: { nodes: number } };
  onClick: () => void;
}) {
  const count = module._count?.nodes ?? 0;
  const symbol = ICON_SYMBOLS[module.icon] ?? "∂";

  return (
    <button
      onClick={onClick}
      className="group text-left w-full rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden transition-all duration-200 hover:border-zinc-600 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
    >
      {/* Cover area */}
      <div
        className="relative h-28 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${module.color}35 0%, ${module.color}10 100%)`,
        }}
      >
        {/* Dot-grid texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`dots-${module.id}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={module.color} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${module.id})`} />
        </svg>

        {/* Large math symbol */}
        <span
          className="text-5xl font-light select-none opacity-60 group-hover:opacity-80 transition-opacity"
          style={{ color: module.color }}
        >
          {symbol}
        </span>

        {/* Chapter count badge — top right */}
        <span className="absolute top-3 right-3 text-[10px] font-mono text-zinc-400 bg-black/30 px-1.5 py-0.5 rounded">
          {count} chapters
        </span>

        {/* Code badge — top left */}
        {module.code && (
          <span
            className="absolute top-3 left-3 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${module.color}20`,
              color: module.color,
              border: `1px solid ${module.color}30`,
            }}
          >
            {module.code}
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="p-4">
        <h3 className="text-base font-bold text-zinc-100 leading-tight mb-1">
          {module.title}
        </h3>
        <p className="text-xs text-zinc-500 mb-2">par {module.author}</p>
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-3">
          {module.description}
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: "0%", backgroundColor: module.color }}
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

  // Group modules by MSC section
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

    return SECTIONS.filter((s) => map.has(s.category) && map.get(s.category)!.length > 0).map(
      (s) => ({
        ...s,
        modules: map.get(s.category)!,
      })
    );
  }, [modules, search]);

  const totalFiltered = grouped.reduce((s, g) => s + g.modules.length, 0);

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

        {/* MSC Sections */}
        {grouped.map((section) => (
          <div key={section.category} className="mb-12">
            <h2 className={`text-sm font-bold uppercase tracking-wider ${section.color} mb-6 flex items-center gap-2`}>
              <span className={`h-px flex-1 ${section.colorBg}`} />
              {section.label}
              <span className={`h-px flex-1 ${section.colorBg}`} />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.modules.map((m) => (
                <ModuleCard
                  key={m.id}
                  module={m}
                  onClick={() => onModuleClick(m.id)}
                />
              ))}
            </div>
          </div>
        ))}

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
