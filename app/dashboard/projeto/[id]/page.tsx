import React from "react";
import prisma from "@/prisma/db";
import { format } from "date-fns";
import { StatusProjeto } from "@prisma/client";
import { TipoUsuario } from "@prisma/client";
import ObterCertificadoButton from "@/components/ObterCertificadoButton";
import RegistrarMembroBAUni from "@/components/RegistrarMembroBAUni";
import RegistrarMembroBAConv from "@/components/RegistrarMembroBAConv";
import { columnsMembroBA, MembroBATable } from "@/components/TabelaMembrosBA";
import AlterarInfosBanca from "@/components/AlterarInfosBanca";
import AdicionarOrientando from "@/components/AdicionarOrientando";
import {
  columnsOrientandosProj,
  OrientandosProjTable,
} from "@/components/TabelaOrientandosProj";
import { verifySession } from "@/lib/session";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await verifySession();

  const projeto = await prisma.projeto.findFirstOrThrow({
    where: {
      id: Number(id),
    },
  });

  if (new Date() > projeto.data_inicio) {
    await prisma.projeto.update({
      where: {
        id: Number(id),
      },
      data: {
        status: StatusProjeto.EM_ANDAMENTO,
      },
    });
  }

  const nome_orientador = await prisma.usuarioComum.findFirst({
    where: {
      numero_cpf: projeto.orientador_cpf,
    },
    select: {
      nome: true,
    },
  });

  const statusRender = (status: string | null) => {
    if (status === StatusProjeto.NAO_INICIADO) {
      return "Não iniciado";
    }

    if (status === StatusProjeto.CONCLUIDO) {
      return "Concluído";
    }

    if (status === StatusProjeto.EM_ANDAMENTO) {
      return "Em andamento";
    }

    return "Indefinido";
  };

  const usuarios = await prisma.usuarioComum.findMany({
    where: {
      OR: [
        {
          tipo: TipoUsuario.ADM_DEPT,
        },
        { tipo: TipoUsuario.ORIENTADOR },
      ],
    },
    select: {
      nome: true,
      numero_cpf: true,
    },
  });

  const pdepts: { nome: string; numero_cpf: string; sigla_dept: string }[] = [];

  for (const u of usuarios) {
    const sigla_dept = await prisma.pessoaDepartamento.findFirst({
      where: {
        numero_cpf: u.numero_cpf,
      },
      select: {
        sigla_dept: true,
      },
    });

    if (sigla_dept) pdepts.push({ ...u, sigla_dept: sigla_dept.sigla_dept });
  }

  const membrosBA: {
    nome: string;
    ies: string;
    cpf: string;
    projeto_id: number;
  }[] = [];

  const bancaUniCpfs = await prisma.bancaAvaliadoraUniversidade.findMany({
    where: {
      projeto_id: Number(id),
    },
    select: {
      cpf: true,
    },
  });

  for (const { cpf } of bancaUniCpfs) {
    const { nome } = await prisma.usuarioComum.findFirstOrThrow({
      where: {
        numero_cpf: cpf,
      },
      select: {
        nome: true,
      },
    });

    const { sigla_dept } = await prisma.pessoaDepartamento.findFirstOrThrow({
      where: {
        numero_cpf: cpf,
      },
      select: {
        sigla_dept: true,
      },
    });

    membrosBA.push({
      nome,
      ies: `${sigla_dept}/UFGJW`,
      cpf,
      projeto_id: Number(id),
    });
  }

  const membrosBAConv = await prisma.bancaAvaliadoraConvidada.findMany({
    where: {
      projeto_id: Number(id),
    },
  });

  membrosBAConv.map((values) => {
    membrosBA.push({ ...values });
  });

  const orientandos_proj = await prisma.projetoOrientando.findMany({
    where: {
      projeto_id: projeto.id,
    },
    include: {
      Orientando: {
        include: {
          UsuarioComum: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex justify-between m-8">
        <h1 className="font-bold text-4xl text-center">
          Informações do projeto
        </h1>
        <div className="flex flex-row gap-5">
          <ObterCertificadoButton
            status={projeto.status}
            link_certificado={projeto.link_certificado}
          />
          {session.usuario_tipo !== TipoUsuario.ORIENTANDO && (
            <>
              <RegistrarMembroBAUni projeto_id={projeto.id} pdepts={pdepts} />
              <RegistrarMembroBAConv projeto_id={projeto.id} />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-4 gap-5">
        <div className="flex flex-col justify-start border rounded-md border-gray-700 p-4">
          <h2 className="font-semibold text-2xl">Dados</h2>
          <div>
            <p>
              <span className="font-semibold">Nome do projeto: </span>
              {projeto.nome};
            </p>
            <p>
              <span className="font-semibold">Tipo do projeto: </span>
              {projeto.tipo};
            </p>
            <p>
              <span className="font-semibold">Status do projeto: </span>
              {statusRender(projeto.status)};
            </p>
            <p>
              <span className="font-semibold">Data de início: </span>
              {format(projeto.data_inicio, "PP")};
            </p>
            <p>
              <span className="font-semibold">Data de término: </span>
              {format(projeto.data_termino, "PP")};
            </p>
            <p>
              <span className="font-semibold">Orientador: </span>
              {nome_orientador ? nome_orientador.nome : "Não atribuído"};
            </p>
            <p className="text-wrap">
              <span className="font-semibold">Descrição: </span>
              {projeto.descricao ? projeto.descricao : "Não há descrição"};
            </p>
            <p className="text-wrap">
              <span className="font-semibold">Apresentações: </span>
              {projeto.apresentacoes
                ? projeto.apresentacoes
                : "Ainda não foi apresentado"}
              ;
            </p>
            <p>
              <span className="font-semibold">Data da banca avaliadora: </span>
              {projeto.banca_data
                ? format(projeto.banca_data, "PP")
                : "Data não definida"}
              ;
            </p>
            <p>
              <span className="font-semibold">Local da banca avaliadora: </span>
              {projeto.banca_local ? projeto.banca_local : "Local não definido"}
              ;
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between m-8">
        <h1 className="font-bold text-4xl text-center">Banca Avaliadora</h1>
        <div className="flex flex-row gap-5">
          {session.usuario_tipo !== TipoUsuario.ORIENTANDO && (
            <AlterarInfosBanca
              projeto_id={Number(id)}
              infos_banca={{
                banca_data: projeto.banca_data,
                banca_local: projeto.banca_local,
                apresentacoes: projeto.apresentacoes,
              }}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="max-h-fit max-w-fit rounded-md bg-white overflow-x-auto p-5">
          <MembroBATable
            columns={columnsMembroBA}
            data={membrosBA.map((value) => ({
              ...value,
              session_tipo: session.usuario_tipo,
            }))}
          />
        </div>
      </div>
      <div className="flex justify-between m-8">
        <h1 className="font-bold text-4xl text-center">
          Orientandos do projeto
        </h1>
        <div className="flex flex-row gap-5">
          {session.usuario_tipo !== TipoUsuario.ORIENTANDO && (
            <AdicionarOrientando
              projeto_id={projeto.id}
              data_inicio={projeto.data_inicio}
              data_termino={projeto.data_termino}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="max-h-fit max-w-fit rounded-md bg-white overflow-x-auto p-5">
          <OrientandosProjTable
            columns={columnsOrientandosProj}
            data={orientandos_proj.map((values) => ({
              ...values,
              nome: values.Orientando.UsuarioComum.nome,
              session_tipo: session.usuario_tipo,
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
