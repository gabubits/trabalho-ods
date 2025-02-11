"use server";

import { EditarMensagemSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function attMensagemAct(
  mensagem_id: number,
  data: z.infer<typeof EditarMensagemSchema>
) {
  await prisma.mensagem.update({
    where: {
      id: mensagem_id,
    },
    data,
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: MENSAGEM ${mensagem_id} alterada.`
  );
  return {
    success: true,
    message: "Mensagem editada com sucesso!",
  };
}
