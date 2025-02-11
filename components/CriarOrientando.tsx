"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CriarPOrientSchema } from "@/lib/actions/orientando/schemas";
import { criar } from "@/lib/actions/orientando/criar";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CriarOrientando = ({
  departamentos,
}: {
  departamentos: { nome: string; sigla_dept: string }[];
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CriarPOrientSchema>>({
    resolver: zodResolver(CriarPOrientSchema),
    defaultValues: {
      numero_cpf: "",
      nome: "",
      curso: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CriarPOrientSchema>) {
    const { message, success } = await criar(values);
    if (success) {
      setOpenDialog(false);
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpenDialog(true)}>
          Criar Orientando
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-gree">
        <DialogHeader>
          <DialogTitle>Criar Orientando</DialogTitle>
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
                      <Input {...field} />
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
                name="curso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Curso</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um curso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departamentos.map((value, index) => (
                          <SelectItem key={index} value={value.sigla_dept}>
                            {`${value.sigla_dept} - ${value.nome}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-4">
              <Button type="submit">Criar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CriarOrientando;
