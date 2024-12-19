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

import { Button, buttonVariants } from "./ui/button";
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

export const CriarProjetoSchema = z.object({
  nome: z
    .string({
      required_error: "Digite o nome do projeto.",
    })
    .min(1, { message: "Digite o nome do projeto." }),
  tipo: z.nativeEnum(TipoProjeto, {
    required_error: "Selecione o tipo de projeto.",
  }),
  data_inicio: z.date({ required_error: "Informe a data de início." }),
  data_termino: z.date({ required_error: "Informe a data de término" }),
  descricao: z.string().trim(),
  orientador_cpf: z.string({
    required_error: "Selecione o orientador do projeto.",
  }),
});

const CriarProjetoDashboard = () => {
  const data_atual = new Date();

  const form = useForm<z.infer<typeof CriarProjetoSchema>>({
    resolver: zodResolver(CriarProjetoSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      orientador_cpf: "",
      data_inicio: new Date(),
      data_termino: new Date(data_atual.setMonth(data_atual.getMonth() + 12)),
    },
  });

  function onSubmit(values: z.infer<typeof CriarProjetoSchema>) {
    React.useEffect(() => {
      fetch("/api/projeto/criar", {
        method: "post",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });
  }

  const opcoesParaComboBox = [
    { value: TipoProjeto.EXTENSAO, label: "Extensão" },
    { value: TipoProjeto.IC, label: "Iniciação Científica" },
    { value: TipoProjeto.TCC, label: "TCC" },
  ];

  const [dadosOrientadores, setDadosOrientadores] = React.useState<
    { numero_cpf: string; nome: string }[]
  >([]);

  React.useEffect(() => {
    fetch("/api/orientadores")
      .then((res) => res.json())
      .then((data) => {
        setDadosOrientadores(data);
      });
  }, []);

  return (
    <Form {...form}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary">Criar projeto</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Criar projeto</AlertDialogTitle>
            <form
              onSubmit={form.handleSubmit(onSubmit, (e) => {
                console.log(e);
              })}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-x-6">
                <div className="flex flex-col justify-start gap-5">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do projeto</FormLabel>
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
                      <FormItem className="flex flex-col">
                        <FormLabel>Tipo do projeto</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? opcoesParaComboBox.find(
                                      (op) => op.value === field.value
                                    )?.label
                                  : "Selecione o tipo"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Tipo"
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>Tipo não encontrado</CommandEmpty>
                                <CommandGroup>
                                  {opcoesParaComboBox.map((language) => (
                                    <CommandItem
                                      value={language.label}
                                      key={language.value}
                                      onSelect={() => {
                                        form.setValue("tipo", language.value);
                                      }}
                                      className="pointer-events-auto"
                                    >
                                      {language.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          language.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="orientador_cpf"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Orientador do projeto</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? dadosOrientadores.find(
                                      (op) => op.numero_cpf === field.value
                                    )?.nome
                                  : "Selecione o orientador"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Orientador"
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>Não encontrado</CommandEmpty>
                                <CommandGroup>
                                  {dadosOrientadores.map((language) => (
                                    <CommandItem
                                      value={language.nome}
                                      key={language.numero_cpf}
                                      onSelect={() => {
                                        form.setValue(
                                          "orientador_cpf",
                                          language.numero_cpf
                                        );
                                      }}
                                      className="pointer-events-auto"
                                    >
                                      {language.nome}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          language.numero_cpf === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="data_inicio"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data de início</FormLabel>
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
                        <FormLabel>Descrição do projeto</FormLabel>
                        <FormControl>
                          <Textarea className="resize-none h-96" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit">
                  Criar
              </Button>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default CriarProjetoDashboard;
