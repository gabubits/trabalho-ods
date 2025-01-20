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
import { CriarDeptSchema } from "@/lib/actions/schemas";
import { criarDeptAct } from "@/lib/actions/criarDept";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const CriarDept = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, setState] = useState({ message: "", success: true });
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CriarDeptSchema>>({
    resolver: zodResolver(CriarDeptSchema),
    defaultValues: {
      sigla_dept: "",
      nome: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CriarDeptSchema>) {
    const { message, success } = await criarDeptAct(values);
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

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpenDialog(true)}>
          Criar Departamento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-gree">
        <DialogHeader>
          <DialogTitle>Criar Departamento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col justify-start gap-5">
              <FormField
                control={form.control}
                name="sigla_dept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Sigla do Departamento
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
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Nome do Departamento
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

export default CriarDept;
