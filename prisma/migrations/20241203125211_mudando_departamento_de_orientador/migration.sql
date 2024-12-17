/*
  Warnings:

  - You are about to drop the column `departamento` on the `Orientador` table. All the data in the column will be lost.
  - Added the required column `departamentoCurso` to the `Orientador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orientador" DROP COLUMN "departamento",
ADD COLUMN     "departamentoCurso" TEXT NOT NULL;
