import React from "react";
import Link from "next/link";
import BotaoSair from "./ui/sair-button";
import { verifySession } from "@/lib/session";
import { TipoUsuario } from "@prisma/client";
import AlterarSenha from "./AlterarSenha";
import GerarRelatorioSistema from "./GerarRelatorioSistema";

const HeaderDashboard = async () => {
  const session = await verifySession();

  return (
    <header className="grid grid-cols-3 gap-4 p-5 sticky top-0 w-screen bg-white z-50 shadow-md">
      <Link href="/" className="w-fit text-xl font-semibold">
        SUP - UFGJW
      </Link>
      <div className="flex justify-center gap-7">
        <Link
          href="#ger_projetos"
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          Projetos
        </Link>
        {session.usuario_tipo === TipoUsuario.ADM_GERAL && (
          <>
            <Link
              href="#ger_departamentos"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              Departamentos
            </Link>

            <Link
              href="#ger_pessoas"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              Pessoas
            </Link>
            <Link
              href="#ger_orientandos"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              Orientandos
            </Link>
          </>
        )}
        {session.usuario_tipo === TipoUsuario.ADM_DEPT && (
          <>
            <Link
              href="#ger_pessoas"
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            >
              Pessoas
            </Link>
          </>
        )}
      </div>
      <div className="flex justify-end gap-3">
        {session.usuario_tipo === TipoUsuario.ADM_GERAL && (
          <GerarRelatorioSistema />
        )}
        <AlterarSenha numero_cpf={session.usuario_cpf} />
        <BotaoSair />
      </div>
    </header>
  );
};

export default HeaderDashboard;
