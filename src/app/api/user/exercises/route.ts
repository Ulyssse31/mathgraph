import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status"); // "completed" or "in_progress"

  const where: any = { userId: session.user.id };
  if (status === "completed") {
    where.completed = true;
  } else if (status === "in_progress") {
    where.completed = false;
  }

  const attempts = await prisma.exerciseAttempt.findMany({
    where,
    include: {
      exercise: {
        select: {
          id: true,
          title: true,
          type: true,
          difficulty: true,
          nodeId: true,
          node: {
            select: {
              id: true,
              title: true,
              code: true,
              module: {
                select: { id: true, title: true, color: true },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Also get summary stats
  const totalCompleted = await prisma.exerciseAttempt.count({
    where: { userId: session.user.id, completed: true },
  });
  const totalXp = await prisma.userProgress.aggregate({
    where: { userId: session.user.id },
    _sum: { xp: true },
  });

  return NextResponse.json({
    attempts,
    stats: {
      totalCompleted,
      totalXp: totalXp._sum.xp ?? 0,
    },
  });
}
