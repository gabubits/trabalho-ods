import React from "react";
import prisma from "@/prisma/db";
import { format } from "date-fns";
import { StatusProjeto } from "@prisma/client";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const projeto = await prisma.projeto.findMany({
    where: {
      id: Number(id),
    },
  });

  const nome_orientador = await prisma.usuarioComum.findFirst({
    where: {
        numero_cpf: projeto[0].orientador_cpf
    },
    select: {
        nome: true,
    }
  })

  const orientando_cpf = await prisma.projetoOrientando.findFirst({
    where: {
        projeto_id: projeto[0].id,
    },
    select: {
        orientando_cpf: true
    }
  })

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
  }

  return (
    <div className="flex flex-col justify-center items-center my-4">
      <h1 className="font-bold text-4xl text-center">Informações do projeto</h1>
      <div className="grid grid-cols-2 gap-x-4 my-4">
        <div className="flex flex-col justify-start border rounded-md border-gray-700 p-4">
          <h2 className="font-semibold text-2xl">Dados</h2>
          <div>
            <p>
              <span className="font-semibold">Nome do projeto: </span>
              {projeto[0].nome};
            </p>
            <p>
              <span className="font-semibold">Tipo do projeto: </span>
              {projeto[0].tipo};
            </p>
            <p>
              <span className="font-semibold">Status do projeto: </span>
              {statusRender(projeto[0].status)};
            </p>
            <p>
              <span className="font-semibold">Data de início: </span>
              {format(projeto[0].data_inicio, 'PP')};
            </p>
            <p>
              <span className="font-semibold">Data de término: </span>
              {format(projeto[0].data_termino, 'PP')};
            </p>
            <p>
              <span className="font-semibold">Orientador: </span>
              {nome_orientador ? nome_orientador.nome : 'Não atribuído'};
            </p>
            <p className="text-wrap">
              <span className="font-semibold">Descrição: </span>
              {projeto[0].descricao ? projeto[0].descricao : 'Não há descrição'};
            </p>
            <p className="text-wrap">
              <span className="font-semibold">Apresentações: </span>
              {projeto[0].apresentacoes ? projeto[0].apresentacoes : 'Ainda não foi apresentado'};
            </p>
            <p>
              <span className="font-semibold">Data da banca avaliadora: </span>
              {projeto[0].banca_data ? format(projeto[0].banca_data, 'PP') : 'Data não definida'};
            </p>
            <p>
              <span className="font-semibold">Local da banca avaliadora: </span>
              {projeto[0].banca_local ? projeto[0].banca_local : 'Local não definido'};
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start border rounded-md border-gray-700 p-4">
            <h2>Certificado</h2>
            <p>
                Certificado não disponível
            </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
