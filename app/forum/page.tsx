import React from "react";
import Forum from "../../components/pag_forum/Forum";
import prisma from "@/prisma/db";
import { Topico } from "@/components/ui/forum/columns";

const Forum2 = async () => {
  const topicosDB = await prisma.topico.findMany({
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
    },
  });

  const topicos: Topico[] = [];
  for (const topico of topicosDB) {
    topicos.push({
      id: topico.id,
      nome: topico.nome,
      descricao: topico.descricao ?? "Descrição não fornecida",
      data_termino: topico.data_termino
        ? topico.data_termino.toString()
        : "Não definida",
      tipo: topico.tipo ?? "Não especificado",
      orientador_nome: topico.Projeto.Orientador.usuarioComum.nome,
    });

    return (
      <div className="flex justify-center items-center flex-col my-6 gap-4">
        <div>
          <div>
            <Forum topicos={topicos}></Forum>
          </div>
        </div>
      </div>
    );
  }
};

export default Forum2;
