import prisma from "../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



export async function GET(req: NextRequest) {


    const pessoaDepartamento = await prisma.pessoaDepartamento.findMany({
        select: {
            numero_cpf: true,
        },
    });

    return NextResponse.json(pessoaDepartamento);

}


export async function PUT(req: NextRequest) {

    try {

        const values = await req.json();


        if (!values || !values.numero_cpf || !values.nome || !values.senha || !values.nome_dept || !values.sigla_dept) {
            return NextResponse.json(
                { message: "Dados incompletos ou inválidos." },
                { status: 400 }
            );
        }


        const { numero_cpf, nome, senha, nome_dept, sigla_dept } = values;

        // console.log("Valores recebidos:", values);

        const usuarioAtualizado = await prisma.usuarioComum.update({
            where: { numero_cpf },
            data: {
                nome: String(nome),
                numero_cpf: String(numero_cpf),
                senha: String(senha),

                departamento: {
                    update: {
                        data: {
                            nome_dept: String(nome_dept),
                            sigla_dept: String(sigla_dept),
                        }
                    }
                },
            },
        });


        return NextResponse.json({ usuarioAtualizado });

    } catch (error) {



        return NextResponse.json({ message: error });
    }
}
