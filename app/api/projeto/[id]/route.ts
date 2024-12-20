import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CriarProjetoSchema } from "@/components/CriarProjetoDashboard";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (id === "all") {
    const todosOsProjetos = await prisma.projeto.findMany();

    return NextResponse.json(todosOsProjetos);
  }

  return NextResponse.json([]);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (id === "criar") {
    const novoProjeto: z.infer<typeof CriarProjetoSchema> = await req.json();

    const criado = await prisma.projeto.create({
      data: novoProjeto,
    });

    return NextResponse.json(criado);
  }

  return NextResponse.json([]);
}
