import {
  PrismaClient,
  TipoUsuario,
  TipoProjeto,
  StatusProjeto,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const orientadorCpf = "12345678900";
  const orientandoCpf = "98765432100";


  const nomeOrientando = "João da Silva";
  const senhaOrientando = "senha123";
  const cursoOrientando = "Engenharia de Software";


  const topicoId = 1;
  const conteudoMensagem = "Muito interessante essa discussão!";

  const orientador = await prisma.orientador.findUnique({
    where: { numero_cpf: orientadorCpf },
  });

  if (!orientador) {
    console.error(`Orientador com CPF ${orientadorCpf} não encontrado.`);
    return;
  }


  const topico = await prisma.topico.findUnique({
    where: { id: topicoId },
  });

  if (!topico) {
    console.error(`Tópico com ID ${topicoId} não encontrado.`);
    return;
  }


  const usuarioOrientando = await prisma.usuarioComum.create({
    data: {
      numero_cpf: orientandoCpf,
      nome: nomeOrientando,
      senha: senhaOrientando,
      tipo: "ORIENTANDO",
      orientando: {
        create: {
          curso: cursoOrientando,
        },
      },
    },
  });

  console.log("Usuário Orientando cadastrado:", usuarioOrientando);


  const novaMensagem = await prisma.mensagem.create({
    data: {
      topico_id: topicoId,
      conteudo: conteudoMensagem,
      enviado_por_id: orientandoCpf,
      data_enviado: new Date(),
    },
  });

  console.log("Mensagem cadastrada com sucesso:", novaMensagem);
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
