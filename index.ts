import {
  PrismaClient,
  TipoUsuario,
  TipoProjeto,
  StatusProjeto,
} from "@prisma/client";

const prisma = new PrismaClient();



async function main() {
  const admin = await prisma.usuarioComum.update({
    where: {
      numero_cpf: "88888888888"
    },
    data: {
      nome: 'André',
      departamento: {
        update: {
          data: {
            nome_dept: 'Departamento de Economia',
            sigla_dept: 'DECO'
          }
        }
      }
    }
  })

  console.log(admin);
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
