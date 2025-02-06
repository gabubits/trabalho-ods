/*
  Warnings:

  - The values [deferido,indeferido,em_andamento] on the enum `SituacaoSolicitacao` will be removed. If these variants are still used in the database, this will fail.
  - The values [ORIENTADOR,DEPARTAMENTO] on the enum `TipoUsuario` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SituacaoSolicitacao_new" AS ENUM ('DEFERIDO', 'INDEFERIDO', 'EM_ANDAMENTO');
ALTER TABLE "SolicitacaoAlteracao" ALTER COLUMN "situacao" TYPE "SituacaoSolicitacao_new" USING ("situacao"::text::"SituacaoSolicitacao_new");
ALTER TYPE "SituacaoSolicitacao" RENAME TO "SituacaoSolicitacao_old";
ALTER TYPE "SituacaoSolicitacao_new" RENAME TO "SituacaoSolicitacao";
DROP TYPE "SituacaoSolicitacao_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TipoUsuario_new" AS ENUM ('ORIENTANDO', 'PESSOADEPARTAMENTO');
ALTER TABLE "UsuarioComum" ALTER COLUMN "tipo" TYPE "TipoUsuario_new" USING ("tipo"::text::"TipoUsuario_new");
ALTER TYPE "TipoUsuario" RENAME TO "TipoUsuario_old";
ALTER TYPE "TipoUsuario_new" RENAME TO "TipoUsuario";
DROP TYPE "TipoUsuario_old";
COMMIT;
