import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const module = await prisma.mathModule.findUnique({
    where: { id },
    include: {
      nodes: { orderBy: { createdAt: "asc" } },
      edges: true,
    },
  });

  if (!module) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  // Get cross-module edges for nodes in this module
  const nodeIds = module.nodes.map((n) => n.id);
  const crossEdges = await prisma.crossModuleEdge.findMany({
    where: {
      OR: [
        { sourceNodeId: { in: nodeIds } },
        { targetNodeId: { in: nodeIds } },
      ],
    },
    include: {
      sourceNode: {
        select: {
          id: true,
          title: true,
          module: { select: { id: true, title: true, color: true } },
        },
      },
      targetNode: {
        select: {
          id: true,
          title: true,
          module: { select: { id: true, title: true, color: true } },
        },
      },
    },
  });

  return NextResponse.json({
    module,
    nodes: module.nodes,
    edges: module.edges,
    crossEdges,
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const module = await prisma.mathModule.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.author !== undefined && { author: body.author }),
      ...(body.color !== undefined && { color: body.color }),
      ...(body.icon !== undefined && { icon: body.icon }),
      ...(body.posX !== undefined && { posX: body.posX }),
      ...(body.posY !== undefined && { posY: body.posY }),
      ...(body.motivation !== undefined && { motivation: body.motivation }),
      ...(body.bibliography !== undefined && { bibliography: body.bibliography }),
    },
  });

  return NextResponse.json(module);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.mathModule.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
