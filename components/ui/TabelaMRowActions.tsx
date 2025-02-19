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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EditarMensagemSchema } from "@/lib/actions/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./textarea";
import { Mensagem } from "../TabelaMensagens";
import { attMensagemAct } from "@/lib/actions/attMensagem";
import { apagarMensagemAct } from "@/lib/actions/apagarMensagem";
import { TipoUsuario } from "@prisma/client";

interface DataTableRowActionsProps {
  row: Row<Mensagem>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof EditarMensagemSchema>>({
    resolver: zodResolver(EditarMensagemSchema),
    defaultValues: {
      conteudo: row.original.conteudo,
    },
  });

  async function onSubmit(values: z.infer<typeof EditarMensagemSchema>) {
    const { message, success } = await attMensagemAct(row.original.id, values);
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

  if (
    row.original.session_tipo === TipoUsuario.ORIENTANDO ||
    row.original.session_tipo === TipoUsuario.ORIENTADOR
  ) {
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
                await apagarMensagemAct(row.original.id);
                setDeleteOpen(false);
                route.refresh();
                toast({
                  title: "Apagado com sucesso",
                  description: `Mensagem foi apagada!`,
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
              <DialogTitle>Editar mensagem</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex flex-col justify-start gap-5">
                  <FormField
                    control={form.control}
                    name="conteudo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conteúdo</FormLabel>
                        <FormControl>
                          <Textarea className="resize-none h-96" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button type="submit">Editar</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        {row.original.session_cpf === row.original.enviado_por_cpf && (
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
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
              await apagarMensagemAct(row.original.id);
              setDeleteOpen(false);
              route.refresh();
              toast({
                title: "Apagado com sucesso",
                description: `Mensagem foi apagada!`,
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
            <DialogTitle>Editar mensagem</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col justify-start gap-5">
                <FormField
                  control={form.control}
                  name="conteudo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conteúdo</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none h-96" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-4">
                <Button type="submit">Editar</Button>
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
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
