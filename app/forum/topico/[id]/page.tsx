import React from "react";
import prisma from "@/prisma/db";

const topicoEspecifico = async ({ params }: any) => {
  const { id } = params;
  console.log(id);

  const topicoDB = await prisma.topico.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      nome: true,
      descricao: true,
      data_termino: true,
      tipo: true,
      Projeto: {
        select: {
          nome: true,
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
      },
      Mensagens: {
        select: {
          id: true,
          conteudo: true,
          data_enviado: true,
          enviado_por: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
  });

  if (!topicoDB) {
    return <div>Tópico não encontrado.</div>;
  }

  const topico = {
    id: topicoDB.id,
    nome: topicoDB.nome,
    descricao: topicoDB.descricao ?? "Descrição não fornecida",
    data_termino: topicoDB.data_termino
      ? topicoDB.data_termino.toString()
      : "Não definida",
    tipo: topicoDB.tipo ?? "Não especificado",
    orientador_nome: topicoDB.Projeto.Orientador.usuarioComum.nome,
    mensagens: topicoDB.Mensagens.map((mensagem: any) => ({
      id: mensagem.id,
      conteudo: mensagem.conteudo,
      data_enviado: mensagem.data_enviado.toString(),
      enviado_por_nome: mensagem.enviado_por.nome,
    })),
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex flex-col mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            {topico.nome}
          </h1>
          <p className="text-gray-500 text-md">
            {" "}
            criado por {topico.orientador_nome}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Descrição:</h2>
          <p className="text-gray-800 mt-2">{topico.descricao}</p>
        </div>

        <hr className="border-t-2 border-gray-300 my-6" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Mensagens
          </h2>

          {topico.mensagens.length === 0 ? (
            <p>Não há mensagens ainda.</p>
          ) : (
            topico.mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {mensagem.enviado_por_nome}
                  </span>
                  <span className="text-sm text-gray-400">
                    {mensagem.data_enviado}
                  </span>
                </div>
                <p className="text-gray-800">{mensagem.conteudo}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default topicoEspecifico;
