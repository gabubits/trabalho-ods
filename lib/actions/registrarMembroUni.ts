"use server";
import { RegistrarMembroBAUniSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export type FormState = {
  message: string;
};

export async function registrarMembroUniAct(
  projeto_id: number,
  data: z.infer<typeof RegistrarMembroBAUniSchema>
) {
  await prisma.bancaAvaliadoraUniversidade.create({
    data: {
      cpf: data.cpf,
      projeto_id: projeto_id,
    },
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: Membro da Universidade CPF ${data.cpf} registrado na banca do projeto ${projeto_id}`
  );
  return {
    success: true,
    message: `Membro registrado!`,
  };
}
