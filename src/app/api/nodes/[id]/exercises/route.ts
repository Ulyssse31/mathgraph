import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth, unauthorized, serverError } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const exercises = await prisma.exercise.findMany({
      where: { nodeId: id },
      orderBy: [{ orderIndex: "asc" }, { difficulty: "asc" }],
    });

    return NextResponse.json(
      exercises.map((ex) => {
        let hints: unknown[] = [];
        let choices: unknown[] = [];
        try { hints = JSON.parse(ex.hints || "[]"); } catch { /* empty */ }
        try { choices = JSON.parse(ex.choices || "[]"); } catch { /* empty */ }
        return { ...ex, hints, choices };
      })
    );
  } catch (err) {
    return serverError(err);
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const { id } = await params;
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const exercise = await prisma.exercise.create({
      data: {
        nodeId: id,
        title: body.title,
        type: body.type || "computational",
        statement: body.statement || "",
        difficulty: body.difficulty || 1,
        hints: JSON.stringify(body.hints || []),
        solution: body.solution || "",
        answer: body.answer || "",
        choices: JSON.stringify(body.choices || []),
        orderIndex: body.orderIndex || 0,
      },
    });

    return NextResponse.json(exercise, { status: 201 });
  } catch (err) {
    return serverError(err);
  }
}
