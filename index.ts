import {
  PrismaClient,
  TipoUsuario,
  TipoProjeto,
  StatusProjeto,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Criando o usuário primeiro
  const usuario = await prisma.usuarioComum.create({
    data: {
      numero_cpf: "99999999999",
      nome: "Maria",
      senha: "12345678",
      tipo: TipoUsuario.DEPARTAMENTO,
    },
  });

  const departamento = await prisma.pessoaDepartamento.create({
    data: {
      numero_cpf: usuario.numero_cpf,
      nome_dept: "Departamento de Economia",
      sigla_dept: "DECO",
    },
  });

  console.log(departamento);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
