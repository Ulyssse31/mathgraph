import type { SectionType, InlineExercise } from "@/types/content";

export interface GenerationSpec {
  nodeId: string;
  nodeTitle: string;
  nodeDescription: string;
  nodeCode: string;
  moduleTitle: string;
  moduleCategory: string;
  moduleBibliography: BibEntry[];
  prerequisites: { title: string; code: string }[];
  dependents: { title: string }[];
  domainStyle: "problem-concrete" | "problem-exploratory" | "visual-first";
  keyTheorems?: string[];
  keyDefinitions?: string[];
  openingProblemHint?: string;
}

export interface BibEntry {
  title: string;
  author: string;
  role: "scope-main" | "scope-advanced" | "supplementary";
  topicMap?: Record<string, string>;
}

export interface GeneratedSection {
  type: SectionType;
  title: string;
  content: string;
  commentary?: string;
  starred?: boolean;
  collapsed?: boolean;
  exercise?: InlineExercise;
}

export interface GeneratedExercise {
  title: string;
  type: "computational" | "qcm" | "proof";
  statement: string;
  difficulty: number;
  hints: string[];
  solution: string;
  answer: string;
  choices?: { text: string; correct: boolean }[];
  orderIndex: number;
}

export interface GeneratedChapter {
  sections: GeneratedSection[];
  exercises: GeneratedExercise[];
  metadata: {
    generatedAt: string;
    model: string;
    version: number;
    reviewStatus: "draft" | "reviewed" | "approved";
  };
}

export function inferDomainStyle(
  category: string
): GenerationSpec["domainStyle"] {
  const cat = category.toLowerCase();
  if (
    cat.includes("analysis") ||
    cat.includes("applied") ||
    cat.includes("numerical") ||
    cat.includes("probability") ||
    cat.includes("physics")
  ) {
    return "problem-concrete";
  }
  if (
    cat.includes("geometry") ||
    cat.includes("topology")
  ) {
    return "visual-first";
  }
  return "problem-exploratory";
}
