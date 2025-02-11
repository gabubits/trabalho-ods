/*
  Warnings:

  - The primary key for the `ProjetoOrientando` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProjetoOrientando" DROP CONSTRAINT "ProjetoOrientando_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "situacao" DROP NOT NULL,
ADD CONSTRAINT "ProjetoOrientando_pkey" PRIMARY KEY ("id");
