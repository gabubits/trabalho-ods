"use client";

import { z } from "zod";

import React, { useState } from "react";

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
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns/format";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";
import { CriarTopicoSchema } from "@/lib/actions/schemas";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { criarTopicoAct } from "@/lib/actions/criarTopico";

const CriarTopico = ({ projeto_id }: { projeto_id: string }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, setState] = useState({ message: "", success: true });
  const route = useRouter();
  const { toast } = useToast();

  const data_atual = new Date();

  const form = useForm<z.infer<typeof CriarTopicoSchema>>({
    resolver: zodResolver(CriarTopicoSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      tipo: "",
      data_termino: new Date(data_atual.setMonth(data_atual.getMonth() + 12)),
    },
  });

  async function onSubmit(values: z.infer<typeof CriarTopicoSchema>) {
    const { message, success } = await criarTopicoAct(projeto_id, values);
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

    setState({ message, success });
  }

  const opcoesParaComboBox = [
    { value: "duvida", label: "Dúvida" },
    { value: "atividade", label: "Atividade" },
  ];

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpenDialog(true)}>
          Criar tópico
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Criar tópico</DialogTitle>
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

export default CriarTopico;
