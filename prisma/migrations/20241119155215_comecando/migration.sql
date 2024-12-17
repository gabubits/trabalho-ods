-- CreateEnum
CREATE TYPE "SituacaoSolicitacao" AS ENUM ('deferido', 'indeferido', 'em_andamento');

-- CreateTable
CREATE TABLE "Usuario" (
    "numero_cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("numero_cpf")
);

-- CreateTable
CREATE TABLE "Orientador" (
    "numero_cpf" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "descricao_pessoal" TEXT,

    CONSTRAINT "Orientador_pkey" PRIMARY KEY ("numero_cpf")
);

-- CreateTable
CREATE TABLE "Orientando" (
    "numero_cpf" TEXT NOT NULL,
    "curso" TEXT NOT NULL,

    CONSTRAINT "Orientando_pkey" PRIMARY KEY ("numero_cpf")
);

-- CreateTable
CREATE TABLE "Coordenadoria" (
    "numero_cpf" TEXT NOT NULL,

    CONSTRAINT "Coordenadoria_pkey" PRIMARY KEY ("numero_cpf")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_termino" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT,
    "orientador_cpf" TEXT NOT NULL,
    "banca_avaliadora_convidada" TEXT,
    "apresentacoes" TEXT,
    "banca_local" TEXT,
    "banca_data" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjetoOrientando" (
    "projeto_id" INTEGER NOT NULL,
    "orientando_cpf" TEXT NOT NULL,
    "data_entrada" TIMESTAMP(3) NOT NULL,
    "data_saida" TIMESTAMP(3) NOT NULL,
    "situacao" TEXT NOT NULL,
    "orientandoNumero_cpf" TEXT,
    "projetoId" INTEGER,

    CONSTRAINT "ProjetoOrientando_pkey" PRIMARY KEY ("projeto_id","orientando_cpf")
);

-- CreateTable
CREATE TABLE "Topico" (
    "id" SERIAL NOT NULL,
    "projeto_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "data_termino" TIMESTAMP(3),
    "tipo" TEXT,

    CONSTRAINT "Topico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensagem" (
    "id" SERIAL NOT NULL,
    "topico_id" INTEGER NOT NULL,
    "conteudo" TEXT NOT NULL,
    "enviado_por" INTEGER NOT NULL,
    "data_enviado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BancaAvaliadora" (
    "projeto_id" INTEGER NOT NULL,
    "membro_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ies" TEXT NOT NULL,

    CONSTRAINT "BancaAvaliadora_pkey" PRIMARY KEY ("projeto_id","membro_id")
);

-- CreateTable
CREATE TABLE "SolicitacaoAlteracao" (
    "id" SERIAL NOT NULL,
    "projeto_id" INTEGER NOT NULL,
    "assunto_principal" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "situacao" "SituacaoSolicitacao" NOT NULL,

    CONSTRAINT "SolicitacaoAlteracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoProjeto" (
    "id" SERIAL NOT NULL,
    "projeto_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "conteudo" TEXT NOT NULL,

    CONSTRAINT "HistoricoProjeto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orientador_numero_cpf_key" ON "Orientador"("numero_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Orientando_numero_cpf_key" ON "Orientando"("numero_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Coordenadoria_numero_cpf_key" ON "Coordenadoria"("numero_cpf");

-- AddForeignKey
ALTER TABLE "Orientador" ADD CONSTRAINT "Orientador_numero_cpf_fkey" FOREIGN KEY ("numero_cpf") REFERENCES "Usuario"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientando" ADD CONSTRAINT "Orientando_numero_cpf_fkey" FOREIGN KEY ("numero_cpf") REFERENCES "Usuario"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordenadoria" ADD CONSTRAINT "Coordenadoria_numero_cpf_fkey" FOREIGN KEY ("numero_cpf") REFERENCES "Usuario"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_orientador_cpf_fkey" FOREIGN KEY ("orientador_cpf") REFERENCES "Orientador"("numero_cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetoOrientando" ADD CONSTRAINT "ProjetoOrientando_orientandoNumero_cpf_fkey" FOREIGN KEY ("orientandoNumero_cpf") REFERENCES "Orientando"("numero_cpf") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetoOrientando" ADD CONSTRAINT "ProjetoOrientando_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topico" ADD CONSTRAINT "Topico_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_topico_id_fkey" FOREIGN KEY ("topico_id") REFERENCES "Topico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BancaAvaliadora" ADD CONSTRAINT "BancaAvaliadora_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoAlteracao" ADD CONSTRAINT "SolicitacaoAlteracao_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoProjeto" ADD CONSTRAINT "HistoricoProjeto_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
