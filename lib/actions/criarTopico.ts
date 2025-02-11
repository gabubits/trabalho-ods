"use server";
import { CriarTopicoSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export type FormState = {
  message: string;
};

export async function criarTopicoAct(
  projeto_id: string,
  data: z.infer<typeof CriarTopicoSchema>
) {
  await prisma.topico.create({
    data: {
      projeto_id: Number(projeto_id),
      nome: data.nome,
      descricao: data.descricao,
      data_termino: data.data_termino,
      tipo: data.tipo,
    },
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: TOPICO "${data.nome}" criado no projeto ${projeto_id}`
  );
  return {
    success: true,
    message: `Topico "${data.nome}" criado com sucesso!`,
  };
}
