"use client";

import {
  BaseEdge,
  getBezierPath,
  type EdgeProps,
} from "@xyflow/react";
import { memo } from "react";
import type { EdgeType } from "@/types/graph";

export interface MathEdgeData {
  edgeType: EdgeType;
  color?: string;
}

function MathEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style: edgeStyle,
}: EdgeProps) {
  const edgeData = data as unknown as MathEdgeData | undefined;
  const edgeType = edgeData?.edgeType || "prerequisite";

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const edgeStyles: Record<EdgeType, React.CSSProperties> = {
    prerequisite: {
      stroke: edgeData?.color || "#6366f1",
      strokeWidth: 2,
      strokeOpacity: 0.6,
    },
    soft: {
      stroke: edgeData?.color || "#6366f1",
      strokeWidth: 1.5,
      strokeDasharray: "8 4",
      strokeOpacity: 0.4,
    },
    enrichment: {
      stroke: "#f59e0b",
      strokeWidth: 1.5,
      strokeDasharray: "4 4",
      strokeOpacity: 0.5,
    },
    hidden: {
      stroke: "#ef4444",
      strokeWidth: 2,
      strokeDasharray: "2 6",
      strokeOpacity: 0.3,
    },
  };

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{ ...edgeStyles[edgeType], ...edgeStyle }}
    />
  );
}

export default memo(MathEdgeComponent);
