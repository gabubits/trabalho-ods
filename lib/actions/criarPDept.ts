"use server";
import { CriarPDeptSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";

export type FormState = {
  message: string;
};

export async function criarPDeptAct(data: z.infer<typeof CriarPDeptSchema>) {
  const PDectExistente = await prisma.usuarioComum.findFirst({
    where: {
      numero_cpf: data.numero_cpf,
    },
  });

  if (PDectExistente) {
    return {
      success: false,
      message: "Essa pessoa já está cadastrada!",
    };
  }

  await prisma.usuarioComum.create({
    data: {
      numero_cpf: data.numero_cpf,
      nome: data.nome,
      senha: data.senha,
      tipo: data.tipo_pessoa,
      orientador: {
        create: {
          sigla_dept: data.sigla_dept,
        },
      },
    },
  });

  return {
    success: true,
    message: `PDept (${data.numero_cpf}) cadastrado com sucesso!`,
  };
}
