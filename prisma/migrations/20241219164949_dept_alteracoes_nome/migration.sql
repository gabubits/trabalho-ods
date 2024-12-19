/*
  Warnings:

  - You are about to drop the `Departamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Departamento" DROP CONSTRAINT "Departamento_numero_cpf_fkey";

-- DropTable
DROP TABLE "Departamento";

-- CreateTable
CREATE TABLE "PessoaDepartamento" (
    "numero_cpf" TEXT NOT NULL,
    "nome_dept" TEXT NOT NULL,
    "sigla_dept" TEXT NOT NULL,

    CONSTRAINT "PessoaDepartamento_pkey" PRIMARY KEY ("numero_cpf")
);

-- CreateIndex
CREATE UNIQUE INDEX "PessoaDepartamento_numero_cpf_key" ON "PessoaDepartamento"("numero_cpf");

-- AddForeignKey
ALTER TABLE "PessoaDepartamento" ADD CONSTRAINT "PessoaDepartamento_numero_cpf_fkey" FOREIGN KEY ("numero_cpf") REFERENCES "UsuarioComum"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
