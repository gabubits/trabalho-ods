"use server";

import { registrarHistorico } from "@/lib/registrarHistorico";
import prisma from "@/prisma/db";

export async function apagar(numero_cpf: string) {
  await prisma.projetoOrientando.deleteMany({
    where: {
      orientando_cpf: numero_cpf,
    },
  });

  await prisma.orientando.deleteMany({
    where: {
      numero_cpf: numero_cpf,
    },
  });

  await prisma.usuarioComum.deleteMany({
    where: {
      numero_cpf: numero_cpf,
    },
  });

  await registrarHistorico(
    `[Sucesso, Sistema]: ORIENTANDO CPF ${numero_cpf} apagado.`
  );
}
