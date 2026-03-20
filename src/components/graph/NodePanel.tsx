"use client";

import Link from "next/link";
import type { ConceptNode, ConceptEdge, CrossModuleEdge, NodeStatus, CrossEdgeWithNodes } from "@/types/graph";

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
  locked: { label: "Locked", color: "#71717a" },
  available: { label: "Available", color: "#6366f1" },
  in_progress: { label: "In Progress", color: "#f59e0b" },
  practiced: { label: "Practiced", color: "#10b981" },
  mastered: { label: "Mastered", color: "#eab308" },
};

const nodeTypeLabels: Record<string, { label: string; icon: string }> = {
  core: { label: "", icon: "" },
  history: { label: "History", icon: "📜" },
  example: { label: "Example", icon: "💡" },
  application: { label: "Application", icon: "🔧" },
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
  if (!node) return null;

  const status = statusLabels[node.status] || statusLabels.locked;
  const nodeTypeInfo = nodeTypeLabels[node.nodeType] || nodeTypeLabels.core;

  // Compute prerequisites: edges where this node is the target
  const prereqs: PrereqInfo[] = conceptEdges
    .filter((e) => e.targetId === node.id)
    .map((e) => {
      const prereqNode = allNodes.find((n) => n.id === e.sourceId);
      return prereqNode
        ? {
            id: prereqNode.id,
            code: prereqNode.code,
            title: prereqNode.title,
            status: prereqNode.status,
          }
        : null;
    })
    .filter((p): p is PrereqInfo => p !== null);

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-zinc-900 border-l border-zinc-800 shadow-2xl z-50 overflow-y-auto animate-node-unlock">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-medium px-2 py-1 rounded-full"
              style={{
                backgroundColor: `${status.color}20`,
                color: status.color,
              }}
            >
              {status.label}
            </span>
            {node.isOptional && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-500/10 text-amber-400">
                Optional
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
            className="text-zinc-500 hover:text-zinc-300 transition-colors text-lg cursor-pointer"
          >
            &times;
          </button>
        </div>
        {node.code && (
          <span className="text-[10px] font-mono text-zinc-500 mb-1 block">
            {node.code}
          </span>
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
            {node.description || "No description yet."}
          </p>
        </div>

        {/* Prerequisites */}
        {prereqs.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Prerequisites
            </h3>
            <div className="space-y-1.5">
              {prereqs.map((p) => {
                const done =
                  p.status === "practiced" ||
                  p.status === "mastered" ||
                  p.status === "in_progress";
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-zinc-800/50"
                  >
                    <span className={done ? "text-emerald-400" : "text-zinc-600"}>
                      {done ? "✓" : "○"}
                    </span>
                    {p.code && (
                      <span className="text-[10px] font-mono text-zinc-600">
                        {p.code}
                      </span>
                    )}
                    <span className={done ? "text-zinc-300" : "text-zinc-500"}>
                      {p.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* XP */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Experience
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (node.xp / 50) * 100)}%` }}
              />
            </div>
            <span className="text-sm font-mono text-zinc-400">
              {node.xp}/50 XP
            </span>
          </div>
        </div>

        {/* Cross-module connections */}
        {crossEdges.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Connected Modules
            </h3>
            <div className="space-y-2">
              {crossEdges.map((edge) => {
                const targetModule =
                  edge.sourceNodeId === node.id
                    ? edge.targetModuleId
                    : edge.sourceModuleId;
                return (
                  <button
                    key={edge.id}
                    onClick={() => onNavigateModule?.(targetModule)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm text-zinc-300 flex items-center justify-between cursor-pointer"
                  >
                    <span>Go to {targetModule}</span>
                    <span className="text-zinc-600">&rarr;</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Open lesson button */}
        {node.status !== "locked" && (
          <Link
            href={`/learn/${node.id}`}
            className="block w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all text-center"
          >
            Ouvrir le cours
          </Link>
        )}

        {/* Action button */}
        {node.status === "available" && (
          <button
            onClick={() => onComplete?.(node.id)}
            className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Start Learning
          </button>
        )}
        {node.status === "in_progress" && (
          <button
            onClick={() => onComplete?.(node.id)}
            className="w-full py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
          >
            Mark as Practiced
          </button>
        )}
        {node.status === "practiced" && (
          <button
            onClick={() => onComplete?.(node.id)}
            className="w-full py-3 rounded-xl font-semibold text-white bg-yellow-600 hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            Mark as Mastered
          </button>
        )}
        {node.status === "locked" && (
          <div className="text-center text-sm text-zinc-600 py-3">
            Complete prerequisites to unlock
          </div>
        )}
      </div>
    </div>
  );
}
