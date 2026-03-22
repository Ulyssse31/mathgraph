import type { GeneratedChapter } from "./types";

const VALID_SECTION_TYPES = [
  "motivation", "problem", "intuition", "definition", "theorem", "proof",
  "example", "remark", "historique", "warning", "approfondissement",
  "application", "exercise-inline", "recap", "prerequisites",
];

const VALID_EXERCISE_TYPES = ["computational", "qcm", "proof"];

export function validateChapter(chapter: GeneratedChapter): string[] {
  const warnings: string[] = [];

  // --- Section validation ---
  if (!chapter.sections || chapter.sections.length === 0) {
    warnings.push("ERROR: No sections in chapter");
    return warnings;
  }

  // Check section types
  for (const [i, section] of chapter.sections.entries()) {
    if (!VALID_SECTION_TYPES.includes(section.type)) {
      warnings.push(`ERROR: Invalid section type "${section.type}" at index ${i}`);
    }
    if (!section.title) {
      warnings.push(`WARN: Section ${i} (${section.type}) has no title`);
    }
    if (!section.content && section.type !== "exercise-inline") {
      warnings.push(`ERROR: Section ${i} (${section.type}) has no content`);
    }
    if (section.type === "exercise-inline" && !section.exercise) {
      warnings.push(`ERROR: exercise-inline at index ${i} has no exercise object`);
    }
  }

  // Check first section is problem or motivation
  const firstType = chapter.sections[0].type;
  if (firstType !== "problem" && firstType !== "motivation") {
    warnings.push(`WARN: First section should be "problem" or "motivation", got "${firstType}"`);
  }

  // Check last section is recap
  const lastType = chapter.sections[chapter.sections.length - 1].type;
  if (lastType !== "recap") {
    warnings.push(`WARN: Last section should be "recap", got "${lastType}"`);
  }

  // Check for at least one interactive embed
  const allContent = chapter.sections.map((s) => s.content).join(" ");
  const hasEmbed =
    allContent.includes("::desmos[") ||
    allContent.includes("::video[") ||
    allContent.includes("::geogebra[") ||
    allContent.includes("::three[");
  if (!hasEmbed) {
    warnings.push("WARN: No interactive embeds (::desmos[], ::video[], etc.) found");
  }

  // Check for at least one exercise-inline
  const hasInlineExercise = chapter.sections.some(
    (s) => s.type === "exercise-inline"
  );
  if (!hasInlineExercise) {
    warnings.push("WARN: No exercise-inline section found in lesson flow");
  }

  // Check theorem proofs are complete
  for (const [i, section] of chapter.sections.entries()) {
    if (
      section.type === "theorem" &&
      section.content.includes("---proof---") &&
      !section.starred
    ) {
      const proofPart = section.content.split("---proof---")[1];
      if (!proofPart || proofPart.trim().length < 50) {
        warnings.push(`WARN: Theorem at index ${i} has very short proof`);
      }
    }
  }

  // Check glossary links
  const glossaryCount = (allContent.match(/\[\[/g) || []).length;
  if (glossaryCount < 2) {
    warnings.push(`WARN: Only ${glossaryCount} glossary links ([[term]]). Recommend at least 2`);
  }

  // --- Exercise validation ---
  if (!chapter.exercises || chapter.exercises.length < 4) {
    warnings.push(
      `WARN: Only ${chapter.exercises?.length ?? 0} exercises. Minimum is 4`
    );
  }

  if (chapter.exercises) {
    const types = new Set(chapter.exercises.map((e) => e.type));
    if (types.size < 2) {
      warnings.push("WARN: Exercises use only 1 type. Recommend at least 2 different types");
    }

    const difficulties = chapter.exercises.map((e) => e.difficulty);
    if (!difficulties.some((d) => d <= 2)) {
      warnings.push("WARN: No easy exercise (difficulty 1-2)");
    }
    if (!difficulties.some((d) => d >= 4)) {
      warnings.push("WARN: No hard exercise (difficulty 4-5)");
    }

    for (const [i, ex] of chapter.exercises.entries()) {
      if (!VALID_EXERCISE_TYPES.includes(ex.type)) {
        warnings.push(`ERROR: Invalid exercise type "${ex.type}" at index ${i}`);
      }
      if (!ex.statement) {
        warnings.push(`ERROR: Exercise ${i} has no statement`);
      }
      if (!ex.solution) {
        warnings.push(`WARN: Exercise ${i} has no solution`);
      }
      if (ex.type === "qcm") {
        if (!ex.choices || ex.choices.length !== 4) {
          warnings.push(`ERROR: QCM exercise ${i} must have exactly 4 choices`);
        }
        if (ex.choices && !ex.choices.some((c) => c.correct)) {
          warnings.push(`ERROR: QCM exercise ${i} has no correct answer`);
        }
      }
      if (!ex.hints || ex.hints.length === 0) {
        warnings.push(`WARN: Exercise ${i} has no hints`);
      }
    }
  }

  return warnings;
}
