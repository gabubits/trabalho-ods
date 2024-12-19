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
import { CriarPDeptSchema } from "@/lib/actions/schemas";
import { criarPDeptAct } from "@/lib/actions/criarPDept";
import { X } from "lucide-react";

const CriarPDept = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, setState] = useState({ message: "", success: true });

  const form = useForm<z.infer<typeof CriarPDeptSchema>>({
    resolver: zodResolver(CriarPDeptSchema),
    defaultValues: {
      numero_cpf: "",
      nome: "",
      senha: "",
      nome_dept: "",
      sigla_dept: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CriarPDeptSchema>) {
    const { message, success } = await criarPDeptAct(values);
    if (success) {
      setOpenDialog(false);
    }
    setState({ message, success });
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpenDialog(true)}>
          Criar Pessoa do Dept.
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Criar Pessoa do Dept.</DialogTitle>
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
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nome_dept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Nome do departamento
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
                name="sigla_dept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Sigla do departamento
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!state.success ? (
              <p className="font-bold text-red-600">
                <span>
                  <X fill="red" /> {state.message}
                </span>
              </p>
            ) : null}
            <div className="flex space-x-4">
              <Button type="submit">Criar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CriarPDept;
