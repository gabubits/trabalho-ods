"use client";

import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { apagarPDeptAct } from "@/lib/actions/apagarPDept";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { PDept } from "../TabelaPDepts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AtualizarPDeptSchema } from "@/lib/actions/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { attPDeptAct } from "@/lib/actions/attPDept";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { TipoUsuario } from "@prisma/client";

interface DataTableRowActionsProps {
  row: Row<PDept>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AtualizarPDeptSchema>>({
    resolver: zodResolver(AtualizarPDeptSchema),
    defaultValues: {
      numero_cpf: row.original.numero_cpf,
      nome: row.original.nome,
      sigla_dept: row.original.sigla_dept,
      tipo_pessoa: row.original.tipo,
    },
  });

  async function onSubmit(values: z.infer<typeof AtualizarPDeptSchema>) {
    const { message, success } = await attPDeptAct(values);
    if (success) {
      setEditOpen(false);
      route.refresh();
      toast({
        title: "Sucesso!",
        description: message,
        variant: "success",
        duration: 3000,
      });
    } else {
      toast({
        title: "Erro!",
        description: message,
        variant: "destructive",
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Você tem certeza?</DialogTitle>
          </DialogHeader>
          <Button
            variant="destructive"
            onClick={async () => {
              await apagarPDeptAct(row.original.numero_cpf);
              setDeleteOpen(false);
              route.refresh();
              toast({
                title: "Apagado com sucesso",
                description: `${row.original.nome} foi apagado!`,
                variant: "success",
                duration: 3000,
              });
            }}
          >
            Apagar
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Atualizar {row.original.nome} ({row.original.numero_cpf})
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col justify-start gap-5">
                <FormField
                  control={form.control}
                  name="numero_cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">CPF</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sigla_dept"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Sigla do Dept.
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipo_pessoa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Tipo de pessoa
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tipo de pessoa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={TipoUsuario.ADM_DEPT}>
                            {TipoUsuario.ADM_DEPT}
                          </SelectItem>
                          <SelectItem value={TipoUsuario.ORIENTADOR}>
                            {TipoUsuario.ORIENTADOR}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-4">
                <Button type="submit">Atualizar</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={(isOpen) => {
          setDropdownOpen(isOpen);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setDeleteOpen(true);
              setDropdownOpen(false);
            }}
          >
            Apagar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setEditOpen(true);
              setDropdownOpen(false);
            }}
          >
            Alterar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
