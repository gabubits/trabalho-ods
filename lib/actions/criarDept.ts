"use server";
import { CriarDeptSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";

export type FormState = {
  message: string;
};

export async function criarDeptAct(data: z.infer<typeof CriarDeptSchema>) {
  const deptExistente = await prisma.departamento.findFirst({
    where: {
      sigla_dept: data.sigla_dept,
    },
  });

  if (deptExistente) {
    return {
      success: false,
      message: "Esse departamento já existe!",
    };
  }

  await prisma.departamento.create({
    data: {
      sigla_dept: data.sigla_dept,
      nome: data.nome,
    },
  });

  return {
    success: true,
    message: `Dept (${data.sigla_dept}) ccriado com sucesso!`,
  };
}
