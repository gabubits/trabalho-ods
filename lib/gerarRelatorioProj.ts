"use server";

import prisma from "@/prisma/db";
import { jsPDF } from "jspdf";
import { verifySession } from "./session";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import autoTable from "jspdf-autotable";
import { SituacaoOrientando } from "@prisma/client";

export const gerarRelatorioProj = async (id: number) => {
  const session = await verifySession();
  const { nome } = await prisma.usuarioComum.findFirstOrThrow({
    where: {
      numero_cpf: session.usuario_cpf,
    },
    select: {
      nome: true,
    },
  });

  const projeto = await prisma.projeto.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      Orientador: {
        select: {
          UsuarioComum: {
            select: {
              nome: true,
            },
          },
          sigla_dept: true,
        },
      },
      ProjetosOrientando: {
        select: {
          situacao: true,
          data_entrada: true,
          data_saida: true,
          Orientando: {
            select: {
              UsuarioComum: {
                select: {
                  nome: true,
                },
              },
              curso: true,
            },
          },
        },
      },
      Topicos: {
        include: {
          Mensagens: {
            include: {
              enviado_por: true,
            },
          },
        },
      },
      BancaAvaliadoraUni: {
        include: {
          Membro: {
            include: {
              UsuarioComum: true,
            },
          },
        },
      },
      BancaAvaliadoraConv: true,
    },
  });

  function removerAcentos(str: string) {
    return str.normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  const orientandosProj = projeto.ProjetosOrientando.map((values) => [
    values.Orientando.UsuarioComum.nome,
    values.Orientando.curso,
    format(values.data_entrada, "P", { locale: ptBR }),
    format(values.data_saida, "P", { locale: ptBR }),
    values.situacao === SituacaoOrientando.ORIENTANDO
      ? "Orientando"
      : "Ex-orientando",
  ]);

  const doc = new jsPDF();

  const pageHeight = doc.internal.pageSize.height - 20;
  const pageWidth = doc.internal.pageSize.width - 20;
  let y = 20;

  const addText = (text: string, xPos: number, ph: number) => {
    if (y > pageHeight) {
      doc.addPage();
      y = 20;
    }
    y += ph;
    doc.text(removerAcentos(text), xPos, y, { maxWidth: pageWidth });
  };

  doc.setFont("courier", "bold");
  addText("SUP UFGJW - Relatorio de projeto", 20, 0);

  doc.setFont("courier", "normal");
  doc.setFontSize(11);
  addText(`Gerado por: ${nome} (CPF: ${session.usuario_cpf})`, 20, 10);
  addText(`Data: ${format(new Date(), "PPpp", { locale: ptBR })}`, 20, 5);

  doc.setFont("courier", "bold");
  addText("Informacoes gerais:", 20, 10);

  doc.setFont("courier", "normal");

  addText(`Nome do projeto: ${projeto.nome}`, 20, 5);
  addText(`Tipo do projeto: ${projeto.tipo}`, 20, 5);
  addText(
    `Data de inicio: ${format(projeto.data_inicio, "P", { locale: ptBR })}`,
    20,
    5
  );
  addText(
    `Data de termino: ${format(projeto.data_termino, "P", { locale: ptBR })}`,
    20,
    5
  );
  addText(
    `Orientador: ${projeto.Orientador.UsuarioComum.nome} - ${projeto.Orientador.sigla_dept}`,
    20,
    5
  );
  addText(
    `Descricao: ${projeto.descricao ? projeto.descricao : "Sem descricao"}`,
    20,
    5
  );
  addText(
    `Apresentacoes: ${
      projeto.apresentacoes ? projeto.apresentacoes : "Sem apresentacoes"
    }`,
    20,
    5
  );
  addText(
    `Local da banca de avaliacao: ${
      projeto.banca_local ? projeto.banca_local : "Local não definido"
    }`,
    20,
    5
  );
  addText(
    `Data da apresentacao a banca: ${
      projeto.banca_data
        ? format(projeto.banca_data, "P", { locale: ptBR })
        : "Sem data definida"
    }`,
    20,
    5
  );
  addText(`Status: ${projeto.status}`, 20, 5);
  addText("Banca avaliadora:", 20, 5);
  if (
    projeto.BancaAvaliadoraConv.length === 0 &&
    projeto.BancaAvaliadoraUni.length === 0
  ) {
    addText("Banca avaliadora indefinida", 25, 5);
  }
  for (const bancaUni of projeto.BancaAvaliadoraUni) {
    addText(
      `${bancaUni.Membro.UsuarioComum.nome} - ${bancaUni.Membro.sigla_dept}/UFGJW`,
      25,
      5
    );
  }
  for (const bancaConv of projeto.BancaAvaliadoraConv) {
    addText(`${bancaConv.nome} - ${bancaConv.ies}`, 25, 5);
  }

  doc.setFont("courier", "bold");
  doc.setFontSize(15);
  addText("Orientandos do projeto:", 20, 15);

  doc.setFont("courier", "normal");
  doc.setFontSize(11);

  y += 5;
  autoTable(doc, {
    head: [["Nome", "Curso", "Data de entrada", "Data de saida", "Situacao"]],
    body: orientandosProj,
    startY: y,
    pageBreak: "auto",
    theme: "plain",
    headStyles: { font: "courier" },
    bodyStyles: { font: "courier" },
    didDrawPage: (data) => {
      y = data.cursor ? data.cursor.y + 10 : y + 0;
    },
  });

  doc.setFont("courier", "bold");
  doc.setFontSize(15);
  addText("Topicos e histórico de mensagens:", 20, 10);

  doc.setFont("courier", "normal");
  doc.setFontSize(11);

  if (projeto.Topicos.length === 0) {
    addText("Nenhum tópico foi criado!", 25, 5);
  }

  for (const topico of projeto.Topicos) {
    doc.setFont("courier", "bold");
    addText(`${topico.nome}`, 20, 7);

    const mensagens = topico.Mensagens.map((values) => [
      format(values.data_enviado, "P", { locale: ptBR }),
      values.enviado_por.nome,
      values.conteudo,
    ]);

    y += 5;
    autoTable(doc, {
      head: [["Data de envio", "Enviado por", "Mensagem"]],
      body: mensagens,
      startY: y,
      pageBreak: "auto",
      theme: "plain",
      headStyles: { font: "courier" },
      bodyStyles: { font: "courier" },
      didDrawPage: (data) => {
        y = data.cursor ? data.cursor.y + 10 : y + 0;
      },
    });
  }

  return doc.output();
};
