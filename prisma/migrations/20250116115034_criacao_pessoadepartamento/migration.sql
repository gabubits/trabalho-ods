/*
  Warnings:

  - You are about to drop the column `nome_dept` on the `PessoaDepartamento` table. All the data in the column will be lost.
  - You are about to drop the `Orientador` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eh_admin` to the `PessoaDepartamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `PessoaDepartamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orientador" DROP CONSTRAINT "Orientador_numero_cpf_fkey";

-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_orientador_cpf_fkey";

-- AlterTable
ALTER TABLE "PessoaDepartamento" DROP COLUMN "nome_dept",
ADD COLUMN     "descricao_pessoal" TEXT,
ADD COLUMN     "eh_admin" BOOLEAN NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL;

-- DropTable
DROP TABLE "Orientador";

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_orientador_cpf_fkey" FOREIGN KEY ("orientador_cpf") REFERENCES "PessoaDepartamento"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
