"use server";

import { AtualizarPDeptSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function attPDeptAct(data: z.infer<typeof AtualizarPDeptSchema>) {
  const deptExiste = await prisma.departamento.findMany({
    where: {
      sigla_dept: data.sigla_dept,
    },
  });

  if (deptExiste.length === 0) {
    await registrarHistorico(
      `[Falha, Sistema]: PDEPT ${data.numero_cpf} não atualizou`
    );
    return {
      success: false,
      message: `${data.sigla_dept} não existe!`,
    };
  }

  const usuarioAlterado = await prisma.usuarioComum.update({
    where: {
      numero_cpf: data.numero_cpf,
    },
    data: {
      nome: data.nome,
      tipo: data.tipo_pessoa,
    },
  });

  const pDeptAlterado = await prisma.pessoaDepartamento.update({
    where: {
      numero_cpf: data.numero_cpf,
    },
    data: {
      sigla_dept: data.sigla_dept,
    },
  });

  await registrarHistorico(
    `[Sucesso, Sistema]: PDEPT ${data.numero_cpf} atualizado`
  );
  if (pDeptAlterado) {
    return {
      success: true,
      message: `${usuarioAlterado.nome} (${pDeptAlterado.numero_cpf}) alterado com sucesso!`,
    };
  }

  return {
    success: false,
    message: "Atualização falhou!",
  };
}
