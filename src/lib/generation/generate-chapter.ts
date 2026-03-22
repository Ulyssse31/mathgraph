import Anthropic from "@anthropic-ai/sdk";
import type { GenerationSpec, GeneratedChapter } from "./types";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";
import { validateChapter } from "./validate-chapter";

const MODEL = "claude-sonnet-4-20250514";

export async function generateChapter(
  spec: GenerationSpec
): Promise<{ chapter: GeneratedChapter; warnings: string[] }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    system: buildSystemPrompt(),
    messages: [
      {
        role: "user",
        content: buildUserPrompt(spec),
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  // Extract JSON from response (may be wrapped in ```json ... ```)
  let jsonStr = textBlock.text.trim();
  const jsonMatch = jsonStr.match(/```json\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  let parsed: { sections: unknown[]; exercises: unknown[] };
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error(
      `Failed to parse JSON response: ${jsonStr.substring(0, 200)}...`
    );
  }

  const chapter: GeneratedChapter = {
    sections: parsed.sections as GeneratedChapter["sections"],
    exercises: parsed.exercises as GeneratedChapter["exercises"],
    metadata: {
      generatedAt: new Date().toISOString(),
      model: MODEL,
      version: 1,
      reviewStatus: "draft",
    },
  };

  const warnings = validateChapter(chapter);

  return { chapter, warnings };
}
