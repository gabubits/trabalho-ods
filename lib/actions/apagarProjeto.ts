"use server";

import prisma from "@/prisma/db";
import { apagarTopicoAct } from "./apagarTopico";
import { registrarHistorico } from "../registrarHistorico";

export async function apagarProjetoAct(id: number) {
  await prisma.projetoOrientando.deleteMany({
    where: {
      projeto_id: id,
    },
  });

  await prisma.bancaAvaliadoraUniversidade.deleteMany({
    where: {
      projeto_id: id,
    },
  });

  await prisma.bancaAvaliadoraConvidada.deleteMany({
    where: {
      projeto_id: id,
    },
  });

  await prisma.solicitacaoAlteracao.deleteMany({
    where: {
      projeto_id: id,
    },
  });

  const topicos = await prisma.topico.findMany({
    where: {
      projeto_id: id,
    },
    select: {
      id: true,
    },
  });

  for (const topico of topicos) {
    await apagarTopicoAct(topico.id);
  }

  await prisma.projeto.delete({
    where: {
      id: id,
    },
  });

  await registrarHistorico(`[Sucesso, Sistema]: PROJETO ${id} apagado.`);
}
