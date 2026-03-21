import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth, unauthorized, serverError } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const body = await req.json();
    if (!body.moduleId || !body.sourceId || !body.targetId) {
      return NextResponse.json(
        { error: "moduleId, sourceId, and targetId are required" },
        { status: 400 }
      );
    }

    const edge = await prisma.conceptEdge.create({
      data: {
        moduleId: body.moduleId,
        sourceId: body.sourceId,
        targetId: body.targetId,
        type: body.type || "prerequisite",
      },
    });
    return NextResponse.json(edge, { status: 201 });
  } catch (err) {
    return serverError(err);
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await prisma.conceptEdge.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return serverError(err);
  }
}
