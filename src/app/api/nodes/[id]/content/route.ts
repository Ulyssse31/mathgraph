import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const node = await prisma.conceptNode.findUnique({
    where: { id },
    include: {
      module: { select: { id: true, title: true, color: true } },
      lesson: true,
      exercises: { orderBy: { orderIndex: "asc" } },
      crossFrom: {
        include: {
          targetNode: {
            select: {
              id: true,
              title: true,
              module: { select: { id: true, title: true, color: true } },
            },
          },
        },
      },
      crossTo: {
        include: {
          sourceNode: {
            select: {
              id: true,
              title: true,
              module: { select: { id: true, title: true, color: true } },
            },
          },
        },
      },
    },
  });

  if (!node) {
    return NextResponse.json({ error: "Node not found" }, { status: 404 });
  }

  // Parse JSON fields
  const lesson = node.lesson
    ? {
        ...node.lesson,
        sections: JSON.parse(node.lesson.sections || "[]"),
      }
    : null;

  const exercises = node.exercises.map((ex) => ({
    ...ex,
    hints: JSON.parse(ex.hints || "[]"),
    choices: JSON.parse(ex.choices || "[]"),
  }));

  const crossEdges = [
    ...node.crossFrom.map((e) => ({
      id: e.id,
      depth: e.depth,
      label: e.label,
      description: e.description,
      direction: "outgoing" as const,
      foreignNode: e.targetNode,
    })),
    ...node.crossTo.map((e) => ({
      id: e.id,
      depth: e.depth,
      label: e.label,
      description: e.description,
      direction: "incoming" as const,
      foreignNode: e.sourceNode,
    })),
  ];

  return NextResponse.json({
    node: {
      id: node.id,
      title: node.title,
      code: node.code,
      description: node.description,
      status: node.status,
      xp: node.xp,
      moduleId: node.moduleId,
      module: node.module,
    },
    lesson,
    exercises,
    crossEdges,
  });
}
