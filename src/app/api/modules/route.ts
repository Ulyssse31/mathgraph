import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth, unauthorized, serverError } from "@/lib/auth";

export async function GET() {
  try {
    const modules = await prisma.mathModule.findMany({
      include: {
        _count: { select: { nodes: true } },
        nodes: { select: { id: true, title: true, code: true }, orderBy: { code: "asc" } },
      },
      orderBy: { createdAt: "asc" },
    });
    const moduleEdges = await prisma.moduleEdge.findMany();
    return NextResponse.json({ modules, moduleEdges });
  } catch (err) {
    return serverError(err);
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    if (!session) return unauthorized();

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const module = await prisma.mathModule.create({
      data: {
        title: body.title,
        description: body.description || "",
        author: body.author || "MathGraph Team",
        color: body.color || "#6366f1",
        icon: body.icon || "book",
        posX: body.posX || 0,
        posY: body.posY || 0,
      },
    });
    return NextResponse.json(module, { status: 201 });
  } catch (err) {
    return serverError(err);
  }
}
