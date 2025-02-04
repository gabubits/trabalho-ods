import { TipoProjeto, TipoUsuario } from "@prisma/client";
import { z } from "zod";

export const CriarPDeptSchema = z.object({
  numero_cpf: z
    .string()
    .trim()
    .regex(/^[0-9]*$/, "O CPF deve ter somente números.")
    .length(11, { message: "O CPF deve ter 11 números." }),
  nome: z.string().nonempty({ message: "Digite o nome." }),
  senha: z
    .string()
    .trim()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
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
