"use server";

import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function apagarOrientandoProjAct(proj_or_id: number) {
  await prisma.projetoOrientando.delete({
    where: {
      id: proj_or_id,
    },
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: Orientando ${proj_or_id} apagado de projeto`
  );
}
