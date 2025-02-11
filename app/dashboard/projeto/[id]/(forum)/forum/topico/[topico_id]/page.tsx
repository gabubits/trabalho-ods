import React from "react";
import prisma from "@/prisma/db";
import { columnsMensagem, MensagemTable } from "@/components/TabelaMensagens";
import EnviarMensagem from "@/components/EnviarMensagem";
import { verifySession } from "@/lib/session";

const Topico = async ({
  params,
}: {
  params: Promise<{ id: string; topico_id: string }>;
}) => {
  const topico_id = (await params).topico_id;
  const session = await verifySession();

  const mensagens = await prisma.mensagem.findMany({
    where: {
      topico_id: Number(topico_id),
    },
    include: {
      enviado_por: true,
    },
  });

  mensagens.sort((a, b) => b.data_enviado.getTime() - a.data_enviado.getTime());

  return (
    <div className="flex justify-center items-center flex-col my-6">
      <div>
        <h1 className="font-bold text-4xl text-center">Forum de discussão</h1>
        <div className="max-h-fit max-w-fit rounded-md bg-white overflow-x-auto p-5">
          <MensagemTable
            columns={columnsMensagem}
            data={mensagens.map((msg) => ({
              id: msg.id,
              topico_id: msg.topico_id,
              conteudo: msg.conteudo,
              data_enviado: msg.data_enviado,
              enviado_por: msg.enviado_por.nome,
              enviado_por_cpf: msg.enviado_por.numero_cpf,
              session_tipo: session.usuario_tipo,
              session_cpf: session.usuario_cpf,
            }))}
          />
        </div>
        <EnviarMensagem topico_id={topico_id} />
      </div>
    </div>
  );
};

export default Topico;
