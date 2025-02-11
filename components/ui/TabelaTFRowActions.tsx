"use client";

import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ArrowRightFromLine, CalendarIcon, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AtualizarTopicoSchema } from "@/lib/actions/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Topico } from "../TabelaTopicosForum";
import { attTopicoAct } from "@/lib/actions/attTopico";
import { apagarTopicoAct } from "@/lib/actions/apagarTopico";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { Calendar } from "./calendar";
import { Textarea } from "./textarea";
import Link from "next/link";
import { TipoUsuario } from "@prisma/client";

interface DataTableRowActionsProps {
  row: Row<Topico>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AtualizarTopicoSchema>>({
    resolver: zodResolver(AtualizarTopicoSchema),
    defaultValues: {
      nome: row.original.nome,
      descricao: row.original.descricao ? row.original.descricao : "",
      data_termino: row.original.data_termino
        ? row.original.data_termino
        : new Date(),
      tipo: row.original.tipo ? row.original.tipo : "",
    },
  });

  async function onSubmit(values: z.infer<typeof AtualizarTopicoSchema>) {
    const { message, success } = await attTopicoAct(row.original.id, values);
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

  const opcoesParaComboBox = [
    { value: "duvida", label: "Dúvida" },
    { value: "atividade", label: "Atividade" },
  ];

  if (row.original.session_tipo === TipoUsuario.ORIENTANDO) {
    return (
      <>
        <Link
          href={`/dashboard/projeto/${row.original.projeto_id}/forum/topico/${row.original.id}`}
        >
          <Button variant="ghost" className="h-8 w-8 p-0">
            <ArrowRightFromLine className="h-4 w-4" />
          </Button>
        </Link>
      </>
    );
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
              await apagarTopicoAct(row.original.id);
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
            <DialogTitle>Atualizar {row.original.nome}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-x-6">
                <div className="flex flex-col justify-start gap-5">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do tópico</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Tipo do tópico
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um tipo de tópico" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {opcoesParaComboBox.map((value, index) => (
                              <SelectItem key={index} value={value.value}>
                                {value.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="data_termino"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data de término</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Escolha uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do tópico</FormLabel>
                        <FormControl>
                          <Textarea className="resize-none h-96" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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

      <Link
        href={`/dashboard/projeto/${row.original.projeto_id}/forum/topico/${row.original.id}`}
      >
        <Button variant="ghost" className="h-8 w-8 p-0">
          <ArrowRightFromLine className="h-4 w-4" />
        </Button>
      </Link>
    </>
  );
}
