"use client";

import React from "react";
import { Button } from "./ui/button";
import { gerarRelatorioProj } from "@/lib/gerarRelatorioProj";

const GerarRelatorioProjeto = ({ id }: { id: number }) => {
  const [msg, setMsg] = React.useState<string>("Gerar relatório de projeto");

  const handleDownload = async () => {
    setMsg("Gerando...");
    const doc = await gerarRelatorioProj(id);
    const blob = new Blob([doc], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url);
    setMsg("Gerar relatório de projeto");
  };

  return (
    <Button variant="secondary" onClick={handleDownload}>
      {msg}
    </Button>
  );
};

export default GerarRelatorioProjeto;
