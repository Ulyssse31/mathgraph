import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth, unauthorized, serverError } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const { id } = await params;
    const body = await req.json();

    const lesson = await prisma.lesson.upsert({
      where: { nodeId: id },
      update: {
        content: body.content || "",
        sections: JSON.stringify(body.sections || []),
      },
      create: {
        nodeId: id,
        content: body.content || "",
        sections: JSON.stringify(body.sections || []),
      },
    });

    return NextResponse.json(lesson);
  } catch (err) {
    return serverError(err);
  }
}
