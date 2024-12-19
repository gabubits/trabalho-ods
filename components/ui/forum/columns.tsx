"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TipoProjeto } from "@prisma/client";

export type Topico = {
  id: number;
  nome: string;
  descricao: string;
  data_termino: string;
  tipo: string;
  orientador_nome: string;
};
