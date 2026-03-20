import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      module: { select: { id: true, title: true, color: true } },
      requiredNodes: {
        include: {
          node: {
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

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...project,
    hints: JSON.parse(project.hints || "[]"),
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.statement !== undefined && { statement: body.statement }),
      ...(body.difficulty !== undefined && { difficulty: body.difficulty }),
      ...(body.hints !== undefined && {
        hints: JSON.stringify(body.hints),
      }),
      ...(body.solution !== undefined && { solution: body.solution }),
      ...(body.moduleId !== undefined && { moduleId: body.moduleId }),
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
