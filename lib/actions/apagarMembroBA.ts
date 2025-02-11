"use server";

import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function apagarMembroBAAct(projeto_id: number, cpf: string) {
  await prisma.bancaAvaliadoraUniversidade.deleteMany({
    where: {
      projeto_id,
      cpf,
    },
  });

  await prisma.bancaAvaliadoraConvidada.deleteMany({
    where: {
      projeto_id,
      cpf,
    },
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: CPF ${cpf} apagado da banca avaliadora.`
  );
}
