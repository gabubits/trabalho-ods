"use server";

import { AtualizarTopicoSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function attTopicoAct(
  topico_id: number,
  data: z.infer<typeof AtualizarTopicoSchema>
) {
  await prisma.topico.update({
    where: {
      id: topico_id,
    },
    data,
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: TOPICO ${topico_id} atualizado`
  );
  return {
    success: true,
    message: "Tópico atualizado com sucesso!",
  };
}
