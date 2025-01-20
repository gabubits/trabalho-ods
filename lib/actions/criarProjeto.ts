"use server";
import { CriarProjetoSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { StatusProjeto } from "@prisma/client";

export type FormState = {
  message: string;
};

export async function criarProjetoAct(
  data: z.infer<typeof CriarProjetoSchema>
) {
  await prisma.projeto.create({
    data: {
      nome: data.nome,
      tipo: data.tipo,
      data_inicio: data.data_inicio,
      data_termino: data.data_termino,
      orientador_cpf: data.orientador_cpf,
      descricao: data.descricao,
      status: StatusProjeto.NAO_INICIADO,
    },
  });

  return {
    success: true,
    message: `Projeto "${data.nome}" criado com sucesso!`,
  };
}
