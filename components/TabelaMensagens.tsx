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
import { DataTableRowActions } from "./ui/TabelaMRowActions";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";

export type Mensagem = {
  id: number;
  topico_id: number;
  conteudo: string;
  enviado_por: string;
  data_enviado: Date;
  session_tipo: string;
  session_cpf: string;
  enviado_por_cpf: string;
};

export const columnsMensagem: ColumnDef<Mensagem>[] = [
  {
    accessorKey: "conteudo",
    header: () => <div className="w-[500px] text-xs">Mensagem</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[500px] text-xs break-all">
          {row.getValue("conteudo")}
        </div>
      );
    },
  },
  {
    accessorKey: "enviado_por",
    header: () => <div className="w-[100px] text-xs">Enviado por</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[100px] text-xs break-all">
          {row.getValue("enviado_por")}
        </div>
      );
    },
  },
  {
    accessorKey: "data_enviado",
    header: () => <div className="w-[150px] text-xs">Data</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[150px] text-xs break-all">
          {format(row.getValue("data_enviado"), "PPpp", { locale: ptBR })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

interface MensagemProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function MensagemTable<TData, TValue>({
  columns,
  data,
}: MensagemProps<TData, TValue>) {
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
          placeholder="Filtrar mensagens..."
          value={
            (table.getColumn("conteudo")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("conteudo")?.setFilterValue(event.target.value)
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
