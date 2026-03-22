export type SectionType =
  | "motivation"
  | "definition"
  | "theorem"
  | "proof"
  | "example"
  | "remark"
  | "historique"
  | "problem"
  | "intuition"
  | "warning"
  | "approfondissement"
  | "application"
  | "exercise-inline"
  | "recap"
  | "prerequisites";

export interface InlineExercise {
  statement: string;
  hint?: string;
  solution: string;
}

export interface LessonSection {
  type: SectionType;
  title: string;
  content: string;
  commentary?: string;
  steps?: string[];
  starred?: boolean;
  collapsed?: boolean;
  exercise?: InlineExercise;
}

export type ExerciseType = "computational" | "qcm" | "proof" | "automatism" | "open_problem" | "numerical" | "abstract" | "true_false" | "fill_blank" | "matching" | "construction";

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
