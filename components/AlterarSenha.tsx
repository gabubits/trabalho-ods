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
import { AlterarSenhaSchema } from "@/lib/actions/schemas";
import { useToast } from "@/hooks/use-toast";
import { alterarSenhaAct } from "@/lib/actions/alterarSenha";

const AlterarSenha = ({ numero_cpf }: { numero_cpf: string }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AlterarSenhaSchema>>({
    resolver: zodResolver(AlterarSenhaSchema),
    defaultValues: {
      senha: "",
      repetirSenha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AlterarSenhaSchema>) {
    const { message, success } = await alterarSenhaAct(numero_cpf, values);
    if (success) {
      setOpenDialog(false);
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

    form.reset({ senha: "", repetirSenha: "" });
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          onClick={() => {
            setOpenDialog(true);
            form.reset({ senha: "", repetirSenha: "" });
          }}
        >
          Altere sua senha
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-gree">
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col justify-start gap-5">
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Nova senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repetirSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Repetir senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-4">
              <Button type="submit">Alterar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AlterarSenha;
