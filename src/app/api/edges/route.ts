import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const edge = await prisma.conceptEdge.create({
    data: {
      moduleId: body.moduleId,
      sourceId: body.sourceId,
      targetId: body.targetId,
      type: body.type || "prerequisite",
    },
  });
  return NextResponse.json(edge, { status: 201 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await prisma.conceptEdge.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
