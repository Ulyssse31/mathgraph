import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const node = await prisma.conceptNode.create({
    data: {
      moduleId: body.moduleId,
      title: body.title,
      description: body.description || "",
      status: body.status || "locked",
      xp: body.xp || 0,
      posX: body.posX || 0,
      posY: body.posY || 0,
    },
  });
  return NextResponse.json(node, { status: 201 });
}
