"use server";

import { AlterarSenhaSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function alterarSenhaAct(
  numero_cpf: string,
  data: z.infer<typeof AlterarSenhaSchema>
) {
  await prisma.usuarioComum.update({
    where: {
      numero_cpf,
    },
    data: {
      senha: data.senha,
    },
  });

  await registrarHistorico(
    `[Sucesso, Sistema]: CPF ${numero_cpf} alterou a senha.`
  );
  return {
    success: true,
    message: "Senha atualizada com sucesso!",
  };
}
