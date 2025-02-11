"use server";

import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function apagarMensagemAct(mensagem_id: number) {
  await prisma.mensagem.delete({
    where: {
      id: mensagem_id,
    },
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: Mensagem ${mensagem_id} apagada.`
  );
}
