"use client";

import { z } from "zod";

import { TipoProjeto } from "@prisma/client";

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

const ApagarProjetoSchema = z.object({
  projeto: z.string({
    required_error: "Digite o nome do projeto.",
  }),
});

const ApagarProjetoDashboard = () => {
  const [state, vAction, pending] = useActionState(verificar, undefined);

  const form = useForm<z.infer<typeof ApagarProjetoSchema>>({
    resolver: zodResolver(ApagarProjetoSchema),
    defaultValues: {
      projeto: "",
    },
  });

  return (
    <Form {...form}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary">Apagar projeto</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar projeto</AlertDialogTitle>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

async function verificar(prevState: any, formData: FormData) {}

export default ApagarProjetoDashboard;
