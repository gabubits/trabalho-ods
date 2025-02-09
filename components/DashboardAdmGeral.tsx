import React from "react";
import prisma from "@/prisma/db";
import CriarPDept from "./CriarPDept";
import { PDeptTable, PDept, columnsPDept } from "./TabelaPDepts";
import CriarDept from "./CriarDept";
import { columnsDept, DeptTable } from "./TabelaDepts";
import CriarProjeto from "./CriarProjeto";
import { columns, TabelaProjetosDash } from "./TabelaProjetosDash";

const DashboardAdmGeral = async () => {
  const departamentos = await prisma.departamento.findMany({});

  const pDeptDB = await prisma.pessoaDepartamento.findMany({
    select: {
      numero_cpf: true,
      sigla_dept: true,
      UsuarioComum: {
        select: {
          nome: true,
          tipo: true,
        },
      },
    },
  });

  const pDepts: PDept[] = [];

  for (const pDept of pDeptDB) {
    pDepts.push({
      numero_cpf: pDept.numero_cpf,
      nome: pDept.UsuarioComum.nome,
      tipo: pDept.UsuarioComum.tipo,
      sigla_dept: pDept.sigla_dept,
    });
  }

  const projetos = await prisma.projeto.findMany({
    select: {
      id: true,
      nome: true,
      tipo: true,
      data_inicio: true,
      data_termino: true,
      descricao: true,
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
      <div>
        <h1 className="font-bold text-4xl text-center" id="ger_departamentos">
          Gerenciamento de Departamentos
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4">
          <CriarDept />
        </div>
        <div className="h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
          <DeptTable columns={columnsDept} data={departamentos} />
        </div>
      </div>
      <div>
        <h1 className="font-bold text-4xl text-center">
          Gerenciamento de Pessoas
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4">
          <CriarPDept departamentos={departamentos} />
        </div>
        <div className="h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
          <PDeptTable columns={columnsPDept} data={pDepts} />
        </div>
      </div>
      <div className="">
        <h1 className="font-bold text-4xl text-center">
          Gerenciamento de projetos
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4">
          <CriarProjeto
            orientadores={pDepts.map(({ numero_cpf, nome }) => ({
              numero_cpf,
              nome,
            }))}
          />
        </div>
        <div className=" max-h-fit max-w-fit rounded-md bg-white overflow-x-auto p-5">
          <TabelaProjetosDash
            columns={columns}
            data={projetos.map((value) => ({
              id: value.id,
              nome: value.nome,
              tipo: value.tipo,
              orientador_nome: value.Orientador.UsuarioComum.nome,
              data_inicio: value.data_inicio,
              data_termino: value.data_termino,
              descricao: value.descricao,
            }))}
          />
        </div>
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

export default DashboardAdmGeral;
