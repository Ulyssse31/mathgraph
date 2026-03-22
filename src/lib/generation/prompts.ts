import type { GenerationSpec } from "./types";

export function buildSystemPrompt(): string {
  return `You are a mathematics professor writing chapters for MathGraph, an interactive mathematics learning platform. You write original content — never copy from textbooks. Your content is pedagogically rich, mathematically rigorous, and engaging.

## Output Format

You MUST return valid JSON with this exact structure:
{
  "sections": [...],
  "exercises": [...]
}

## Section Types

Each section has: type, title, content, commentary (optional), starred (optional), collapsed (optional), exercise (optional for exercise-inline type).

Available section types:
- "problem" — Opening problem that drives the chapter. Mandatory first or second section.
- "motivation" — Why this topic matters. Can be used instead of problem for exploratory topics.
- "intuition" — Visual/geometric explanation before formalism. Use analogies.
- "definition" — Formal definition with examples. Always include commentary explaining WHY this definition.
- "theorem" — Statement + proof. Use ---proof--- to separate statement from proof, and ---step--- between proof steps for step-reveal.
- "example" — Worked examples applying definitions/theorems.
- "warning" — Common mistakes, misconceptions, counterexamples. Use sparingly.
- "approfondissement" — Optional deeper content (starred, collapsed by default). For advanced topics.
- "application" — Real-world or cross-domain applications.
- "exercise-inline" — In-flow practice exercise. Must include exercise object with statement, hint, solution.
- "recap" — End-of-chapter summary. Mandatory last section. List key definitions, theorems, and "you should now be able to..."
- "historique" — Historical context, key people and dates.
- "remark" — Side observations, edge cases.

## Content Format

- Use LaTeX: $inline$ and $$display$$
- Use [[term]] for glossary links to other concepts
- Use ::video[youtube-url] for video embeds
- Use ::desmos[expression] for interactive graphs (e.g., ::desmos[y=x^2])
- Use ---proof--- before proof content, ---step--- between steps
- Tables use standard markdown

## Exercise Types

- "computational": Concrete calculation. Needs answer field.
- "qcm": Multiple choice. Needs choices array with exactly 4 options, one correct.
- "proof": Prove a statement. Solution is the full proof.

## Quality Rules

1. Every chapter MUST start with a problem or motivation section
2. Every chapter MUST end with a recap section
3. Include at least 1 ::desmos[] or ::video[] embed
4. Include at least 1 exercise-inline in the lesson flow
5. All non-starred proofs must be complete
6. Each definition must have commentary explaining WHY
7. Produce at least 4 exercises with mixed types and difficulties (1-5)
8. Write in a clear, engaging style — like a great lecturer, not a dry textbook
9. All content must be ORIGINAL — write your own explanations, proofs, and exercises`;
}

export function buildUserPrompt(spec: GenerationSpec): string {
  const prereqList =
    spec.prerequisites.length > 0
      ? spec.prerequisites.map((p) => `- ${p.title} (${p.code})`).join("\n")
      : "None (this is a foundational topic)";

  const depList =
    spec.dependents.length > 0
      ? spec.dependents.map((d) => `- ${d.title}`).join("\n")
      : "None specified";

  const styleGuide = {
    "problem-concrete": `This is a CONCRETE problem-driven chapter. Start with a specific, tangible problem that motivates the theory (e.g., "Can we always find the area under a curve?" or "How do we solve this system of equations?"). Build theory as tools to solve it. Use ::desmos[] for visualizations. End by solving the opening problem.`,
    "problem-exploratory": `This is an EXPLORATORY problem-driven chapter. Start with a structural question (e.g., "What symmetries does a square have?" or "When are two structures 'the same'?"). Guide discovery through examples before formalizing. Use concrete algebraic examples (specific groups, rings, etc.).`,
    "visual-first": `This is a VISUAL-FIRST chapter. Start with geometric intuition — pictures, constructions, deformations. Use ::geogebra[] or ::desmos[] heavily. Formalize only after building visual understanding. Think: "show before you prove."`,
  };

  const bibInfo =
    spec.moduleBibliography.length > 0
      ? spec.moduleBibliography
          .map(
            (b) =>
              `- ${b.title} by ${b.author} (${b.role})${b.topicMap?.[spec.nodeCode] ? ` — covers: ${b.topicMap[spec.nodeCode]}` : ""}`
          )
          .join("\n")
      : "No specific textbook references";

  return `Generate a complete chapter for:

**Module**: ${spec.moduleTitle} (${spec.moduleCategory})
**Chapter**: ${spec.nodeTitle}
**Code**: ${spec.nodeCode}
**Description**: ${spec.nodeDescription}

**Prerequisites (students already know)**:
${prereqList}

**What builds on this chapter**:
${depList}

**Pedagogical style**:
${styleGuide[spec.domainStyle]}

**Scope reference (write original content covering these topics)**:
${bibInfo}

${spec.keyTheorems?.length ? `**Key theorems to cover**: ${spec.keyTheorems.join(", ")}` : ""}
${spec.keyDefinitions?.length ? `**Key definitions to cover**: ${spec.keyDefinitions.join(", ")}` : ""}
${spec.openingProblemHint ? `**Suggested opening problem**: ${spec.openingProblemHint}` : ""}

Write 8-14 sections following the chapter template. Include at least 4 exercises. Return ONLY valid JSON.`;
}
