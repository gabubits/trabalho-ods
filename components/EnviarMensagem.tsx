"use client";

import { z } from "zod";

import React from "react";

import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { EnviarMensagemSchema } from "@/lib/actions/schemas";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { enviarMensagemAct } from "@/lib/actions/enviarMensagem";

const EnviarMensagem = ({ topico_id }: { topico_id: string }) => {
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof EnviarMensagemSchema>>({
    resolver: zodResolver(EnviarMensagemSchema),
    defaultValues: {
      conteudo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof EnviarMensagemSchema>) {
    const { message, success } = await enviarMensagemAct(topico_id, values);
    if (success) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="conteudo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className="resize-none h-52" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="submit">Enviar mensagem</Button>
        </div>
      </form>
    </Form>
  );
};

export default EnviarMensagem;
