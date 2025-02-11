/*
  Warnings:

  - Added the required column `cpf` to the `BancaAvaliadoraConvidada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BancaAvaliadoraConvidada" ADD COLUMN     "cpf" TEXT NOT NULL;
