"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import MathNodeComponent from "./MathNode";
import MathEdgeComponent from "./MathEdge";
import PortalNodeComponent from "./PortalNode";
import NodePanel from "./NodePanel";
import ModuleOverview from "./ModuleOverview";
import { getLayoutedElements } from "@/lib/layout";
import type {
  ConceptNode,
  ConceptEdge,
  NodeStatus,
  CrossEdgeWithNodes,
} from "@/types/graph";

interface ConceptGraphProps {
  moduleId: string;
  moduleColor: string;
  moduleTitle: string;
  moduleDescription?: string;
  moduleCode?: string;
  moduleMotivation?: string;
  moduleBibliography?: string;
  conceptNodes: ConceptNode[];
  conceptEdges: ConceptEdge[];
  crossEdges: CrossEdgeWithNodes[];
  onBack: () => void;
  onNavigateModule: (moduleId: string) => void;
}

const nodeTypes = { mathNode: MathNodeComponent, portalNode: PortalNodeComponent };
const edgeTypes = { mathEdge: MathEdgeComponent };

const nextStatus: Record<string, NodeStatus> = {
  available: "in_progress",
  in_progress: "practiced",
  practiced: "mastered",
};

export default function ConceptGraph({
  moduleId,
  moduleColor,
  moduleTitle,
  moduleDescription = "",
  moduleCode = "",
  moduleMotivation = "",
  moduleBibliography = "[]",
  conceptNodes: initialConceptNodes,
  conceptEdges,
  crossEdges,
  onBack,
  onNavigateModule,
}: ConceptGraphProps) {
  const [conceptNodeState, setConceptNodeState] =
    useState<ConceptNode[]>(initialConceptNodes);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);

  // Build React Flow nodes and edges, then auto-layout with dagre
  const { flowNodes, flowEdges } = useMemo(() => {
    // 1. Build concept nodes (raw, no positions yet — dagre will set them)
    const rawConceptNodes: Node[] = conceptNodeState.map((n) => ({
      id: n.id,
      type: "mathNode",
      position: { x: 0, y: 0 }, // dagre will overwrite
      data: {
        label: n.title,
        code: n.code,
        description: n.description,
        status: n.status,
        xp: n.xp,
        color: moduleColor,
        nodeType: n.nodeType,
        isOptional: n.isOptional,
      },
    }));

    // 2. Build concept edges
    const rawConceptEdges: Edge[] = conceptEdges.map((e) => ({
      id: e.id,
      source: e.sourceId,
      target: e.targetId,
      type: "mathEdge",
      data: { edgeType: e.type, color: moduleColor },
    }));

    // 3. Auto-layout concept nodes using dagre
    const layoutedNodes = getLayoutedElements(rawConceptNodes, rawConceptEdges, {
      rankdir: "TB",
      ranksep: 100,
      nodesep: 60,
      nodeWidth: 220,
      nodeHeight: 80,
    });

    // 4. Compute bounding box of layouted nodes for portal positioning
    const xs = layoutedNodes.map((n) => n.position.x);
    const ys = layoutedNodes.map((n) => n.position.y);
    const bbox = {
      maxX: Math.max(...xs) + 220,
      minY: Math.min(...ys),
    };

    // 5. Create portal nodes positioned to the right
    const portalNodes: Node[] = [];
    const nodeIds = new Set(initialConceptNodes.map((n) => n.id));
    let portalIndex = 0;

    for (const edge of crossEdges) {
      const isOutgoing = nodeIds.has(edge.sourceNodeId);
      const foreignNode = isOutgoing ? edge.targetNode : edge.sourceNode;
      const portalId = `portal-${edge.id}`;

      portalNodes.push({
        id: portalId,
        type: "portalNode",
        position: {
          x: bbox.maxX + 120,
          y: bbox.minY + portalIndex * 100,
        },
        data: {
          label: foreignNode.title,
          moduleName: foreignNode.module.title,
          moduleColor: foreignNode.module.color,
          depth: edge.depth,
          edgeLabel: edge.label,
        },
      });
      portalIndex++;
    }

    // 6. Cross-module edges
    const portalEdges: Edge[] = crossEdges.map((e) => {
      const isOutgoing = nodeIds.has(e.sourceNodeId);
      const localNodeId = isOutgoing ? e.sourceNodeId : e.targetNodeId;
      const portalId = `portal-${e.id}`;

      return {
        id: `cross-${e.id}`,
        source: isOutgoing ? localNodeId : portalId,
        target: isOutgoing ? portalId : localNodeId,
        type: "mathEdge",
        data: {
          edgeType: "enrichment",
          depth: e.depth,
        },
      };
    });

    return {
      flowNodes: [...layoutedNodes, ...portalNodes],
      flowEdges: [...rawConceptEdges, ...portalEdges],
    };
  }, [conceptNodeState, conceptEdges, crossEdges, moduleColor, initialConceptNodes]);

  const [nodes, , onNodesChange] = useNodesState(flowNodes);
  const [edges, , onEdgesChange] = useEdgesState(flowEdges);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (node.id.startsWith("portal-")) {
        const edgeId = node.id.replace("portal-", "");
        const edge = crossEdges.find((e) => e.id === edgeId);
        if (edge) {
          const nodeIds = new Set(initialConceptNodes.map((n) => n.id));
          const foreignModuleId = nodeIds.has(edge.sourceNodeId)
            ? edge.targetModuleId
            : edge.sourceModuleId;
          onNavigateModule(foreignModuleId);
        }
        return;
      }

      const cn = conceptNodeState.find((n) => n.id === node.id);
      if (cn) setSelectedNode(cn);
    },
    [conceptNodeState, crossEdges, initialConceptNodes, onNavigateModule]
  );

  const handleComplete = useCallback(
    (nodeId: string) => {
      setConceptNodeState((prev) => {
        const updated = prev.map((n) => {
          if (n.id === nodeId) {
            const ns = nextStatus[n.status];
            if (!ns) return n;
            return { ...n, status: ns };
          }
          return n;
        });

        return updated;
      });

      setSelectedNode((prev) => {
        if (!prev || prev.id !== nodeId) return prev;
        const ns = nextStatus[prev.status];
        return ns ? { ...prev, status: ns } : prev;
      });

      fetch(`/api/nodes/${nodeId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus[conceptNodeState.find((n) => n.id === nodeId)?.status || ""],
        }),
      }).catch(console.error);
    },
    [conceptEdges, conceptNodeState]
  );

  const selectedCrossEdges = crossEdges.filter(
    (e) =>
      e.sourceNodeId === selectedNode?.id ||
      e.targetNodeId === selectedNode?.id
  );

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-40 flex items-center gap-3">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm font-medium cursor-pointer"
        >
          &larr; All Modules
        </button>
        <h1 className="text-lg font-bold" style={{ color: moduleColor }}>
          {moduleTitle}
        </h1>
      </div>

      <ModuleOverview
        title={moduleTitle}
        code={moduleCode}
        description={moduleDescription}
        motivation={moduleMotivation}
        bibliography={moduleBibliography}
        color={moduleColor}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.4 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        style={{ backgroundColor: "#09090b" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#27272a"
        />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.id.startsWith("portal-")) {
              const d = node.data as { moduleColor?: string };
              return d?.moduleColor || "#f59e0b";
            }
            return moduleColor;
          }}
          maskColor="rgba(0, 0, 0, 0.7)"
        />
      </ReactFlow>

      <NodePanel
        node={selectedNode}
        allNodes={conceptNodeState}
        conceptEdges={conceptEdges}
        crossEdges={selectedCrossEdges}
        onClose={() => setSelectedNode(null)}
        onComplete={handleComplete}
        onNavigateModule={onNavigateModule}
      />
    </div>
  );
}
