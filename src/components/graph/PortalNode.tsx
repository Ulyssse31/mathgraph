"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { memo } from "react";

export interface PortalNodeData {
  label: string;
  moduleName: string;
  moduleColor: string;
  depth: number;
  edgeLabel: string;
}

function PortalNodeComponent({ data }: NodeProps) {
  const d = data as unknown as PortalNodeData;

  return (
    <div
      className="relative rounded-xl border-2 border-dashed px-3 py-2 min-w-[140px] cursor-pointer
        bg-zinc-950/80 hover:bg-zinc-900/80 transition-all hover:scale-105"
      style={{
        borderColor: `${d.moduleColor}60`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-600 !border-zinc-500 !w-2 !h-2"
      />

      {/* Module badge */}
      <div
        className="text-[10px] font-medium px-1.5 py-0.5 rounded mb-1 inline-block"
        style={{
          backgroundColor: `${d.moduleColor}15`,
          color: d.moduleColor,
        }}
      >
        {d.moduleName}
      </div>

      {/* Node title */}
      <div className="text-xs text-zinc-400 font-medium">{d.label}</div>

      {/* Edge label */}
      {d.edgeLabel && (
        <div className="text-[10px] text-zinc-600 mt-1 italic">
          {d.edgeLabel}
        </div>
      )}

      {/* Depth indicator */}
      <div className="flex gap-0.5 mt-1">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: i < d.depth ? d.moduleColor : "#3f3f46",
            }}
          />
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-600 !border-zinc-500 !w-2 !h-2"
      />
    </div>
  );
}

export default memo(PortalNodeComponent);
