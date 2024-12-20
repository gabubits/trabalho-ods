"use server";

import prisma from "@/prisma/db";

export async function apagarPDeptAct(numero_cpf: string) {
  await prisma.pessoaDepartamento.deleteMany({
    where: {
      numero_cpf: numero_cpf,
    },
  });

  await prisma.usuarioComum.deleteMany({
    where: {
      numero_cpf: numero_cpf,
    },
  });
}
