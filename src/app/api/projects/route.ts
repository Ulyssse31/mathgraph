import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth, unauthorized, serverError } from "@/lib/auth";

export async function GET() {
  try {
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

    const parsed = projects.map((p) => {
      let hints: unknown[] = [];
      try { hints = JSON.parse(p.hints || "[]"); } catch { /* empty */ }
      return { ...p, hints };
    });

    return NextResponse.json(parsed);
  } catch (err) {
    return serverError(err);
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

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
  } catch (err) {
    return serverError(err);
  }
}
