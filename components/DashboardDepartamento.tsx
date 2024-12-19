import React from "react";
import CriarProjetoDashboard from "./CriarProjetoDashboard";
import ApagarProjetoDashboard from "./ApagarProjetoDashboard";
import AtualizarProjetoDashboard from "./AtualizarProjetoDashboard";
import { TPD, Projeto, columns } from "./TabelaProjetosDepartamento";
import prisma from "@/prisma/db";

const DashboardDepartamento = async () => {
  const projetosDB = await prisma.projeto.findMany({
    select: {
      id: true,
      nome: true,
      tipo: true,
      Orientador: {
        select: {
          usuarioComum: {
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
      id: proj.id,
      nome_proj: proj.nome,
      tipo_proj: proj.tipo,
      orientador_nome: proj.Orientador.usuarioComum.nome,
    });
  }

  return (
    <div className="flex justify-center items-center flex-col my-6">
      <div className="">
        <h1 className="font-bold text-4xl text-center">
          Gerenciamento de projetos
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4">
          <CriarProjetoDashboard />
          <ApagarProjetoDashboard />
          <AtualizarProjetoDashboard />
        </div>
        <div className=" h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
          <TPD columns={columns} data={projetos} />
        </div>
      </div>
      <div>
        <h1 className="font-bold text-4xl">Gerenciamento de Orientadores</h1>
        <div className="flex justify-center items-center gap-4">
          Botões de gerenciamento
        </div>
        <div>Tabela de Orientadores</div>
      </div>
      <div>
        <h1 className="font-bold text-4xl">Gerenciamento de Orientandos</h1>
        <div className="flex justify-center items-center gap-4">
          Botões de gerenciamento
        </div>
        <div>Tabela de Orientandos</div>
      </div>
      <div></div>
    </div>
  );
};

export default DashboardDepartamento;
