"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ConceptNode, ConceptEdge, CrossEdgeWithNodes, NodeStatus } from "@/types/graph";

interface PrereqInfo {
  id: string;
  code: string;
  title: string;
  status: NodeStatus;
}

interface NodePanelProps {
  node: ConceptNode | null;
  allNodes?: ConceptNode[];
  conceptEdges?: ConceptEdge[];
  crossEdges?: CrossEdgeWithNodes[];
  onClose: () => void;
  onComplete?: (nodeId: string) => void;
  onNavigateModule?: (moduleId: string) => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  locked:      { label: "Verrouillé",  color: "#71717a" },
  available:   { label: "Disponible",  color: "#6366f1" },
  in_progress: { label: "En cours",    color: "#f59e0b" },
  practiced:   { label: "Pratiqué",    color: "#10b981" },
  mastered:    { label: "Maîtrisé",    color: "#eab308" },
};

const nodeTypeLabels: Record<string, { label: string; icon: string }> = {
  core:        { label: "",             icon: "" },
  history:     { label: "Histoire",     icon: "📜" },
  example:     { label: "Exemple",      icon: "💡" },
  application: { label: "Application",  icon: "🔧" },
};

export default function NodePanel({
  node,
  allNodes = [],
  conceptEdges = [],
  crossEdges = [],
  onClose,
  onComplete,
  onNavigateModule,
}: NodePanelProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<{ completed: number; total: number } | null>(null);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (!node) return;
    setProgress(null);
    fetch(`/api/nodes/${node.id}/progress`)
      .then((r) => {
        if (r.status === 401) { setLoggedIn(false); return null; }
        setLoggedIn(true);
        return r.json();
      })
      .then((d) => { if (d) setProgress(d); })
      .catch(() => {});
  }, [node?.id]);

  if (!node) return null;

  const status = statusLabels[node.status] || statusLabels.locked;
  const nodeTypeInfo = nodeTypeLabels[node.nodeType] || nodeTypeLabels.core;
  const pct = progress && progress.total > 0
    ? Math.round((progress.completed / progress.total) * 100)
    : 0;

  const prereqs: PrereqInfo[] = conceptEdges
    .filter((e) => e.targetId === node.id)
    .map((e) => {
      const prereqNode = allNodes.find((n) => n.id === e.sourceId);
      return prereqNode
        ? { id: prereqNode.id, code: prereqNode.code, title: prereqNode.title, status: prereqNode.status }
        : null;
    })
    .filter((p): p is PrereqInfo => p !== null);

  const handleCTA = () => {
    if (node.status === "available" || node.status === "locked") onComplete?.(node.id);
    router.push(`/learn/${node.id}`);
  };

  // Determine CTA appearance
  let ctaLabel = "Commencer";
  let ctaClass = "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white";
  if (pct === 100) {
    ctaLabel = "Revoir le cours";
    ctaClass = "bg-emerald-700 hover:bg-emerald-600 text-white";
  } else if (pct > 0) {
    ctaLabel = "Continuer →";
    ctaClass = "bg-amber-600 hover:bg-amber-500 text-white";
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={node.title} className="fixed right-0 top-0 h-full w-full sm:w-96 bg-zinc-900 border-l border-zinc-800 shadow-2xl z-50 overflow-y-auto animate-node-unlock">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{ backgroundColor: `${status.color}20`, color: status.color }}
            >
              {status.label}
            </span>
            {node.isOptional && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/10 text-amber-400">
                Optionnel
              </span>
            )}
            {nodeTypeInfo.label && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
                {nodeTypeInfo.icon} {nodeTypeInfo.label}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="text-zinc-500 hover:text-zinc-300 transition-colors text-lg cursor-pointer"
          >
            &times;
          </button>
        </div>
        {node.code && (
          <span className="text-[10px] font-mono text-zinc-500 mb-1 block">{node.code}</span>
        )}
        <h2 className="text-xl font-bold text-zinc-100">{node.title}</h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Description
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {node.description || "Aucune description."}
          </p>
        </div>

        {/* Progress */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Progression
          </h3>
          {!loggedIn ? (
            <p className="text-xs text-zinc-600 italic">
              Connectez-vous pour suivre votre progression.
            </p>
          ) : progress === null ? (
            <div className="h-2 bg-zinc-800 rounded-full animate-pulse" />
          ) : progress.total === 0 ? (
            <p className="text-xs text-zinc-600 italic">Pas d&apos;exercices pour ce chapitre.</p>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct === 100 ? "#10b981" : pct > 0 ? "#f59e0b" : "#6366f1",
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-zinc-400 shrink-0">{pct}%</span>
              </div>
              <p className="text-xs text-zinc-500">
                {progress.completed}/{progress.total} exercices complétés
              </p>
            </div>
          )}
        </div>

        {/* Prerequisites */}
        {prereqs.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Prérequis
            </h3>
            <div className="space-y-1.5">
              {prereqs.map((p) => {
                const done = p.status === "practiced" || p.status === "mastered" || p.status === "in_progress";
                return (
                  <div key={p.id} className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-zinc-800/50">
                    <span className={done ? "text-emerald-400" : "text-zinc-600"}>
                      {done ? "✓" : "○"}
                    </span>
                    {p.code && <span className="text-[10px] font-mono text-zinc-600">{p.code}</span>}
                    <span className={done ? "text-zinc-300" : "text-zinc-500"}>{p.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cross-module connections */}
        {crossEdges.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Modules connectés
            </h3>
            <div className="space-y-2">
              {crossEdges.map((edge) => {
                const targetModule = edge.sourceNodeId === node.id ? edge.targetModuleId : edge.sourceModuleId;
                return (
                  <button
                    key={edge.id}
                    onClick={() => onNavigateModule?.(targetModule)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm text-zinc-300 flex items-center justify-between cursor-pointer"
                  >
                    <span>Aller à {targetModule}</span>
                    <span className="text-zinc-600">&rarr;</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Single CTA */}
        <button
          onClick={handleCTA}
          className={`w-full py-3 rounded-xl font-semibold transition-all text-center cursor-pointer ${ctaClass}`}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
