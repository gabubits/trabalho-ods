import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import { TipoUsuario } from "@prisma/client";

export async function GET() {
  const orientadores = await prisma.usuarioComum.findMany({
    where: {
      tipo: TipoUsuario.ORIENTADOR,
    },
    select: {
      numero_cpf: true,
      nome: true,
    },
  });

  return NextResponse.json(orientadores);
}
