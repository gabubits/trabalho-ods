import { verifySession } from "@/lib/session";
import prisma from "@/prisma/db";
import React from "react";
import { columns, Projeto, TabelaProjetosDash } from "./TabelaProjetosDash";

const DashboardOrientando = async () => {
  const session = await verifySession();

  const projetosID = await prisma.projetoOrientando.findMany({
    where: {
      orientando_cpf: session.usuario_cpf,
    },
    select: {
      projeto_id: true,
    },
  });

  const projetos: Projeto[] = [];

  for (const projID of projetosID) {
    const proj = await prisma.projeto.findMany({
      where: {
        id: projID.projeto_id,
      },
      include: {
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

    for (const p of proj) {
      projetos.push({
        ...p,
        orientador_nome: p.Orientador.UsuarioComum.nome,
        session_tipo: session.usuario_tipo,
      });
    }
  }

  return (
    <div className="flex justify-center items-center flex-col my-6">
      <div className="">
        <h1 className="font-bold text-4xl text-center">
          Gerenciamento de projetos
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4"></div>
        <div className=" max-h-fit max-w-fit rounded-md bg-white overflow-x-auto p-5">
          <TabelaProjetosDash columns={columns} data={projetos} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOrientando;
