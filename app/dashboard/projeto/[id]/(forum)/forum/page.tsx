import CriarTopico from "@/components/CriarTopico";
import { columnsTopico, TopicoTable } from "@/components/TabelaTopicosForum";
import { verifySession } from "@/lib/session";
import prisma from "@/prisma/db";
import { TipoUsuario } from "@prisma/client";
import React from "react";

const Forum = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await verifySession();

  const topicos = await prisma.topico.findMany({
    where: {
      projeto_id: Number(id),
    },
  });

  return (
    <div className="flex justify-center items-center flex-col my-6">
      <div>
        <h1 className="font-bold text-4xl text-center">Fórum de discussão</h1>
        {session.usuario_tipo !== TipoUsuario.ORIENTANDO && (
          <div className="flex justify-center items-center mt-4 gap-4">
            <CriarTopico projeto_id={id} />
          </div>
        )}
        <div className="h-[500px] w-[1000px] rounded-md bg-white overflow-x-auto p-5">
          <TopicoTable
            columns={columnsTopico}
            data={topicos.map((value) => ({
              ...value,
              session_tipo: session.usuario_tipo,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Forum;
