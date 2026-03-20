export type SectionType =
  | "motivation"
  | "definition"
  | "theorem"
  | "proof"
  | "example"
  | "remark"
  | "historique";

export interface LessonSection {
  type: SectionType;
  title: string;
  content: string;
  commentary?: string;
  steps?: string[];
}

export type ExerciseType = "computational" | "qcm" | "proof";

export interface QCMChoice {
  text: string;
  correct: boolean;
}

export interface ExerciseData {
  id: string;
  nodeId: string;
  title: string;
  type: ExerciseType;
  statement: string;
  difficulty: number;
  hints: string[];
  solution: string;
  answer: string;
  choices: QCMChoice[];
  orderIndex: number;
}

export interface LessonData {
  id: string;
  nodeId: string;
  content: string;
  sections: LessonSection[];
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  statement: string;
  difficulty: number;
  hints: string[];
  solution: string;
  moduleId: string | null;
  requiredNodes: { node: { id: string; title: string; moduleId: string } }[];
}
