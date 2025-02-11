"use server";

import { AtualizarPOrientSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "@/lib/registrarHistorico";

export async function atualizar(data: z.infer<typeof AtualizarPOrientSchema>) {
  const cursoExiste = await prisma.departamento.findMany({
    where: {
      sigla_dept: data.curso,
    },
  });

  if (cursoExiste.length === 0) {
    await registrarHistorico(
      `[Falha, Sistema]: ORIENTANDO ${data.numero_cpf} não criado - curso não existe.`
    );
    return {
      success: false,
      message: `${data.curso} não existe!`,
    };
  }

  const POrientAlterado = await prisma.usuarioComum.update({
    where: {
      numero_cpf: data.numero_cpf,
    },
    data: {
      nome: data.nome,
      orientando: {
        update: {
          curso: data.curso,
        },
      },
    },
  });

  if (POrientAlterado) {
    return {
      success: true,
      message: `${POrientAlterado.nome} (${POrientAlterado.numero_cpf}) alterado com sucesso!`,
    };
  }

  await registrarHistorico(
    `[Sucesso, Sistema]: ORIENTANDO ${data.numero_cpf} atualizado.`
  );

  return {
    success: false,
    message: "Atualização falhou!",
  };
}
