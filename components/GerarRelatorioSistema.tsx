"use client";

import React from "react";
import { Button } from "./ui/button";
import { gerarRelatorioSis } from "@/lib/gerarRelatorioSis";

const GerarRelatorioSistema = () => {
  const [msg, setMsg] = React.useState<string>("Gerar relatório de sistema");

  const handleDownload = async () => {
    setMsg("Gerando...");
    const doc = await gerarRelatorioSis();
    const blob = new Blob([doc], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url);
    setMsg("Gerar relatório de sistema");
  };

  return (
    <Button variant="secondary" onClick={handleDownload}>
      {msg}
    </Button>
  );
};

export default GerarRelatorioSistema;
