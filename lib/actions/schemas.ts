import { z } from "zod";

export const CriarPDeptSchema = z.object({
  numero_cpf: z
    .string()
    .trim()
    .length(11, { message: "O CPF deve ter 11 números." }),
  nome: z.string().nonempty({ message: "Digite o nome." }),
  senha: z
    .string()
    .trim()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
  nome_dept: z.string().nonempty({ message: "Digite o nome do departamento." }),
  sigla_dept: z
    .string()
    .nonempty({ message: "Digite o nome do departamento." }),
});

export const AtualizarPessoaDeptchema = z.object({
  numero_cpf: z
    .string()
    .trim()
    .length(11, { message: "O CPF deve ter 11 números." }),
  nome: z.string().nonempty({ message: "Digite o nome." }),
  senha: z
    .string()
    .trim()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
  nome_dept: z.string().nonempty({ message: "Digite o nome do departamento." }),
  sigla_dept: z
    .string()
    .nonempty({ message: "Digite o nome do departamento." }),
});
