import { z } from "zod";

export const CriarPOrientSchema = z.object({
  numero_cpf: z
    .string()
    .trim()
    .regex(/^[0-9]*$/, "O CPF deve ter somente números.")
    .length(11, { message: "O CPF deve ter 11 números." }),
  nome: z.string().nonempty({ message: "Digite o nome." }),
  curso: z.string().nonempty({ message: "Digite a sigla do curso." }),
});

export const AtualizarPOrientSchema = z.object({
  numero_cpf: z
    .string()
    .trim()
    .length(11, { message: "O CPF deve ter 11 números." }),
  nome: z.string().nonempty({ message: "Digite o nome." }),
  curso: z.string().nonempty({ message: "Digite a sigla do curso." }),
});
