"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TipoProjeto } from "@prisma/client";

export type Projeto = {
  id_proj: number,
  nome_proj: string,
  tipo_proj: TipoProjeto,
  orientador_nome: string,
};

export const columns: ColumnDef<Projeto>[] = [
  {
    accessorKey: "nome_proj",
    header: "Nome do projeto",
  },
  {
    accessorKey: "tipo_proj",
    header: "Tipo de projeto",
  },
  {
    accessorKey: "orientador_nome",
    header: "Orientador",
  },
];
