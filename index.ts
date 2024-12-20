import {
  PrismaClient,
  TipoUsuario,
  TipoProjeto,
  StatusProjeto,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {


  const numeroCpf = "99999999999";
  const nomeDept = "Departamento de Letras";
  const siglaDept = "DE";


  const usuarioExistente = await prisma.usuarioComum.findUnique({
    where: { numero_cpf: numeroCpf },
  });

  if (usuarioExistente) {
    console.error(`Usuário com CPF ${numeroCpf} já existe.`);
    return;
  }

  const novoDepartamento = await prisma.usuarioComum.create({
    data: {
      numero_cpf: numeroCpf,
      nome: "Joice Cristina",
      senha: "123456789",
      tipo: "DEPARTAMENTO",
      departamento: {
        create: {
          nome_dept: nomeDept,
          sigla_dept: siglaDept,
        },
      },
    },
  });

  console.log("Pessoa do tipo Departamento cadastrada com sucesso:", novoDepartamento);
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
