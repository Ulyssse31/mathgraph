import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth, unauthorized, serverError } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const { id } = await params;
    const body = await req.json();

    const exercise = await prisma.exercise.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.statement !== undefined && { statement: body.statement }),
        ...(body.difficulty !== undefined && { difficulty: body.difficulty }),
        ...(body.hints !== undefined && { hints: JSON.stringify(body.hints) }),
        ...(body.solution !== undefined && { solution: body.solution }),
        ...(body.answer !== undefined && { answer: body.answer }),
        ...(body.choices !== undefined && { choices: JSON.stringify(body.choices) }),
        ...(body.orderIndex !== undefined && { orderIndex: body.orderIndex }),
      },
    });

    return NextResponse.json(exercise);
  } catch (err) {
    return serverError(err);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const { id } = await params;
    await prisma.exercise.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return serverError(err);
  }
}
