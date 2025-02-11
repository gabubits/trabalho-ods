/*
  Warnings:

  - You are about to drop the `BancaAvaliadora` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BancaAvaliadora" DROP CONSTRAINT "BancaAvaliadora_projeto_id_fkey";

-- DropTable
DROP TABLE "BancaAvaliadora";

-- CreateTable
CREATE TABLE "BancaAvaliadoraUniversidade" (
    "cpf" TEXT NOT NULL,
    "projeto_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "BancaAvaliadoraUniversidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BancaAvaliadoraConvidada" (
    "projeto_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ies" TEXT NOT NULL,

    CONSTRAINT "BancaAvaliadoraConvidada_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BancaAvaliadoraUniversidade" ADD CONSTRAINT "BancaAvaliadoraUniversidade_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BancaAvaliadoraUniversidade" ADD CONSTRAINT "BancaAvaliadoraUniversidade_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "PessoaDepartamento"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BancaAvaliadoraConvidada" ADD CONSTRAINT "BancaAvaliadoraConvidada_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
