/*
  Warnings:

  - You are about to drop the `SolicitacaoAlteracao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SolicitacaoAlteracao" DROP CONSTRAINT "SolicitacaoAlteracao_projeto_id_fkey";

-- DropTable
DROP TABLE "SolicitacaoAlteracao";
