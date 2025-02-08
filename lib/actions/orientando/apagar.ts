"use server";

import prisma from "@/prisma/db";

export async function apagar(numero_cpf: string) {
    await prisma.orientando.deleteMany({
        where: {
            numero_cpf: numero_cpf,
        },
    });

    await prisma.usuarioComum.deleteMany({
        where: {
            numero_cpf: numero_cpf,
        },
    });
}
