"use server";

import prisma from "@/prisma/db";
import { apagarPDeptAct } from "./apagarPDept";
import { registrarHistorico } from "../registrarHistorico";

export async function apagarDeptAct(sigla_dept: string) {
  const pdepts = await prisma.pessoaDepartamento.findMany({
    where: {
      sigla_dept,
    },
    select: {
      numero_cpf: true,
    },
  });

  for (const { numero_cpf } of pdepts) {
    await apagarPDeptAct(numero_cpf);
  }

  await prisma.departamento.delete({
    where: {
      sigla_dept,
    },
  });

  await registrarHistorico(`[Sucesso, Sistema]: DEPT ${sigla_dept} apagado.`);
}
