"use server";
import { RegistrarMembroBAConvSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { registrarHistorico } from "../registrarHistorico";

export type FormState = {
  message: string;
};

export async function registrarMembroConvAct(
  projeto_id: number,
  data: z.infer<typeof RegistrarMembroBAConvSchema>
) {
  await prisma.bancaAvaliadoraConvidada.create({
    data: {
      ...data,
      projeto_id,
    },
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: Membro convidado CPF ${data.cpf} - ${data.ies} registrado na banca do projeto ${projeto_id}`
  );
  return {
    success: true,
    message: `Membro registrado!`,
  };
}
