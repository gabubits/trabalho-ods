"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import { SituacaoOrientando } from "@prisma/client";
import { DataTableRowActions } from "./ui/TabelaOrientandosProjRowActions";

export type Orientando = {
  id: number;
  nome: string;
  data_entrada: Date;
  data_saida: Date;
  situacao: SituacaoOrientando;
  session_tipo: string;
};

export const columnsOrientandosProj: ColumnDef<Orientando>[] = [
  {
    accessorKey: "nome",
    header: () => <div className="w-[250px]">Nome</div>,
    cell: ({ row }) => {
      return <div className="w-[250px] break-all">{row.getValue("nome")}</div>;
    },
  },
  {
    accessorKey: "data_entrada",
    header: () => <div className="w-[150px]">Data de entrada</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[150px] break-all">
          {format(row.getValue("data_entrada"), "PPpp", { locale: ptBR })}
        </div>
      );
    },
  },
  {
    accessorKey: "data_saida",
    header: () => <div className="w-[150px]">Data de saída</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[150px] break-all">
          {format(row.getValue("data_saida"), "PPpp", { locale: ptBR })}
        </div>
      );
    },
  },
  {
    accessorKey: "situacao",
    header: () => <div className="w-[150px]">Situacao</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[150px] break-all">{row.getValue("situacao")}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function OrientandosProjTable<TData, TValue>({
  columns,
  data,
}: Props<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination,
    },
  });

  return (
    <div>
      <div className="flex justify-center items-center py-4">
        <Input
          placeholder="Filtrar orientandos..."
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
                  Sem resultados.
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
