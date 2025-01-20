-- CreateTable
CREATE TABLE "Departamento" (
    "sigla_dept" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("sigla_dept")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_sigla_dept_key" ON "Departamento"("sigla_dept");

-- AddForeignKey
ALTER TABLE "PessoaDepartamento" ADD CONSTRAINT "PessoaDepartamento_sigla_dept_fkey" FOREIGN KEY ("sigla_dept") REFERENCES "Departamento"("sigla_dept") ON DELETE RESTRICT ON UPDATE CASCADE;
