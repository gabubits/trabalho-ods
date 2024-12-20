"use server";

import { AtualizarPDeptSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";

export async function attPDeptAct(data: z.infer<typeof AtualizarPDeptSchema>) {
  const PDeptAlterado = await prisma.usuarioComum.update({
    where: {
      numero_cpf: data.numero_cpf,
    },
    data: {
      nome: data.nome,
      departamento: {
        update: {
          data: {
            nome_dept: data.nome_dept,
            sigla_dept: data.sigla_dept,
          },
        },
      },
    },
  });

  console.log(PDeptAlterado);

  if (PDeptAlterado) {
    return {
      success: true,
      message: `${PDeptAlterado.nome} (${PDeptAlterado.numero_cpf}) alterado com sucesso!`,
    };
  }

  return {
    success: false,
    message: "Atualização falhou!",
  };
}
