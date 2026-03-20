"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { memo } from "react";
import type { NodeStatus, ConceptNodeType } from "@/types/graph";

export interface MathNodeData {
  label: string;
  code?: string;
  description: string;
  status: NodeStatus;
  xp: number;
  color: string;
  isModule?: boolean;
  nodeCount?: number;
  nodeType?: ConceptNodeType;
  isOptional?: boolean;
}

const statusStyles: Record<
  NodeStatus,
  { border: string; bg: string; glow: string; opacity: string }
> = {
  locked: {
    border: "border-zinc-700",
    bg: "bg-zinc-900",
    glow: "",
    opacity: "opacity-40",
  },
  available: {
    border: "border-indigo-500",
    bg: "bg-zinc-900",
    glow: "animate-pulse-glow",
    opacity: "",
  },
  in_progress: {
    border: "border-amber-500",
    bg: "bg-zinc-900",
    glow: "",
    opacity: "",
  },
  practiced: {
    border: "border-emerald-500/70",
    bg: "bg-zinc-900",
    glow: "",
    opacity: "",
  },
  mastered: {
    border: "border-yellow-400",
    bg: "bg-zinc-900",
    glow: "",
    opacity: "",
  },
};

const statusIcons: Record<NodeStatus, string> = {
  locked: "\u{1F512}",
  available: "",
  in_progress: "",
  practiced: "\u2713",
  mastered: "\u2605",
};

const nodeTypeIcons: Record<string, string> = {
  history: "📜",
  example: "💡",
  application: "🔧",
};

function MathNodeComponent({ data }: NodeProps) {
  const nodeData = data as unknown as MathNodeData;
  const style = statusStyles[nodeData.status] || statusStyles.locked;
  const isOptionalOrHistory =
    nodeData.isOptional || nodeData.nodeType === "history";
  const typeIcon = nodeData.nodeType ? nodeTypeIcons[nodeData.nodeType] : null;

  return (
    <div
      className={`
        relative rounded-xl px-5 py-4
        ${style.bg} ${style.opacity} ${style.glow}
        transition-all duration-300 cursor-pointer
        hover:scale-105 hover:brightness-110
        min-w-[200px] max-w-[240px]
        ${isOptionalOrHistory ? "border-2 border-dashed" : "border-2"}
      `}
      style={{
        borderColor:
          nodeData.status !== "locked"
            ? isOptionalOrHistory
              ? `${nodeData.color}80`
              : nodeData.color
            : undefined,
        boxShadow:
          nodeData.status === "available"
            ? `0 0 20px ${nodeData.color}30`
            : undefined,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-600 !border-zinc-500 !w-2 !h-2"
      />

      {/* Status icon */}
      {statusIcons[nodeData.status] && (
        <span className="absolute -top-2.5 -right-2.5 text-sm">
          {statusIcons[nodeData.status]}
        </span>
      )}

      {/* Node type icon (top-left) */}
      {typeIcon && (
        <span className="absolute -top-2.5 -left-2.5 text-sm">{typeIcon}</span>
      )}

      {/* Code badge */}
      {nodeData.code && (
        <div
          className="text-[9px] font-mono text-center mb-1"
          style={{
            color:
              nodeData.status !== "locked" ? `${nodeData.color}90` : "#52525b",
          }}
        >
          {nodeData.code}
        </div>
      )}

      {/* Title */}
      <div
        className="font-semibold text-base text-center leading-tight"
        style={{
          color: nodeData.status !== "locked" ? nodeData.color : "#71717a",
        }}
      >
        {nodeData.label}
      </div>

      {/* Description snippet */}
      {nodeData.description && (
        <div className="text-[11px] text-zinc-500 text-center mt-1.5 line-clamp-2 leading-snug">
          {nodeData.description}
        </div>
      )}

      {/* Optional badge */}
      {isOptionalOrHistory && (
        <div className="text-[9px] text-center mt-1.5 text-amber-400/70 font-medium">
          {nodeData.nodeType === "history"
            ? "Optional · History"
            : nodeData.nodeType === "example"
              ? "Optional · Example"
              : nodeData.nodeType === "application"
                ? "Optional · Application"
                : "Optional"}
        </div>
      )}

      {/* Module info */}
      {nodeData.isModule && nodeData.nodeCount !== undefined && (
        <div className="text-xs text-zinc-500 text-center mt-1.5">
          {nodeData.nodeCount} concepts
        </div>
      )}

      {/* XP bar for non-module nodes */}
      {!nodeData.isModule && nodeData.status !== "locked" && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (nodeData.xp / 50) * 100)}%`,
                backgroundColor: nodeData.color,
              }}
            />
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">
            {nodeData.xp}xp
          </span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-600 !border-zinc-500 !w-2 !h-2"
      />
    </div>
  );
}

export default memo(MathNodeComponent);
