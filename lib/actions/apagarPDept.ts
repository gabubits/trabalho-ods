"use server";

import prisma from "@/prisma/db";
import { apagarProjetoAct } from "./apagarProjeto";
import { registrarHistorico } from "../registrarHistorico";

export async function apagarPDeptAct(numero_cpf: string) {
  const projetos = await prisma.projeto.findMany({
    where: {
      orientador_cpf: numero_cpf,
    },
    select: {
      id: true,
    },
  });

  for (const { id } of projetos) {
    await apagarProjetoAct(id);
  }

  const bancas = await prisma.bancaAvaliadoraUniversidade.findMany({
    where: {
      cpf: numero_cpf,
    },
    select: {
      id: true,
    },
  });

  for (const { id } of bancas) {
    await prisma.bancaAvaliadoraConvidada.delete({
      where: {
        id,
      },
    });
  }

  await prisma.pessoaDepartamento.delete({
    where: {
      numero_cpf: numero_cpf,
    },
  });

  await prisma.usuarioComum.delete({
    where: {
      numero_cpf: numero_cpf,
    },
  });

  await registrarHistorico(
    `[Sucesso, Sistema]: PDEPT CPF ${numero_cpf} apagado.`
  );
}
