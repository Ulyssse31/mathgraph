import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const VALID_STATUSES = ["locked", "available", "in_progress", "practiced", "mastered"];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const node = await prisma.conceptNode.update({
    where: { id },
    data: { status: body.status, xp: body.xp },
  });

  return NextResponse.json(node);
}
