"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { MathModule, ConceptNode } from "@/types/graph";

interface ModuleWithNodes extends MathModule {
  _count?: { nodes: number };
  nodes?: Pick<ConceptNode, "id" | "title" | "code">[];
}

const CATEGORY_ORDER = [
  "Pure Mathematics — Algebra",
  "Pure Mathematics — Calculus and Analysis",
  "Pure Mathematics — Geometry and Topology",
  "Pure Mathematics — Combinatorics",
  "Pure Mathematics — Logic",
  "Pure Mathematics — Number Theory",
  "Applied Mathematics — Dynamical Systems",
  "Applied Mathematics — Physics",
  "Applied Mathematics — Computation",
  "Applied Mathematics — Information Theory",
  "Applied Mathematics — Probability and Statistics",
  "Applied Mathematics — Game Theory",
  "Applied Mathematics — Operations Research",
  "Meta-Skills",
];

const SECTION_COLORS: Record<string, string> = {
  "Pure Mathematics": "border-indigo-500/30 bg-indigo-500/5",
  "Applied Mathematics": "border-amber-500/30 bg-amber-500/5",
  "Meta-Skills": "border-teal-500/30 bg-teal-500/5",
};

function getSection(category: string): string {
  if (category.startsWith("Pure")) return "Pure Mathematics";
  if (category.startsWith("Applied")) return "Applied Mathematics";
  return "Meta-Skills";
}

function getSubcategory(category: string): string {
  const parts = category.split(" — ");
  return parts[1] || category;
}

export default function AdminPage() {
  const [modules, setModules] = useState<ModuleWithNodes[]>([]);
  const [search, setSearch] = useState("");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    color: "#6366f1",
  });

  useEffect(() => {
    fetch("/api/modules")
      .then((r) => r.json())
      .then((data) => setModules(data.modules));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const module = await res.json();
      setModules((prev) => [...prev, { ...module, _count: { nodes: 0 }, nodes: [] }]);
      setShowCreate(false);
      setForm({ title: "", description: "", author: "", color: "#6366f1" });
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter modules by search
  const filtered = modules.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.code.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.nodes?.some((n) => n.title.toLowerCase().includes(q))
    );
  });

  // Group by section then subcategory
  const grouped: Record<string, Record<string, ModuleWithNodes[]>> = {};
  for (const m of filtered) {
    const section = getSection(m.category);
    const sub = getSubcategory(m.category);
    if (!grouped[section]) grouped[section] = {};
    if (!grouped[section][sub]) grouped[section][sub] = [];
    grouped[section][sub].push(m);
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Admin Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1">
              {modules.length} modules &middot; {modules.reduce((s, m) => s + (m._count?.nodes ?? 0), 0)} chapters
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-sm"
            >
              &larr; Back to Graph
            </Link>
            <button
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
            >
              + New Module
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search modules, chapters, codes..."
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Create form */}
        {showCreate && (
          <form
            onSubmit={handleCreate}
            className="mb-6 p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4"
          >
            <h2 className="text-lg font-semibold text-zinc-200">Create New Module</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  placeholder="e.g., Topology"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Author</label>
                <input
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  placeholder="e.g., Prof. Dupont"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                rows={2}
              />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Color</label>
                <input
                  type="color"
                  value={form.color}
                  onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                  className="h-10 w-20 rounded cursor-pointer"
                />
              </div>
              <div className="flex gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
                >
                  Create Module
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Grouped module list */}
        {["Pure Mathematics", "Applied Mathematics", "Meta-Skills"].map((section) => {
          const subs = grouped[section];
          if (!subs) return null;
          return (
            <div key={section} className={`mb-8 p-5 rounded-xl border ${SECTION_COLORS[section]}`}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                {section}
              </h2>
              {Object.entries(subs).map(([sub, mods]) => (
                <div key={sub} className="mb-4 last:mb-0">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 ml-1">
                    {sub}
                  </h3>
                  <div className="space-y-2">
                    {mods.map((m) => (
                      <div
                        key={m.id}
                        className="rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors"
                      >
                        {/* Module header row */}
                        <div className="flex items-center p-4">
                          <button
                            onClick={() => toggleExpanded(m.id)}
                            className="mr-3 text-zinc-600 hover:text-zinc-400 text-xs"
                          >
                            {expandedModules.has(m.id) ? "▼" : "▶"}
                          </button>
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0 mr-3"
                            style={{ backgroundColor: m.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                                {m.code}
                              </span>
                              <Link
                                href={`/admin/modules/${m.id}`}
                                className="font-semibold text-zinc-200 hover:text-white text-sm truncate"
                              >
                                {m.title}
                              </Link>
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5">
                              {m.author} &middot; {m._count?.nodes ?? 0} chapters
                            </p>
                          </div>
                          <Link
                            href={`/admin/modules/${m.id}`}
                            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 shrink-0"
                          >
                            Edit Module
                          </Link>
                        </div>

                        {/* Expanded chapter list */}
                        {expandedModules.has(m.id) && m.nodes && m.nodes.length > 0 && (
                          <div className="border-t border-zinc-800 px-4 py-3">
                            <div className="grid grid-cols-2 gap-1.5">
                              {m.nodes.map((n) => (
                                <Link
                                  key={n.id}
                                  href={`/admin/nodes/${n.id}`}
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                                >
                                  <span className="text-[10px] font-mono text-zinc-600">
                                    {n.code}
                                  </span>
                                  <span className="truncate">{n.title}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center text-zinc-600 py-12">
            No modules found matching &quot;{search}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
