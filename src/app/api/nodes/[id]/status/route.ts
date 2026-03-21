import { prisma } from "@/lib/db";
import { auth, serverError } from "@/lib/auth";
import { NextResponse } from "next/server";

const VALID_STATUSES = ["locked", "available", "in_progress", "practiced", "mastered"];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: nodeId } = await params;
    const body = await req.json();

    if (body.status && !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const progress = await prisma.userProgress.upsert({
      where: { userId_nodeId: { userId: session.user.id, nodeId } },
      create: {
        userId: session.user.id,
        nodeId,
        status: body.status ?? "in_progress",
        xp: body.xp ?? 0,
      },
      update: {
        ...(body.status && { status: body.status }),
        ...(body.xp !== undefined && { xp: body.xp }),
      },
    });

    return NextResponse.json(progress);
  } catch (err) {
    return serverError(err);
  }
}
