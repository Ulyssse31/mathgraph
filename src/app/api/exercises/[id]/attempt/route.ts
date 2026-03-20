import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: exerciseId } = await params;
  const body = await req.json();

  // Upsert the exercise attempt
  const attempt = await prisma.exerciseAttempt.upsert({
    where: {
      userId_exerciseId: {
        userId: session.user.id,
        exerciseId,
      },
    },
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

  // Also update UserProgress for the node
  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
    select: { nodeId: true },
  });

  if (exercise) {
    const existing = await prisma.userProgress.findUnique({
      where: {
        userId_nodeId: {
          userId: session.user.id,
          nodeId: exercise.nodeId,
        },
      },
    });

    // If no progress exists, create with in_progress status
    if (!existing) {
      await prisma.userProgress.create({
        data: {
          userId: session.user.id,
          nodeId: exercise.nodeId,
          status: "in_progress",
          xp: body.score ?? 0,
        },
      });
    } else {
      // Update XP, and if completed check if all exercises for this node are done
      const newXp = existing.xp + (body.score ?? 0);
      let newStatus = existing.status;

      if (body.completed) {
        // Check if all exercises for this node are completed
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
        } else if (existing.status === "available" || existing.status === "locked") {
          newStatus = "in_progress";
        }
      }

      await prisma.userProgress.update({
        where: {
          userId_nodeId: {
            userId: session.user.id,
            nodeId: exercise.nodeId,
          },
        },
        data: { xp: newXp, status: newStatus },
      });
    }
  }

  return NextResponse.json(attempt);
}
