/*
  Warnings:

  - Made the column `status` on table `Projeto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Projeto" ALTER COLUMN "status" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Orientando" ADD CONSTRAINT "Orientando_curso_fkey" FOREIGN KEY ("curso") REFERENCES "Departamento"("sigla_dept") ON DELETE RESTRICT ON UPDATE CASCADE;
