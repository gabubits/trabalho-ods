import React from "react";
import BotaoSair from "./ui/sair-button";
import Link from "next/link";
import GerarRelatorioProjeto from "./GerarRelatorioProj";
import { verifySession } from "@/lib/session";
import { TipoUsuario } from "@prisma/client";

const HeaderProjeto = async ({ id }: { id: string }) => {
  const session = await verifySession();
  return (
    <header className="grid grid-cols-3 gap-4 p-5 sticky top-0 w-screen bg-white z-50 shadow-md">
      <Link href="/" className="w-fit text-xl font-semibold">
        SUP - UFGJW
      </Link>
      <div className="flex justify-center gap-7">
        <Link
          href={`http://localhost:3000/dashboard/projeto/${id}`}
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          Informações
        </Link>
        <Link
          href={`http://localhost:3000/dashboard/projeto/${id}/forum/`}
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          Fórum
        </Link>
      </div>
      <div className="flex justify-end gap-3">
        {session.usuario_tipo !== TipoUsuario.ORIENTANDO && (
          <GerarRelatorioProjeto id={Number(id)} />
        )}
        <BotaoSair />
      </div>
    </header>
  );
};

export default HeaderProjeto;
