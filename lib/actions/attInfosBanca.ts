"use server";

import { AlterarInfosBancaSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function attInfosBancaAct(
  projeto_id: number,
  data: z.infer<typeof AlterarInfosBancaSchema>
) {
  await prisma.projeto.update({
    where: {
      id: projeto_id,
    },
    data,
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: Infos da banca de PROJETO ${projeto_id} alterado.`
  );
  return {
    success: true,
    message: "Informações atualizadas com sucesso!",
  };
}
