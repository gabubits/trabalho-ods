import {
  PrismaClient,
  TipoUsuario,
  TipoProjeto,
  StatusProjeto,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usuariosASeremApagados = await prisma.pessoaDepartamento.findMany({
    where: {
      sigla_dept: "DVOM",
    },
    select: {
      numero_cpf: true,
      projetos: {
        select: {
          id: true,
          ProjetosOrientando: {
            select: {
              projeto_id: true,
              orientando_cpf: true,
            },
          },
          Topicos: {
            select: {
              id: true,
              Mensagens: {
                select: {
                  id: true,
                },
              },
            },
          },
          BancaAvaliadora: {
            select: {
              projeto_id: true,
              membro_id: true,
            },
          },
          Historicos: {
            select: {
              id: true,
            },
          },
          Solicitacoes: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  for (const usuario of usuariosASeremApagados) {
    for (const projeto of usuario.projetos) {
      for (const orientando of projeto.ProjetosOrientando) {
        await prisma.projetoOrientando.delete({
          where: {
            projeto_id_orientando_cpf: {
              projeto_id: orientando.projeto_id,
              orientando_cpf: orientando.orientando_cpf,
            },
          },
        });
      }

      for (const topico of projeto.Topicos) {
        for (const mensagem of topico.Mensagens) {
          await prisma.mensagem.delete({
            where: {
              id: mensagem.id,
            },
          });
        }

        await prisma.topico.delete({
          where: {
            id: topico.id,
          },
        });
      }

      for (const bancaA of projeto.BancaAvaliadora) {
        await prisma.bancaAvaliadora.delete({
          where: {
            projeto_id_membro_id: {
              projeto_id: bancaA.projeto_id,
              membro_id: bancaA.membro_id,
            },
          },
        });
      }

      for (const historico of projeto.Historicos) {
        await prisma.historicoProjeto.delete({
          where: {
            id: historico.id,
          },
        });
      }

      for (const solicit of projeto.Solicitacoes) {
        await prisma.solicitacaoAlteracao.delete({
          where: {
            id: solicit.id,
          },
        });
      }

      await prisma.projeto.delete({
        where: {
          id: projeto.id,
        },
      });
    }

    await prisma.pessoaDepartamento.delete({
      where: {
        numero_cpf: usuario.numero_cpf,
      },
    });

    await prisma.usuarioComum.delete({
      where: {
        numero_cpf: usuario.numero_cpf,
      },
    });
  }

  await prisma.departamento.delete({
    where: {
      sigla_dept: "DVOM",
    },
  });
}

async function main2() {
  const a = await prisma.pessoaDepartamento.findMany({
    where: {
      sigla_dept: "DVOM",
    },
    select: {
      numero_cpf: true,
      projetos: {
        select: {
          id: true,
          ProjetosOrientando: {
            select: {
              projeto_id: true,
              orientando_cpf: true,
            },
          },
          Topicos: {
            select: {
              id: true,
              Mensagens: {
                select: {
                  id: true,
                },
              },
            },
          },
          BancaAvaliadora: {
            select: {
              projeto_id: true,
              membro_id: true,
            },
          },
          Historicos: {
            select: {
              id: true,
            },
          },
          Solicitacoes: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  for (const usuario of a) {
    for (const projeto of usuario.projetos) {
      for (const orientando of projeto.ProjetosOrientando) {
        await prisma.projetoOrientando.delete({
          where: {
            projeto_id_orientando_cpf: {
              projeto_id: orientando.projeto_id,
              orientando_cpf: orientando.orientando_cpf,
            },
          },
        });
      }

      for (const topico of projeto.Topicos) {
        for (const mensagem of topico.Mensagens) {
          await prisma.mensagem.delete({
            where: {
              id: mensagem.id,
            },
          });
        }

        await prisma.topico.delete({
          where: {
            id: topico.id,
          },
        });
      }

      for (const bancaA of projeto.BancaAvaliadora) {
        await prisma.bancaAvaliadora.delete({
          where: {
            projeto_id_membro_id: {
              projeto_id: bancaA.projeto_id,
              membro_id: bancaA.membro_id,
            },
          },
        });
      }

      for (const historico of projeto.Historicos) {
        await prisma.historicoProjeto.delete({
          where: {
            id: historico.id,
          },
        });
      }

      for (const solicit of projeto.Solicitacoes) {
        await prisma.solicitacaoAlteracao.delete({
          where: {
            id: solicit.id,
          },
        });
      }

      await prisma.projeto.delete({
        where: {
          id: projeto.id,
        },
      });
    }

    await prisma.pessoaDepartamento.delete({
      where: {
        numero_cpf: usuario.numero_cpf,
      },
    });

    await prisma.usuarioComum.delete({
      where: {
        numero_cpf: usuario.numero_cpf,
      },
    });
  }

  await prisma.departamento.delete({
    where: {
      sigla_dept: "DVOM",
    },
  });
}


async function main3() {

  const departamento = await prisma.departamento.create({
    data: {
      sigla_dept: "DECO",
      nome: "Departamento de Economia",
    },
  });


  const orientando = await prisma.usuarioComum.create({
    data: {
      numero_cpf: "11111111111",
      nome: "João Silva",
      senha: "12345678",
      tipo: TipoUsuario.ORIENTANDO,
      orientando: {
        create: {
          curso: "DECO",
        },
      },
    },
  });

  const orientador = await prisma.usuarioComum.create({
    data: {
      numero_cpf: "22222222222",
      nome: "Maria Oliveira",
      senha: "12345678",
      tipo: TipoUsuario.ORIENTADOR,
      orientador: {
        create: {
          sigla_dept: "DECO",
          descricao_pessoal: "Professora com experiência em Economia",
        },
      },
    },
  });

  const admDept = await prisma.usuarioComum.create({
    data: {
      numero_cpf: "99999999999",
      nome: "Carlos Santos",
      senha: "12345678",
      tipo: TipoUsuario.ADM_DEPT,
      orientador: {
        create: {
          sigla_dept: "DECO",
          descricao_pessoal: "Administrador do Departamento de Economia",
        },
      },
    },
  });

  const projeto = await prisma.projeto.create({
    data: {
      tipo: TipoProjeto.EXTENSAO,
      nome: "Impacto da Economia Circular",
      data_inicio: new Date("2024-02-06"),
      data_termino: new Date("2024-12-20"),
      descricao: "Projeto de pesquisa sobre economia circular",
      orientador_cpf: "22222222222",
      status: "NAO_INICIADO",
    },
  });



}
main3()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
