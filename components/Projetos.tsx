import React from "react";
import prisma from "@/prisma/db";
import { columns, Projeto, TabelaProjetosHome } from "./TabelaProjetosHome";

const Projetos = async () => {
  const projetosDB = await prisma.projeto.findMany({
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

  const projetos: Projeto[] = [];
  for (const proj of projetosDB) {
    projetos.push({
      id_proj: proj.id,
      nome_proj: proj.nome,
      tipo_proj: proj.tipo,
      orientador_nome: proj.Orientador.UsuarioComum.nome,
    });
  }

  return (
    <div className="bg-zinc-900 w-screen flex justify-center items-center flex-col">
      <h1
        className="text-white font-bold text-4xl text-center pt-5"
        id="projetos"
      >
        Projetos
      </h1>
      <div className="my-10 flex justify-center">
        <div className=" h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
          <TabelaProjetosHome columns={columns} data={projetos} />
        </div>
      </div>
    </div>
  );
};

export default Projetos;
