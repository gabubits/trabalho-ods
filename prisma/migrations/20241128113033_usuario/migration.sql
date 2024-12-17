/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coordenadoria" DROP CONSTRAINT "Coordenadoria_numero_cpf_fkey";

-- DropForeignKey
ALTER TABLE "Orientador" DROP CONSTRAINT "Orientador_numero_cpf_fkey";

-- DropForeignKey
ALTER TABLE "Orientando" DROP CONSTRAINT "Orientando_numero_cpf_fkey";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "UsuarioComum" (
    "numero_cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "UsuarioComum_pkey" PRIMARY KEY ("numero_cpf")
);

-- AddForeignKey
ALTER TABLE "Orientador" ADD CONSTRAINT "Orientador_numero_cpf_fkey" FOREIGN KEY ("numero_cpf") REFERENCES "UsuarioComum"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientando" ADD CONSTRAINT "Orientando_numero_cpf_fkey" FOREIGN KEY ("numero_cpf") REFERENCES "UsuarioComum"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordenadoria" ADD CONSTRAINT "Coordenadoria_numero_cpf_fkey" FOREIGN KEY ("numero_cpf") REFERENCES "UsuarioComum"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
