/*
  Warnings:

  - You are about to drop the column `projetoId` on the `ProjetoOrientando` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjetoOrientando" DROP CONSTRAINT "ProjetoOrientando_projetoId_fkey";

-- AlterTable
ALTER TABLE "ProjetoOrientando" DROP COLUMN "projetoId";

-- AddForeignKey
ALTER TABLE "ProjetoOrientando" ADD CONSTRAINT "ProjetoOrientando_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
