"use server";

import { AtualizarPOrientSchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";

export async function atualizar(data: z.infer<typeof AtualizarPOrientSchema>) {
    const POrientAlterado = await prisma.usuarioComum.update({
        where: {
            numero_cpf: data.numero_cpf,
        },
        data: {
            nome: data.nome,
            orientando: {
                update: {
                    curso: data.curso,
                },
            },
        },
    });

    console.log(POrientAlterado);

    if (POrientAlterado) {
        return {
            success: true,
            message: `${POrientAlterado.nome} (${POrientAlterado.numero_cpf}) alterado com sucesso!`,
        };
    }

    return {
        success: false,
        message: "Atualização falhou!",
    };
}
