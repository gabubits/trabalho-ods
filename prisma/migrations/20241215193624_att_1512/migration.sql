/*
  Warnings:

  - You are about to drop the column `enviado_por` on the `Mensagem` table. All the data in the column will be lost.
  - You are about to drop the column `departamentoCurso` on the `Orientador` table. All the data in the column will be lost.
  - You are about to drop the column `banca_avaliadora_convidada` on the `Projeto` table. All the data in the column will be lost.
  - The `status` column on the `Projeto` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `enviado_por_id` to the `Mensagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `Orientador` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `Projeto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusProjeto" AS ENUM ('NAO_INICIADO', 'EM_ANDAMENTO', 'CONCLUIDO');

-- CreateEnum
CREATE TYPE "TipoProjeto" AS ENUM ('EXTENSAO', 'IC', 'TCC');

-- AlterTable
ALTER TABLE "Mensagem" DROP COLUMN "enviado_por",
ADD COLUMN     "enviado_por_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Orientador" DROP COLUMN "departamentoCurso",
ADD COLUMN     "departamento" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "banca_avaliadora_convidada",
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoProjeto" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusProjeto";

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_enviado_por_id_fkey" FOREIGN KEY ("enviado_por_id") REFERENCES "UsuarioComum"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
