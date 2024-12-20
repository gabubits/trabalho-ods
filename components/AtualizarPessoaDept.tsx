"use client";

import { z } from "zod";

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
import { AtualizarPDept } from "../lib/actions/atualizarPDepr";

const AtualizarPessoaDeptchema = z.object({
  numero_cpf: z.string(),
  nome: z.string(),
  senha: z.string(),
  nome_dept: z.string(),
  sigla_dept: z.string(),
});

/// a pessoa vai entrar com o cpf de quem ela quer editar e vai editar faz uma
// verificação se o cpf existe e coloca qual campo quer editar
const AtualizarPessoaDept = () => {
  const [state, vAction, pending] = useActionState(verificar, undefined);

  const form = useForm<z.infer<typeof AtualizarPessoaDeptchema>>({
    resolver: zodResolver(AtualizarPessoaDeptchema),
    defaultValues: {
      nome: "",
      numero_cpf: "",
      senha: "",
      nome_dept: "",
      sigla_dept: "",
    },
  });

  // function onSubmit(values: z.infer<typeof AtualizarPessoaDeptchema>) {
  //   React.useEffect(() => {
  //     fetch("app/api/pessoaDepartamento", {
  //       method: "PUT",
  //       headers: new Headers({ "Content-Type": "application/json" }),
  //       body: JSON.stringify(values),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   });
  // }

  async function onSubmit(values: z.infer<typeof AtualizarPessoaDeptchema>) {
    const res = await AtualizarPDept(values);
  }

  return (
    <div>
      <Form {...form}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">
              Atualizar Pessoa no Departamento
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {" "}
                Atualizar Pessoa no Departamento
              </AlertDialogTitle>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="flex flex-col justify-start gap-5">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-start gap-5">
                    <FormField
                      control={form.control}
                      name="numero_cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do CPF</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-start gap-5">
                    <FormField
                      control={form.control}
                      name="nome_dept"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Departamento</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-start gap-5">
                    <FormField
                      control={form.control}
                      name="sigla_dept"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sigla do Departamento</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-start">
                    <FormField
                      control={form.control}
                      name="senha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Atualizar</Button>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
              </form>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </Form>
    </div>
  );
};

async function verificar(prevState: any, formData: FormData) {}

export default AtualizarPessoaDept;
