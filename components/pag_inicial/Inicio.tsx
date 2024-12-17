import Link from "next/link";
import React from "react";

const Inicio = () => {
  return (
    <div className="relative bg-inicio bg-no-repeat bg-cover bg-center h-screen w-screen overflow-hidden" id="inicio">
      <div className="grid justify-items-center absolute inset-0 bg-black bg-opacity-70 ">
        <div className="content-center text-white text-5xl  font-bold">
          <h1>Bem-Vindo ao</h1>
          <br />
          <h1> SUP - UFGJW</h1>
        </div>
        <div>
          <p className="text-white font-light  text-xl text-center mx-60">
            O <b>SUP - UFGWF </b> é uma iniciativa criada para unificar o
            gerenciamento de projetos da universidade, além de facilitar o
            acesso da comunidade externa ao conhecimeto gerado.
          </p>
        </div>
        <Link href="#projetos">
          <button className=" h-10 w-auto px-4 font-bold text-white border-4 border-white-600 rounded-full ">
            Ver Projetos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
