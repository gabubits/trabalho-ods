"use server";
import prisma from "@/prisma/db";

export const registrarHistorico = async (conteudo: string) => {
  await prisma.historicoSistema.create({
    data: {
      data: new Date(),
      conteudo: conteudo,
    },
  });
};
