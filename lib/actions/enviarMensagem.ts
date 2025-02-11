"use server";
import { EnviarMensagemSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";
import { verifySession } from "../session";
import { registrarHistorico } from "../registrarHistorico";

export type FormState = {
  message: string;
};

export async function enviarMensagemAct(
  topico_id: string,
  data: z.infer<typeof EnviarMensagemSchema>
) {
  const session = await verifySession();

  await prisma.mensagem.create({
    data: {
      topico_id: Number(topico_id),
      conteudo: data.conteudo,
      enviado_por_id: session.usuario_cpf,
      data_enviado: new Date(),
    },
  });

  await registrarHistorico(
    `[Sucesso, Projeto]: Mensagem enviada por CPF ${session.usuario_cpf} no tópico ${topico_id}`
  );
  return {
    success: true,
    message: "Mensagem enviada com sucesso!",
  };
}
