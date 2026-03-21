import { prisma } from "@/lib/db";
import { auth, serverError } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: nodeId } = await params;

    const total = await prisma.exercise.count({ where: { nodeId } });

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ completed: 0, total });
    }

    const completed = await prisma.exerciseAttempt.count({
      where: {
        userId: session.user.id,
        completed: true,
        exercise: { nodeId },
      },
    });

    return NextResponse.json({ completed, total });
  } catch (err) {
    return serverError(err);
  }
}
