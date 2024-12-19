/*
  Warnings:

  - Added the required column `nome_dept` to the `Departamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sigla_dept` to the `Departamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Departamento" ADD COLUMN     "nome_dept" TEXT NOT NULL,
ADD COLUMN     "sigla_dept" TEXT NOT NULL;
