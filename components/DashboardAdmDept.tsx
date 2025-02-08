import React from "react";
import prisma from "@/prisma/db";
import CriarPDept from "./CriarPDept";
import { PDeptTable, PDept, columnsPDept } from "./TabelaPDepts";
import { verifySession } from "@/lib/session";
import { columns, Projeto, TabelaProjetosDash } from "./TabelaProjetosDash";
import CriarProjeto from "./CriarProjeto";
import CriarOrientando from "./CriarOrientando";
import { POrient, POrientTable, columnsPOrient } from "./TabelaPOrients";

const DashboardAdmDept = async () => {
  const session = await verifySession();

  const departamento = await prisma.pessoaDepartamento.findFirst({
    where: {
      numero_cpf: session.usuario_cpf,
    },
    select: {
      Departamento: true,
    },
  });

  const pDeptDB = await prisma.pessoaDepartamento.findMany({
    where: {
      AND: [
        {
          NOT: {
            numero_cpf: session.usuario_cpf,
          },
        },
        {
          sigla_dept: departamento?.Departamento.sigla_dept,
        },
      ],
    },
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

  const pessoaDept = await prisma.pessoaDepartamento.findFirst({
    where: {
      numero_cpf: session.usuario_cpf,
    },
    select: {
      sigla_dept: true,
    },
  });

  let pOrientDB: any[] = [];

  if (pessoaDept) {
    pOrientDB = await prisma.orientando.findMany({
      where: {
        curso: pessoaDept.sigla_dept,
      },
      include: {
        UsuarioComum: true,
      },
    });
  }

  const pDepts: PDept[] = [];
  const projetos: Projeto[] = [];
  const pOrients: POrient[] = [];

  for (const pDept of pDeptDB) {
    pDepts.push({
      numero_cpf: pDept.numero_cpf,
      nome: pDept.UsuarioComum.nome,
      tipo: pDept.UsuarioComum.tipo,
      sigla_dept: pDept.sigla_dept,
    });

    const pDeptProjetos = await prisma.projeto.findMany({
      where: {
        orientador_cpf: pDept.numero_cpf,
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

    for (const proj of pDeptProjetos) {
      projetos.push({
        id: proj.id,
        nome_proj: proj.nome,
        tipo_proj: proj.tipo,
        orientador_nome: proj.Orientador.UsuarioComum.nome,
      });
    }

    for (const pOrientsData of pOrientDB) {
      pOrients.push({
        numero_cpf: pOrientsData.numero_cpf,
        nome: pOrientsData.UsuarioComum.nome,
        curso: pOrientsData.curso,
      });
    }
  }

  return (
    <div className="flex justify-center items-center flex-col my-6">
      <div>
        <h1 className="font-bold text-4xl text-center">
          Gerenciamento de Pessoas
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4">
          <CriarPDept
            departamentos={departamento ? [departamento.Departamento] : []}
          />
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
        <div className=" h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
          <TabelaProjetosDash columns={columns} data={projetos} />
        </div>
      </div>
      <div>
        <h1 className="font-bold text-4xl text-center">
          Gerenciamento de Orientandos
        </h1>
        <div className="flex justify-center items-center mt-4 gap-4">
          <CriarOrientando />
        </div>
        <div className="h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
          <POrientTable columns={columnsPOrient} data={pOrients} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DashboardAdmDept;
