/*
  Warnings:

  - You are about to drop the column `orientandoNumero_cpf` on the `ProjetoOrientando` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjetoOrientando" DROP CONSTRAINT "ProjetoOrientando_orientandoNumero_cpf_fkey";

-- AlterTable
ALTER TABLE "ProjetoOrientando" DROP COLUMN "orientandoNumero_cpf";

-- AddForeignKey
ALTER TABLE "ProjetoOrientando" ADD CONSTRAINT "ProjetoOrientando_orientando_cpf_fkey" FOREIGN KEY ("orientando_cpf") REFERENCES "Orientando"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
