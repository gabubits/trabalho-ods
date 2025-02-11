"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { StatusProjeto, TipoProjeto } from "@prisma/client";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import { DataTableRowActions } from "./ui/TabelaPRowActions";

export type Projeto = {
  id: number;
  nome: string;
  tipo: TipoProjeto;
  orientador_nome: string;
  data_inicio: Date;
  data_termino: Date;
  descricao: string | null;
  status: StatusProjeto;
  link_certificado: string | null;
  session_tipo: string;
};

export const columns: ColumnDef<Projeto>[] = [
  {
    accessorKey: "nome",
    header: () => <div className="w-[500px]">Nome</div>,
    cell: ({ row }) => {
      return <div className="w-[500px] break-all">{row.getValue("nome")}</div>;
    },
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "orientador_nome",
    header: () => <div className="w-[150px]">Orientador</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[150px] break-all">
          {row.getValue("orientador_nome")}
        </div>
      );
    },
  },
  {
    accessorKey: "data_inicio",
    header: () => <div className="w-[150px]">Data de início</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[150px] break-all">
          {format(row.getValue("data_inicio"), "PPpp", { locale: ptBR })}
        </div>
      );
    },
  },
  {
    accessorKey: "data_termino",
    header: () => <div className="w-[150px]">Data de término</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[150px] break-all">
          {format(row.getValue("data_termino"), "PPpp", { locale: ptBR })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

interface TPDProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TabelaProjetosDash<TData, TValue>({
  columns,
  data,
}: TPDProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex justify-center items-center py-4">
        <Input
          placeholder="Filtrar projetos..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
