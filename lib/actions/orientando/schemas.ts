import { z } from "zod";

export const CriarPOrientSchema = z.object({
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
    curso: z
        .string()
        .nonempty({ message: "Digite a sigla do curso." }),
});

export const AtualizarPOrientSchema = z.object({
    numero_cpf: z
        .string()
        .trim()
        .length(11, { message: "O CPF deve ter 11 números." }),
    nome: z.string().nonempty({ message: "Digite o nome." }),
    nome_dept: z.string().nonempty({ message: "Digite o nome do departamento." }),
    curso: z
        .string()
        .nonempty({ message: "Digite a sigla do curso." }),
});