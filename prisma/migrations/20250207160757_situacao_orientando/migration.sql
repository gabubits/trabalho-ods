/*
  Warnings:

  - Added the required column `situacao` to the `ProjetoOrientando` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SituacaoOrientando" AS ENUM ('ORIENTANDO', 'EXORIENTANDO');

-- AlterTable
ALTER TABLE "ProjetoOrientando" DROP COLUMN "situacao",
ADD COLUMN     "situacao" "SituacaoOrientando" NOT NULL;
