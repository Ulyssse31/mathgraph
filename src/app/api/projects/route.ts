import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany({
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
    orderBy: { createdAt: "asc" },
  });

  const parsed = projects.map((p) => ({
    ...p,
    hints: JSON.parse(p.hints || "[]"),
  }));

  return NextResponse.json(parsed);
}

export async function POST(req: Request) {
  const body = await req.json();
  const project = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description || "",
      statement: body.statement || "",
      difficulty: body.difficulty || 4,
      hints: JSON.stringify(body.hints || []),
      solution: body.solution || "",
      moduleId: body.moduleId || null,
    },
  });
  return NextResponse.json(project, { status: 201 });
}
