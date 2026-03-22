export const maxDuration = 120;

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, serverError } from "@/lib/auth";
import { generateChapter } from "@/lib/generation/generate-chapter";
import { inferDomainStyle } from "@/lib/generation/types";
import type { GenerationSpec } from "@/lib/generation/types";

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { nodeId } = body;

    if (!nodeId) {
      return NextResponse.json(
        { error: "nodeId is required" },
        { status: 400 }
      );
    }

    // Fetch node with module and graph context
    const node = await prisma.conceptNode.findUnique({
      where: { id: nodeId },
      include: {
        module: true,
        inEdges: {
          where: { type: "prerequisite" },
          include: { source: { select: { id: true, title: true, code: true } } },
        },
        outEdges: {
          include: { target: { select: { id: true, title: true } } },
        },
      },
    });

    if (!node) {
      return NextResponse.json({ error: "Node not found" }, { status: 404 });
    }

    // Parse module bibliography
    let bibliography: GenerationSpec["moduleBibliography"] = [];
    try {
      if (node.module.bibliography) {
        bibliography = JSON.parse(node.module.bibliography);
      }
    } catch {
      // ignore parse errors
    }

    // Build generation spec
    const spec: GenerationSpec = {
      nodeId: node.id,
      nodeTitle: node.title,
      nodeDescription: node.description,
      nodeCode: node.code,
      moduleTitle: node.module.title,
      moduleCategory: node.module.category,
      moduleBibliography: bibliography,
      prerequisites: node.inEdges.map((e) => ({
        title: e.source.title,
        code: e.source.code,
      })),
      dependents: node.outEdges.map((e) => ({
        title: e.target.title,
      })),
      domainStyle: inferDomainStyle(node.module.category),
    };

    // Generate the chapter
    const { chapter, warnings } = await generateChapter(spec);

    // Save to database
    const existingLesson = await prisma.lesson.findUnique({
      where: { nodeId },
    });

    if (existingLesson) {
      await prisma.lesson.update({
        where: { nodeId },
        data: {
          sections: JSON.stringify(chapter.sections),
          metadata: JSON.stringify(chapter.metadata),
          status: "draft",
          version: existingLesson.version + 1,
        },
      });
    } else {
      await prisma.lesson.create({
        data: {
          nodeId,
          content: `${node.title} — generated chapter`,
          sections: JSON.stringify(chapter.sections),
          metadata: JSON.stringify(chapter.metadata),
          status: "draft",
        },
      });
    }

    // Save exercises (append to existing)
    if (chapter.exercises.length > 0) {
      const existingCount = await prisma.exercise.count({
        where: { nodeId },
      });

      await prisma.exercise.createMany({
        data: chapter.exercises.map((ex, i) => ({
          nodeId,
          title: ex.title,
          type: ex.type,
          statement: ex.statement,
          difficulty: ex.difficulty,
          hints: JSON.stringify(ex.hints),
          solution: ex.solution,
          answer: ex.answer || "",
          choices: ex.choices ? JSON.stringify(ex.choices) : "[]",
          orderIndex: existingCount + i,
        })),
      });
    }

    return NextResponse.json({
      success: true,
      nodeId,
      sectionCount: chapter.sections.length,
      exerciseCount: chapter.exercises.length,
      warnings,
      metadata: chapter.metadata,
    });
  } catch (err) {
    return serverError(err);
  }
}
