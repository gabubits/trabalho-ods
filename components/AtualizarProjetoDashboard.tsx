"use client";

import { z } from "zod";

import { StatusProjeto, TipoProjeto } from "@prisma/client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/modal-dialog";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { format } from "date-fns/format";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";

const AtualizarProjetoSchema = z.object({
  nome: z.string(),
  tipo: z.nativeEnum(TipoProjeto),
  data_inicio: z.date(),
  data_termino: z.date(),
  descricao: z.string(),
  orientador: z.string(),
  apresentacoes: z.string(),
  banca_local: z.string(),
  banca_data: z.date(),
  status: z.nativeEnum(StatusProjeto),
});

const AtualizarProjetoDashboard = () => {
  const [state, vAction, pending] = useActionState(verificar, undefined);

  const form = useForm<z.infer<typeof AtualizarProjetoSchema>>({
    resolver: zodResolver(AtualizarProjetoSchema),
    defaultValues: {
      nome: "",
      data_inicio: new Date(),
      data_termino: new Date(),
      descricao: "",
      orientador: "",
      apresentacoes: "",
      banca_data: new Date(),
      banca_local: "",
    },
  });

  return (
    <Form {...form}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary">Atualizar projeto</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Atualizar projeto</AlertDialogTitle>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

async function verificar(prevState: any, formData: FormData) {}

export default AtualizarProjetoDashboard;
