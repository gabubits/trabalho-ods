import React from "react";
import Link from "next/link";
import BotaoSair from "./ui/sair-button";

const HeaderDepartamento = () => {
  return (
    <header className="grid grid-cols-3 gap-4 p-5 sticky top-0 w-screen bg-white z-50 shadow-md">
      <Link href="/" className="w-fit text-xl font-semibold">
        SUP - UFGJW
      </Link>
      <div className="flex justify-center gap-7">
        <Link
          href="/dashboard"
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          Projetos
        </Link>
      </div>
      <div className="flex justify-end">
        <BotaoSair />
      </div>
    </header>
  );
};

export default HeaderDepartamento;
