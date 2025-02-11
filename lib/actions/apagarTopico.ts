"use server";

import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function apagarTopicoAct(id: number) {
  await prisma.mensagem.deleteMany({
    where: {
      topico_id: id,
    },
  });

  await prisma.topico.delete({
    where: {
      id: id,
    },
  });

  await registrarHistorico(`[Sucesso, Projeto]: TOPICO ${id} apagado`);
}
