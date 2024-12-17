/*
  Warnings:

  - You are about to drop the `Coordenadoria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coordenadoria" DROP CONSTRAINT "Coordenadoria_numero_cpf_fkey";

-- DropTable
DROP TABLE "Coordenadoria";

-- CreateTable
CREATE TABLE "Departamento" (
    "numero_cpf" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("numero_cpf")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_numero_cpf_key" ON "Departamento"("numero_cpf");

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_numero_cpf_fkey" FOREIGN KEY ("numero_cpf") REFERENCES "UsuarioComum"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
