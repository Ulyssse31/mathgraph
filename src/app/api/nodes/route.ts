import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth, unauthorized, serverError } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const body = await req.json();
    if (!body.moduleId || !body.title) {
      return NextResponse.json(
        { error: "moduleId and title are required" },
        { status: 400 }
      );
    }

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
  } catch (err) {
    return serverError(err);
  }
}
