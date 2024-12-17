/*
  Warnings:

  - The primary key for the `BancaAvaliadora` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BancaAvaliadora" DROP CONSTRAINT "BancaAvaliadora_pkey",
ALTER COLUMN "membro_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BancaAvaliadora_pkey" PRIMARY KEY ("projeto_id", "membro_id");
