"use server";

import { AtualizarProjetoSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function attProjetoAct(
  projeto_id: number,
  data: z.infer<typeof AtualizarProjetoSchema>
) {
  await prisma.projeto.update({
    where: {
      id: projeto_id,
    },
    data,
  });

  await registrarHistorico(
    `[Sucesso, Sistema]: PROJETO ${projeto_id} atualizado.`
  );
  return {
    success: true,
    message: "Projeto atualizado com sucesso!",
  };
}
