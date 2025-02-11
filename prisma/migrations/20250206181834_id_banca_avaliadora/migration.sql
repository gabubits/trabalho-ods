/*
  Warnings:

  - The primary key for the `BancaAvaliadora` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `membro_id` on the `BancaAvaliadora` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BancaAvaliadora" DROP CONSTRAINT "BancaAvaliadora_pkey",
DROP COLUMN "membro_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BancaAvaliadora_pkey" PRIMARY KEY ("id");
