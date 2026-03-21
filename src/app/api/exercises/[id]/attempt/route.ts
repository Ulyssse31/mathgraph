import { prisma } from "@/lib/db";
import { auth, serverError } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: exerciseId } = await params;
    const body = await req.json();

    // Read old state before upserting (to detect new completions)
    const existing = await prisma.exerciseAttempt.findUnique({
      where: { userId_exerciseId: { userId: session.user.id, exerciseId } },
      select: { completed: true },
    });
    const isNewCompletion = body.completed && !existing?.completed;

    // Upsert the exercise attempt
    const attempt = await prisma.exerciseAttempt.upsert({
      where: { userId_exerciseId: { userId: session.user.id, exerciseId } },
      create: {
        userId: session.user.id,
        exerciseId,
        completed: body.completed ?? false,
        hintsUsed: body.hintsUsed ?? 0,
        score: body.score ?? 0,
      },
      update: {
        completed: body.completed ?? false,
        hintsUsed: body.hintsUsed ?? 0,
        score: body.score ?? 0,
      },
    });

    // Update UserProgress for the node
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
      select: { nodeId: true },
    });

    if (exercise) {
      const userProgress = await prisma.userProgress.findUnique({
        where: { userId_nodeId: { userId: session.user.id, nodeId: exercise.nodeId } },
      });

      if (!userProgress) {
        await prisma.userProgress.create({
          data: {
            userId: session.user.id,
            nodeId: exercise.nodeId,
            status: "in_progress",
            xp: isNewCompletion ? (body.score ?? 0) : 0,
          },
        });
      } else {
        const xpDelta = isNewCompletion ? (body.score ?? 0) : 0;
        let newStatus = userProgress.status;

        if (body.completed) {
          const nodeExercises = await prisma.exercise.findMany({
            where: { nodeId: exercise.nodeId },
            select: { id: true },
          });
          const completedAttempts = await prisma.exerciseAttempt.findMany({
            where: {
              userId: session.user.id,
              exerciseId: { in: nodeExercises.map((e) => e.id) },
              completed: true,
            },
          });
          if (completedAttempts.length >= nodeExercises.length) {
            newStatus = "practiced";
          } else if (userProgress.status === "available" || userProgress.status === "locked") {
            newStatus = "in_progress";
          }
        }

        await prisma.userProgress.update({
          where: { userId_nodeId: { userId: session.user.id, nodeId: exercise.nodeId } },
          data: { xp: userProgress.xp + xpDelta, status: newStatus },
        });
      }
    }

    return NextResponse.json(attempt);
  } catch (err) {
    return serverError(err);
  }
}
