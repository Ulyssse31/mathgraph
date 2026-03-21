"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { MathModule, ConceptNode, ConceptEdge } from "@/types/graph";

interface BibEntry {
  title: string;
  author: string;
  level: "intro" | "intermediate" | "advanced";
}

interface ModuleData {
  module: MathModule;
  nodes: ConceptNode[];
  edges: ConceptEdge[];
}

export default function ModuleEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<ModuleData | null>(null);
  const [showAddNode, setShowAddNode] = useState(false);
  const [showAddEdge, setShowAddEdge] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [bibliography, setBibliography] = useState<BibEntry[]>([]);
  const [savingMeta, setSavingMeta] = useState(false);
  const [nodeForm, setNodeForm] = useState({
    title: "",
    description: "",
    status: "locked",
    posX: 0,
    posY: 0,
  });
  const [edgeForm, setEdgeForm] = useState({
    sourceId: "",
    targetId: "",
    type: "prerequisite",
  });

  useEffect(() => {
    fetch(`/api/modules/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setMotivation(d.module.motivation || "");
        try {
          setBibliography(JSON.parse(d.module.bibliography || "[]"));
        } catch {
          setBibliography([]);
        }
      });
  }, [id]);

  const saveMeta = async () => {
    setSavingMeta(true);
    try {
      const res = await fetch(`/api/modules/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          motivation,
          bibliography: JSON.stringify(bibliography),
        }),
      });
      if (res.ok) {
        toast.success("Metadata saved");
      } else {
        toast.error("Failed to save metadata");
      }
    } catch {
      toast.error("Network error");
    }
    setSavingMeta(false);
  };

  const addBibEntry = () => {
    setBibliography((b) => [...b, { title: "", author: "", level: "intro" }]);
  };

  const updateBibEntry = (idx: number, field: string, value: string) => {
    setBibliography((b) =>
      b.map((entry, i) => (i === idx ? { ...entry, [field]: value } : entry))
    );
  };

  const removeBibEntry = (idx: number) => {
    setBibliography((b) => b.filter((_, i) => i !== idx));
  };

  const addNode = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/nodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId: id, ...nodeForm }),
    });
    if (res.ok) {
      const node = await res.json();
      setData((prev) =>
        prev ? { ...prev, nodes: [...prev.nodes, node] } : prev
      );
      setShowAddNode(false);
      setNodeForm({ title: "", description: "", status: "locked", posX: 0, posY: 0 });
      toast.success("Concept created");
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Failed to create concept");
    }
  };

  const addEdge = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/edges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId: id, ...edgeForm }),
    });
    if (res.ok) {
      const edge = await res.json();
      setData((prev) =>
        prev ? { ...prev, edges: [...prev.edges, edge] } : prev
      );
      setShowAddEdge(false);
      setEdgeForm({ sourceId: "", targetId: "", type: "prerequisite" });
      toast.success("Edge created");
    } else {
      toast.error("Failed to create edge");
    }
  };

  const deleteEdge = async (edgeId: string) => {
    const res = await fetch(`/api/edges?id=${edgeId}`, { method: "DELETE" });
    if (res.ok) {
      setData((prev) =>
        prev
          ? { ...prev, edges: prev.edges.filter((e) => e.id !== edgeId) }
          : prev
      );
      toast.success("Edge deleted");
    } else {
      toast.error("Failed to delete edge");
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
          <Link href="/admin" className="hover:text-zinc-300">Admin</Link>
          <span>/</span>
          <span className="text-zinc-300">{data.module.title}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: data.module.color }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                  {data.module.code}
                </span>
                <h1 className="text-2xl font-bold text-zinc-100">
                  {data.module.title}
                </h1>
              </div>
              <p className="text-sm text-zinc-500">
                by {data.module.author} &middot; {data.nodes.length} concepts
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm"
            >
              &larr; Back
            </Link>
            <button
              onClick={() => setShowAddNode(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
            >
              + Add Concept
            </button>
            <button
              onClick={() => setShowAddEdge(true)}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium"
            >
              + Add Edge
            </button>
          </div>
        </div>

        {/* ─── Motivation & Bibliography ─── */}
        <div className="mb-8 p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-200">Module Metadata</h2>
            <button
              onClick={saveMeta}
              disabled={savingMeta}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-sm disabled:opacity-50"
            >
              {savingMeta ? "Saving..." : "Save Metadata"}
            </button>
          </div>

          <div>
            <label className="block text-xs text-zinc-500 mb-1">
              Motivation (displayed to students as introduction)
            </label>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
              placeholder="Why should students study this module? What makes it beautiful/useful?"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-zinc-500">
                Bibliography ({bibliography.length} entries)
              </label>
              <button
                type="button"
                onClick={addBibEntry}
                className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              >
                + Add Book
              </button>
            </div>
            <div className="space-y-2">
              {bibliography.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    value={entry.title}
                    onChange={(e) => updateBibEntry(idx, "title", e.target.value)}
                    placeholder="Book title"
                    className="flex-1 px-2 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  />
                  <input
                    value={entry.author}
                    onChange={(e) => updateBibEntry(idx, "author", e.target.value)}
                    placeholder="Author"
                    className="w-40 px-2 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  />
                  <select
                    value={entry.level}
                    onChange={(e) => updateBibEntry(idx, "level", e.target.value)}
                    className="w-32 px-2 py-1.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  >
                    <option value="intro">Intro</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeBibEntry(idx)}
                    className="text-red-500 hover:text-red-400 text-xs px-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Node Form */}
        {showAddNode && (
          <form
            onSubmit={addNode}
            className="mb-6 p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4"
          >
            <h3 className="font-semibold text-zinc-200">New Concept Node</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Title</label>
                <input
                  value={nodeForm.title}
                  onChange={(e) => setNodeForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  placeholder="e.g., Compact Spaces"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Status</label>
                <select
                  value={nodeForm.status}
                  onChange={(e) => setNodeForm((f) => ({ ...f, status: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                >
                  <option value="locked">Locked</option>
                  <option value="available">Available</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Description</label>
              <textarea
                value={nodeForm.description}
                onChange={(e) => setNodeForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                rows={2}
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm">
                Create
              </button>
              <button type="button" onClick={() => setShowAddNode(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Add Edge Form */}
        {showAddEdge && (
          <form
            onSubmit={addEdge}
            className="mb-6 p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-4"
          >
            <h3 className="font-semibold text-zinc-200">New Edge (Prerequisite)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">From (Source)</label>
                <select
                  value={edgeForm.sourceId}
                  onChange={(e) => setEdgeForm((f) => ({ ...f, sourceId: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  required
                >
                  <option value="">Select...</option>
                  {data.nodes.map((n) => (
                    <option key={n.id} value={n.id}>{n.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">To (Target)</label>
                <select
                  value={edgeForm.targetId}
                  onChange={(e) => setEdgeForm((f) => ({ ...f, targetId: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                  required
                >
                  <option value="">Select...</option>
                  {data.nodes.map((n) => (
                    <option key={n.id} value={n.id}>{n.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Type</label>
                <select
                  value={edgeForm.type}
                  onChange={(e) => setEdgeForm((f) => ({ ...f, type: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm"
                >
                  <option value="prerequisite">Prerequisite</option>
                  <option value="soft">Soft</option>
                  <option value="enrichment">Enrichment</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm">
                Create Edge
              </button>
              <button type="button" onClick={() => setShowAddEdge(false)} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Nodes list */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-zinc-200 mb-4">
            Concept Nodes
          </h2>
          <div className="grid gap-3">
            {data.nodes.map((node) => (
              <div
                key={node.id}
                className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    {node.code && (
                      <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-1 py-0.5 rounded">
                        {node.code}
                      </span>
                    )}
                    <h3 className="font-medium text-zinc-200">{node.title}</h3>
                    {node.isOptional && (
                      <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        Optional
                      </span>
                    )}
                    {node.nodeType !== "core" && (
                      <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                        {node.nodeType}
                      </span>
                    )}
                  </div>
                  {node.description && (
                    <p className="text-sm text-zinc-500 mt-1">{node.description}</p>
                  )}
                </div>
                <Link
                  href={`/admin/nodes/${node.id}`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 shrink-0"
                >
                  Edit Content
                </Link>
              </div>
            ))}
            {data.nodes.length === 0 && (
              <p className="text-zinc-600 text-sm">No concepts yet. Add one above.</p>
            )}
          </div>
        </div>

        {/* Edges list */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-200 mb-4">Edges</h2>
          <div className="grid gap-2">
            {data.edges.map((edge) => {
              const source = data.nodes.find((n) => n.id === edge.sourceId);
              const target = data.nodes.find((n) => n.id === edge.targetId);
              return (
                <div
                  key={edge.id}
                  className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between"
                >
                  <div className="text-sm text-zinc-300">
                    <span className="text-zinc-400">{source?.title || edge.sourceId}</span>
                    <span className="mx-2 text-zinc-600">&rarr;</span>
                    <span className="text-zinc-400">{target?.title || edge.targetId}</span>
                    <span className="ml-2 text-xs text-zinc-600">({edge.type})</span>
                  </div>
                  <button
                    onClick={() => deleteEdge(edge.id)}
                    className="text-xs text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
            {data.edges.length === 0 && (
              <p className="text-zinc-600 text-sm">No edges yet. Add one above.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
