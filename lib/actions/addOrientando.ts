"use server";

import { AdicionarOrientandoSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { SituacaoOrientando } from "@prisma/client";
import { registrarHistorico } from "../registrarHistorico";

export async function addOrientandoAct(
  projeto_id: number,
  data: z.infer<typeof AdicionarOrientandoSchema>
) {
  const orientandoNoProj = await prisma.projetoOrientando.findFirst({
    where: { projeto_id, orientando_cpf: data.orientando_cpf },
  });

  if (orientandoNoProj !== null) {
    await registrarHistorico(
      `[Falha, Projeto]: adicionar orientando (${data.orientando_cpf}) ao projeto ${projeto_id}`
    );
    return {
      success: false,
      message: "Orientando já está no projeto!",
    };
  }

  const orientandoExiste = await prisma.orientando.findFirst({
    where: {
      numero_cpf: data.orientando_cpf,
    },
  });

  if (orientandoExiste === null) {
    await registrarHistorico(
      `[Falha, Projeto]: adicionar orientando (${data.orientando_cpf}) ao projeto ${projeto_id}`
    );
    return {
      success: false,
      message: "Esse orientando não existe!",
    };
  }

  await prisma.projetoOrientando.create({
    data: {
      ...data,
      projeto_id,
      situacao: SituacaoOrientando.ORIENTANDO,
    },
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: adicionar orientando (${data.orientando_cpf}) ao projeto ${projeto_id}`
  );
  return {
    success: true,
    message: "Orientando adicionado com sucesso!",
  };
}
