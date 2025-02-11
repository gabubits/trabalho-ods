"use server";
import { CriarPDeptSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

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
    await registrarHistorico(
      `[Falha, Sistema]: PDEPT ${data.numero_cpf} não foi criado - já existe`
    );
    return {
      success: false,
      message: "Essa pessoa já está cadastrada!",
    };
  }

  await prisma.usuarioComum.create({
    data: {
      numero_cpf: data.numero_cpf,
      nome: data.nome,
      senha: data.numero_cpf,
      tipo: data.tipo_pessoa,
      orientador: {
        create: {
          sigla_dept: data.sigla_dept,
        },
      },
    },
  });

  await registrarHistorico(
    `[Sucesso, Sistema]: PDEPT ${data.numero_cpf} criado.`
  );
  return {
    success: true,
    message: `PDept (${data.numero_cpf}) cadastrado com sucesso!`,
  };
}
