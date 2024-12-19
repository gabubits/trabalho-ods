import React from "react";
import Forum from "./pag_forum/Forum";

const DashboardDepartamento = () => {
  return (
    <div className="flex justify-center items-center flex-col my-6 gap-4">
      <div>
        <h1 className="font-bold text-4xl">Gerenciamento de projetos</h1>
        <div className="flex justify-center items-center gap-4">
          Botões de gerenciamento
        </div>
        <div>Tabela de projetos</div>
      </div>
      <div>
        <h1 className="font-bold text-4xl">Gerenciamento de Orientadores</h1>
        <div className="flex justify-center items-center gap-4">
          Botões de gerenciamento
        </div>
        <div>Tabela de Orientadores</div>
      </div>
      <div>
        <h1 className="font-bold text-4xl">Gerenciamento de Orientandos</h1>
        <div className="flex justify-center items-center gap-4">
          Botões de gerenciamento
        </div>
        <div>Tabela de Orientandos</div>
      </div>
      <div></div>
    </div>
  );
};

export default DashboardDepartamento;
