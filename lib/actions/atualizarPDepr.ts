"use server";
import { AtualizarPessoaDeptchema } from "./schemas";
import { z } from "zod";
import prisma from "@/prisma/db";


export type FormState = {
    message: string;
};

export async function AtualizarPDept(data: z.infer<typeof AtualizarPessoaDeptchema>) {

    const numero_cpf = data.numero_cpf;
    const nome = data.nome;
    const senha = data.senha;
    const nome_dept = data.nome_dept;
    const sigla_dept = data.sigla_dept;

    const pessoaAtualizada = await prisma.usuarioComum.update({

        where: { numero_cpf: numero_cpf },
        data: {
            nome: nome,
            numero_cpf: numero_cpf,
            senha: senha,

            departamento: {
                update: {
                    data: {
                        nome_dept,
                        sigla_dept,
                    }

                }
            },
        },
    });


    console.log(pessoaAtualizada);

    return {
        success: true,
        message: `PDept (${data.numero_cpf}) atualizado com sucesso!`,
    };
}
