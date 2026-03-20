import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
}
