import {
  SituacaoOrientando,
  StatusProjeto,
  TipoProjeto,
  TipoUsuario,
} from "@prisma/client";
import { z } from "zod";

export const CriarPDeptSchema = z.object({
  numero_cpf: z
    .string()
    .trim()
    .regex(/^[0-9]*$/, "O CPF deve ter somente números.")
    .length(11, { message: "O CPF deve ter 11 números." }),
  nome: z.string().nonempty({ message: "Digite o nome." }),
  sigla_dept: z.string().nonempty({ message: "Selecione um departamento" }),
  tipo_pessoa: z.nativeEnum(TipoUsuario),
});

export const AtualizarPDeptSchema = z.object({
  numero_cpf: z
    .string()
    .trim()
    .length(11, { message: "O CPF deve ter 11 números." }),
  nome: z.string().nonempty({ message: "Digite o nome." }),
  sigla_dept: z.string().nonempty({ message: "Selecione um departamento." }),
  tipo_pessoa: z.nativeEnum(TipoUsuario),
});

export const CriarDeptSchema = z.object({
  sigla_dept: z
    .string()
    .nonempty({ message: "Digite a sigla do departamento." }),
  nome: z.string().nonempty({ message: "Digite o nome do departamento." }),
});

export const AtualizarDeptSchema = z.object({
  sigla_dept_nova: z
    .string()
    .nonempty({ message: "Digite a sigla do departamento." }),
  sigla_dept_antiga: z.string(),
  nome: z.string().nonempty({ message: "Digite o nome do departamento." }),
});

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

export const CriarTopicoSchema = z.object({
  nome: z.string().min(1, { message: "Digite o nome do tópico" }),
  descricao: z.string().trim(),
  data_termino: z.date({ required_error: "Informe a data de término" }),
  tipo: z.string({ required_error: "Selecione o tipo do tópico" }),
});

export const AtualizarTopicoSchema = z.object({
  nome: z.string().min(1, { message: "Digite o nome do tópico" }),
  descricao: z.string().trim(),
  data_termino: z.date({ required_error: "Informe a data de término" }),
  tipo: z.string({ required_error: "Selecione o tipo do tópico" }),
});

export const EditarMensagemSchema = z.object({
  conteudo: z.string().min(1, { message: "Digite o corpo da mensagem!" }),
});

export const EnviarMensagemSchema = z.object({
  conteudo: z.string().min(1, { message: "Digite o corpo da mensagem!" }),
});

export const AtualizarProjetoSchema = z.object({
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
  status: z.nativeEnum(StatusProjeto, {
    required_error: "Selecione o status!",
  }),
  link_certificado: z.string(),
});

export const RegistrarMembroBAUniSchema = z.object({
  cpf: z
    .string()
    .trim()
    .regex(/^[0-9]*$/, "O CPF deve ter somente números.")
    .length(11, { message: "O CPF deve ter 11 números." }),
});

export const RegistrarMembroBAConvSchema = z.object({
  nome: z.string().min(1, { message: "Digite o nome do membro!" }),
  ies: z
    .string()
    .min(1, { message: "Digite o nome da IES de origem do membro!" }),
  cpf: z
    .string()
    .trim()
    .regex(/^[0-9]*$/, "O CPF deve ter somente números.")
    .length(11, { message: "O CPF deve ter 11 números." }),
});

export const AlterarInfosBancaSchema = z.object({
  banca_local: z.string().trim(),
  banca_data: z.date(),
  apresentacoes: z.string().trim(),
});

export const AdicionarOrientandoSchema = z.object({
  orientando_cpf: z
    .string()
    .trim()
    .regex(/^[0-9]*$/, "O CPF deve ter somente números.")
    .length(11, { message: "O CPF deve ter 11 números." }),
  data_entrada: z.date(),
  data_saida: z.date(),
});

export const AlterarInfosOrientandoSchema = z.object({
  data_entrada: z.date(),
  data_saida: z.date(),
  situacao: z.nativeEnum(SituacaoOrientando),
});

export const AlterarSenhaSchema = z
  .object({
    senha: z.string().min(8, { message: "Mínimo de 8 caracteres!" }),
    repetirSenha: z.string().min(8, { message: "Mínimo de 8 caracteres!" }),
  })
  .superRefine(({ repetirSenha, senha }, ctx) => {
    if (repetirSenha !== senha) {
      ctx.addIssue({
        code: "custom",
        message: "Senhas não combinam!",
        path: ["repetirSenha"],
      });
    }
  });
