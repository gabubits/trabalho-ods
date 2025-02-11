"use server";

import prisma from "@/prisma/db";
import { jsPDF } from "jspdf";
import { verifySession } from "./session";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import autoTable from "jspdf-autotable";

export const gerarRelatorioSis = async () => {
  const session = await verifySession();

  const { nome } = await prisma.usuarioComum.findFirstOrThrow({
    where: {
      numero_cpf: session.usuario_cpf,
    },
    select: {
      nome: true,
    },
  });

  const todosDepartamentos = await prisma.departamento.findMany({});

  const todosPdepts = await prisma.pessoaDepartamento.findMany({
    include: {
      UsuarioComum: {
        select: {
          nome: true,
        },
      },
    },
  });

  const todosOrientandos = await prisma.orientando.findMany({
    include: {
      UsuarioComum: {
        select: {
          nome: true,
        },
      },
    },
  });

  const todosProjetos = await prisma.projeto.findMany({
    include: {
      Orientador: {
        include: {
          UsuarioComum: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
  });

  const getProjetosPorDepartamento = async () => {
    const projetosPorDepartamento = await prisma.departamento.findMany({
      select: {
        sigla_dept: true,
        nome: true,
        pessoas: {
          select: {
            projetos: {
              select: {
                tipo: true,
              },
            },
          },
        },
      },
    });

    const resultado = projetosPorDepartamento.map((dept) => {
      const projetos = dept.pessoas.flatMap((pessoa) => pessoa.projetos);

      const contagem = {
        TCC: projetos.filter((p) => p.tipo === "TCC").length,
        IC: projetos.filter((p) => p.tipo === "IC").length,
        Extensao: projetos.filter((p) => p.tipo === "EXTENSAO").length,
      };

      return [
        dept.sigla_dept,
        contagem.TCC,
        contagem.IC,
        contagem.Extensao,
        contagem.TCC + contagem.IC + contagem.Extensao,
      ];
    });

    return resultado;
  };

  const projsPorDepart = await getProjetosPorDepartamento();

  async function getHistoricoParticipacaoOrientandos() {
    const historico = await prisma.projetoOrientando.findMany({
      select: {
        Orientando: {
          select: {
            UsuarioComum: {
              select: { nome: true },
            },
            curso: true,
          },
        },
        Projeto: {
          select: {
            nome: true,
          },
        },
        data_entrada: true,
        data_saida: true,
        situacao: true,
      },
      orderBy: {
        data_entrada: "asc",
      },
    });

    const resultado = historico.map((registro) => [
      registro.Orientando.UsuarioComum.nome,
      registro.Orientando.curso,
      registro.Projeto.nome,
      format(registro.data_entrada, "P", { locale: ptBR }),
      format(registro.data_saida, "P", { locale: ptBR }),
      registro.situacao === "ORIENTANDO" ? "Orientando" : "Ex-orientando",
    ]);

    return resultado;
  }

  const histPartOrien = await getHistoricoParticipacaoOrientandos();

  const getHistoricoSistema = async () => {
    const historico = await prisma.historicoSistema.findMany({});

    const resultado = historico.map((value) => [
      format(value.data, "P", { locale: ptBR }),
      value.conteudo,
    ]);

    return resultado;
  };

  const historicoSistema = await getHistoricoSistema();

  function removerAcentos(str: string) {
    return str.normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

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
  addText("SUP UFGJW - Relatorio de sistema", 20, 0);

  doc.setFont("courier", "normal");
  doc.setFontSize(11);
  addText(`Gerado por: ${nome} (CPF: ${session.usuario_cpf})`, 20, 10);
  addText(`Data: ${format(new Date(), "PPpp", { locale: ptBR })}`, 20, 5);

  doc.setFont("courier", "bold");
  addText("Departamentos: ", 20, 10);

  doc.setFont("courier", "normal");

  addText(
    todosDepartamentos.length !== 0
      ? `${todosDepartamentos[0].sigla_dept} - ${todosDepartamentos[0].nome}`
      : "Sem departamentos cadastrados no momento.",
    25,
    5
  );

  for (let i = 1; i < todosDepartamentos.length; i++) {
    addText(
      `${todosDepartamentos[i].sigla_dept} - ${todosDepartamentos[i].nome}`,
      25,
      5
    );
  }

  doc.setFont("courier", "bold");
  addText("Administradores de Dept. e Orientadores:", 20, 10);

  doc.setFont("courier", "normal");
  addText(
    todosPdepts.length !== 0
      ? `${todosPdepts[0].UsuarioComum.nome} - ${todosPdepts[0].sigla_dept} (CPF: ${todosPdepts[0].numero_cpf})`
      : "Sem administradores ou orientadores cadastrados no momento.",
    25,
    5
  );

  for (let i = 1; i < todosPdepts.length; i++) {
    addText(
      `${todosPdepts[0].UsuarioComum.nome} - ${todosPdepts[0].sigla_dept} (CPF: ${todosPdepts[0].numero_cpf})`,
      25,
      5
    );
  }

  doc.setFont("courier", "bold");
  addText("Orientandos:", 20, 10);

  doc.setFont("courier", "normal");
  addText(
    todosOrientandos.length !== 0
      ? `${todosOrientandos[0].UsuarioComum.nome} - ${todosOrientandos[0].curso} (CPF: ${todosOrientandos[0].numero_cpf})`
      : "Sem orientandos cadastrados no momento.",
    25,
    5
  );

  for (let i = 1; i < todosOrientandos.length; i++) {
    addText(
      `${todosOrientandos[0].UsuarioComum.nome} - ${todosOrientandos[0].curso} (CPF: ${todosOrientandos[0].numero_cpf})`,
      25,
      5
    );
  }

  doc.setFont("courier", "bold");
  addText("Projetos", 20, 10);

  doc.setFont("courier", "normal");
  if (todosProjetos.length !== 0) {
    addText(`${todosProjetos[0].nome}`, 25, 5);
    addText(`Tipo: ${todosProjetos[0].tipo}`, 30, 5);
    addText(
      `Orientador: ${todosProjetos[0].Orientador.UsuarioComum.nome}`,
      30,
      5
    );
  } else {
    addText(`Sem projetos cadastrados no momento.`, 25, 5);
  }

  for (let i = 1; i < todosProjetos.length; i++) {
    addText(`${todosProjetos[i].nome}`, 25, 5);
    addText(`Tipo: ${todosProjetos[i].tipo}`, 30, 5);
    addText(
      `Orientador: ${todosProjetos[i].Orientador.UsuarioComum.nome}`,
      30,
      5
    );
  }

  doc.setFont("courier", "bold");
  doc.setFontSize(15);
  addText("Projetos por departamento", 20, 15);

  doc.setFont("courier", "normal");
  doc.setFontSize(11);

  y += 5;
  autoTable(doc, {
    head: [["Sigla", "TCCs", "ICs", "Extensoes", "Total"]],
    body: projsPorDepart,
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
  addText("Historico de participacao de Orientandos em Projs.", 20, 15);

  doc.setFont("courier", "normal");
  doc.setFontSize(11);

  y += 5;
  autoTable(doc, {
    head: [
      [
        "Nome",
        "Curso",
        "Projeto",
        "Data de entrada",
        "Data de saida",
        "Situacao",
      ],
    ],
    body: histPartOrien,
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
  addText("Historico de alteraçoes no sistema", 20, 15);

  doc.setFont("courier", "normal");
  doc.setFontSize(11);

  y += 5;
  autoTable(doc, {
    head: [["Data", "Conteudo"]],
    body: historicoSistema,
    startY: y,
    pageBreak: "auto",
    theme: "plain",
    headStyles: { font: "courier" },
    bodyStyles: { font: "courier" },
    didDrawPage: (data) => {
      y = data.cursor ? data.cursor.y + 10 : y + 0;
    },
  });
  return doc.output();
};
