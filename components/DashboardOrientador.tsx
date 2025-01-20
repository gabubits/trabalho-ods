import { verifySession } from "@/lib/session";
import prisma from "@/prisma/db";
import React from "react";
import { columns, TabelaProjetosDash } from "./TabelaProjetosDash";

const DashboardOrientador = async () => {
  const session = await verifySession();

  const projetos = await prisma.projeto.findMany({
    where: {
      orientador_cpf: session.usuario_cpf,
    },
    select: {
      id: true,
      nome: true,
      tipo: true,
      Orientador: {
        select: {
          UsuarioComum: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex justify-center items-center flex-col my-6">
      <div className="">
        <h1 className="font-bold text-4xl text-center">
          Gerenciamento de projetos
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4"></div>
        <div className=" h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
          <TabelaProjetosDash
            columns={columns}
            data={projetos.map((value) => ({
              id: value.id,
              nome_proj: value.nome,
              tipo_proj: value.tipo,
              orientador_nome: value.Orientador.UsuarioComum.nome,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardOrientador;
