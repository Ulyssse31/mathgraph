import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const exercises = await prisma.exercise.findMany({
    where: { nodeId: id },
    orderBy: [{ orderIndex: "asc" }, { difficulty: "asc" }],
  });

  return NextResponse.json(
    exercises.map((ex) => ({
      ...ex,
      hints: JSON.parse(ex.hints || "[]"),
      choices: JSON.parse(ex.choices || "[]"),
    }))
  );
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

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
}
