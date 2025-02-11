"use client";

import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { StatusProjeto } from "@prisma/client";

const ObterCertificadoButton = ({
  status,
  link_certificado,
}: {
  status: StatusProjeto | null;
  link_certificado: string | null;
}) => {
  const { toast } = useToast();

  function handleClick() {
    if (status !== null) {
      if (status === StatusProjeto.NAO_INICIADO) {
        toast({
          title: "Certificado indisponível",
          description: "Projeto ainda não iniciado!",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      if (status === StatusProjeto.EM_ANDAMENTO) {
        toast({
          title: "Certificado indisponível",
          description: "Projeto está em andamento!",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      if (status === StatusProjeto.CONCLUIDO && link_certificado === null) {
        toast({
          title: "Certificado indisponível",
          description: "O certificado ainda não foi gerado!",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      toast({
        title: "Certificado disponível!",
        description: link_certificado,
        variant: "destructive",
        duration: 3000,
      });
    }
  }
  return (
    <>
      <Button variant="secondary" onClick={handleClick}>
        Obter certificado
      </Button>
    </>
  );
};

export default ObterCertificadoButton;
