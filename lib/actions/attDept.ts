"use server";

import { AtualizarDeptSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export async function attDeptAct(data: z.infer<typeof AtualizarDeptSchema>) {
  const deptAlterado = await prisma.departamento.update({
    where: {
      sigla_dept: data.sigla_dept_antiga,
    },
    data: {
      sigla_dept: data.sigla_dept_nova,
      nome: data.nome,
    },
  });

  await prisma.pessoaDepartamento.updateMany({
    where: {
      sigla_dept: data.sigla_dept_antiga,
    },
    data: {
      sigla_dept: data.sigla_dept_nova,
    },
  });

  if (deptAlterado) {
    await registrarHistorico(
      `[Sucesso, Sistema]: DEPT ${data.sigla_dept_antiga} alterado.`
    );
    return {
      success: true,
      message: `${deptAlterado.nome} (${deptAlterado.sigla_dept}) alterado com sucesso!`,
    };
  }

  return {
    success: false,
    message: "Atualização falhou!",
  };
}
