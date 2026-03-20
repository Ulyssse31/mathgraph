export type NodeStatus =
  | "locked"
  | "available"
  | "in_progress"
  | "practiced"
  | "mastered";

export type EdgeType = "prerequisite" | "soft" | "enrichment" | "hidden";

export interface MathModule {
  id: string;
  title: string;
  description: string;
  author: string;
  color: string;
  icon: string;
  code: string;
  category: string;
  motivation: string;
  bibliography: string;
  isMeta: boolean;
  posX: number;
  posY: number;
}

export type ConceptNodeType = "core" | "history" | "example" | "application";

export interface ConceptNode {
  id: string;
  moduleId: string;
  code: string;
  title: string;
  description: string;
  nodeType: ConceptNodeType;
  isOptional: boolean;
  status: NodeStatus;
  xp: number;
  posX: number;
  posY: number;
}

export interface ConceptEdge {
  id: string;
  sourceId: string;
  targetId: string;
  type: EdgeType;
  moduleId: string;
}

export interface CrossModuleEdge {
  id: string;
  sourceModuleId: string;
  sourceNodeId: string;
  targetModuleId: string;
  targetNodeId: string;
  type: EdgeType;
}

export interface ModuleEdge {
  id: string;
  sourceModuleId: string;
  targetModuleId: string;
}

export interface CrossEdgeWithNodes extends CrossModuleEdge {
  depth: number;
  label: string;
  description: string;
  sourceNode: { id: string; title: string; module: { id: string; title: string; color: string } };
  targetNode: { id: string; title: string; module: { id: string; title: string; color: string } };
}
