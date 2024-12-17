"use server";

import { z } from "zod";
import prisma from "@/prisma/db";
import { createSession, deleteSession } from "@/lib/session";

const loginSchema = z.object({
  cpf: z
    .string()
    .length(11, {
      message: "O CPF deve ter 11 caracteres",
    })
    .trim(),
  senha: z
    .string()
    .min(8, {
      message: "A senha deve ser de no mínimo 8 caracteres",
    })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse({
    cpf: formData.get("cpf"),
    senha: formData.get("senha"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { cpf, senha } = result.data;

  const usuario = await prisma.usuarioComum.findMany({
    where: {
      AND: [
        {
          numero_cpf: cpf,
        },
        {
          senha: senha,
        },
      ],
    },
  });

  if (usuario.length === 0) {
    return {
      errors: {
        senha: ["O CPF ou a senha estão inválidos!"],
      },
    };
  }

  await createSession(usuario[0].numero_cpf);
}

export async function logout() {
  await deleteSession();
}
