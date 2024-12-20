import React from "react";
import CriarProjetoDashboard from "./CriarProjetoDashboard";
import ApagarProjetoDashboard from "./ApagarProjetoDashboard";
import AtualizarProjetoDashboard from "./AtualizarProjetoDashboard";
import { TPD, Projeto, columns } from "./TabelaProjetosDepartamento";
import prisma from "@/prisma/db";
import CriarPDept from "./CriarPDept";
import { PDeptTable, PDept, columnsPDept } from "./TabelaPDepts";
import { TipoUsuario } from "@prisma/client";

const DashboardDepartamento = async ({
  numero_cpf,
}: {
  numero_cpf: string;
}) => {
  function isAdmin(numero_cpf: string): boolean {
    if (numero_cpf === "99999999999") {
      return true;
    }
    return false;
  }

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

  const pDeptDB = await prisma.usuarioComum.findMany({
    where: {
      NOT: {
        numero_cpf: "99999999999",
      },
      tipo: TipoUsuario.DEPARTAMENTO,
    },
    include: {
      departamento: true,
    },
  });

  const pDepts: PDept[] = [];

  for (const pDept of pDeptDB) {
    pDepts.push({
      id: pDept.numero_cpf,
      nome: pDept.nome,
      nome_dept: pDept.departamento
        ? pDept.departamento.nome_dept
        : "Sem departamento",
      sigla_dept: pDept.departamento
        ? pDept.departamento.sigla_dept
        : "Sem sigla",
    });
  }

  const orientadores = await prisma.usuarioComum.findMany({
    where: {
      tipo: TipoUsuario.ORIENTADOR,
    },
    select: {
      numero_cpf: true,
      nome: true,
    },
  });

  return (
    <div className="flex justify-center items-center flex-col my-6">
      {isAdmin(numero_cpf) ? (
        <div>
          <h1 className="font-bold text-4xl text-center">
            Gerenciamento de Pessoas do Departamento
          </h1>
          <div className="flex justify-center items-center mt-4 gap-4">
            <CriarPDept />
          </div>
          <div className="h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
            <PDeptTable columns={columnsPDept} data={pDepts} />
          </div>
        </div>
      ) : null}
      <div className="">
        <h1 className="font-bold text-4xl text-center">
          Gerenciamento de projetos
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4">
          <CriarProjetoDashboard orientadores={orientadores}/>
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
