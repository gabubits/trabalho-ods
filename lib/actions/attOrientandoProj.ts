"use server";

import { AlterarInfosOrientandoSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function attOrientandoProjAct(
  proj_or_id: number,
  data: z.infer<typeof AlterarInfosOrientandoSchema>
) {
  await prisma.projetoOrientando.update({
    where: {
      id: proj_or_id,
    },
    data,
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: PROJORIENTANDO ${proj_or_id} alterado.`
  );
  return {
    success: true,
    message: "Orientando editada com sucesso!",
  };
}
