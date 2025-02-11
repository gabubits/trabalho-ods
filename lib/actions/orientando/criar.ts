"use server";
import { CriarPOrientSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { TipoUsuario } from "@prisma/client";
import { registrarHistorico } from "@/lib/registrarHistorico";

export type FormState = {
  message: string;
};

export async function criar(data: z.infer<typeof CriarPOrientSchema>) {
  const POrientExistente = await prisma.usuarioComum.findFirst({
    where: {
      numero_cpf: data.numero_cpf,
    },
  });

  if (POrientExistente) {
    await registrarHistorico(
      `[Falha, Sistema]: ORIENTANDO ${data.numero_cpf} não criado - já existe.`
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
      tipo: TipoUsuario.ORIENTANDO,
      orientando: {
        create: {
          curso: data.curso,
        },
      },
    },
  });

  await registrarHistorico(
    `[Sucesso, Sistema]: ORIENTANDO ${data.numero_cpf} criado.`
  );
  return {
    success: true,
    message: `POrient (${data.numero_cpf}) cadastrado com sucesso!`,
  };
}
