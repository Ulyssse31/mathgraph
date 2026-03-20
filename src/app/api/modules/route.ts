import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const modules = await prisma.mathModule.findMany({
    include: {
      _count: { select: { nodes: true } },
      nodes: { select: { id: true, title: true, code: true }, orderBy: { code: "asc" } },
    },
    orderBy: { createdAt: "asc" },
  });
  const moduleEdges = await prisma.moduleEdge.findMany();
  return NextResponse.json({ modules, moduleEdges });
}

export async function POST(req: Request) {
  const body = await req.json();
  const module = await prisma.mathModule.create({
    data: {
      title: body.title,
      description: body.description || "",
      author: body.author || "Unknown",
      color: body.color || "#6366f1",
      icon: body.icon || "book",
      posX: body.posX || 0,
      posY: body.posY || 0,
    },
  });
  return NextResponse.json(module, { status: 201 });
}
