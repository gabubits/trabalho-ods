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
import { AlterarInfosBancaSchema } from "@/lib/actions/schemas";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { attInfosBancaAct } from "@/lib/actions/attInfosBanca";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";

const AlterarInfosBanca = ({
  projeto_id,
  infos_banca,
}: {
  projeto_id: number;
  infos_banca: {
    banca_data: Date | null;
    banca_local: string | null;
    apresentacoes: string | null;
  };
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AlterarInfosBancaSchema>>({
    resolver: zodResolver(AlterarInfosBancaSchema),
    defaultValues: {
      banca_data: infos_banca.banca_data ? infos_banca.banca_data : new Date(),
      banca_local: infos_banca.banca_local ? infos_banca.banca_local : "",
      apresentacoes: infos_banca.apresentacoes ? infos_banca.apresentacoes : "",
    },
  });

  async function onSubmit(values: z.infer<typeof AlterarInfosBancaSchema>) {
    const { message, success } = await attInfosBancaAct(projeto_id, values);
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
          Alterar informações
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-gree">
        <DialogHeader>
          <DialogTitle>
            Alterar informações da banca e apresentações
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col justify-start gap-5">
              <FormField
                control={form.control}
                name="banca_local"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Local</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="banca_data"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
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
                name="apresentacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Apresentações do trabalho
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none h-96" {...field} />
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

export default AlterarInfosBanca;
