/*
  Warnings:

  - You are about to drop the `HistoricoProjeto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoricoProjeto" DROP CONSTRAINT "HistoricoProjeto_projeto_id_fkey";

-- DropTable
DROP TABLE "HistoricoProjeto";

-- CreateTable
CREATE TABLE "HistoricoSistema" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "conteudo" TEXT NOT NULL,

    CONSTRAINT "HistoricoSistema_pkey" PRIMARY KEY ("id")
);
