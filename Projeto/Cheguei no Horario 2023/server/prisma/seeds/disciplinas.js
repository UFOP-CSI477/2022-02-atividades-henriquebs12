// Importando o PrismaClient
import { PrismaClient } from "@prisma/client";

// Criando uma nova instância do PrismaClient
const prisma = new PrismaClient();

// Função assíncrona que popula o banco de dados
async function seed() {
  try {
    // Populando a tabela Aluno
    const aluno1 = await prisma.aluno.create({
      data: {
        nome: "Henrique Barcelos",
        semestre: {
          create: {
            nome: "2023.1",
            disciplinaSemestre: {
              create: [
                {
                  sala: "C102",
                  diaSemana: "Segunda",
                  horario: "18:50",
                  disciplina: {
                    create: {
                      nome: "Matemática Discreta",
                      nome_curto: "DISCRETA",
                    },
                  },
                },
                {
                  sala: "C102",
                  diaSemana: "Quarta",
                  horario: "20:45",
                  disciplina: {
                    create: {
                      nome: "Matemática Discreta",
                      nome_curto: "DISCRETA",
                    },
                  },
                },
                {
                  sala: "C102",
                  diaSemana: "Terca",
                  horario: "13:30",
                  disciplina: {
                    create: {
                      nome: "Empreendedorismo",
                      nome_curto: "EMPREEND",
                    },
                  },
                },
                {
                  sala: "C102",
                  diaSemana: "Quinta",
                  horario: "15:25",
                  disciplina: {
                    create: {
                      nome: "Empreendedorismo",
                      nome_curto: "EMPREEND",
                    },
                  },
                },
                {
                  sala: "E202",
                  diaSemana: "Terca",
                  horario: "20:45",
                  disciplina: {
                    create: {
                      nome: "Sistemas de Apoio a Decisão",
                      nome_curto: "SAD",
                    },
                  },
                },
                {
                  sala: "E202",
                  diaSemana: "Quinta",
                  horario: "15:25",
                  disciplina: {
                    create: {
                      nome: "Sistemas de Apoio a Decisão",
                      nome_curto: "SAD",
                    },
                  },
                },
                {
                  sala: "C207",
                  diaSemana: "Quinta",
                  horario: "18:50",
                  disciplina: {
                    create: {
                      nome: "Sistemas Web",
                      nome_curto: "Web",
                    },
                  },
                },
                {
                  sala: "C207",
                  diaSemana: "Quinta",
                  horario: "20:45",
                  disciplina: {
                    create: {
                      nome: "Sistemas Web",
                      nome_curto: "Web",
                    },
                  },
                },
                {
                  sala: "E204",
                  diaSemana: "Quarta",
                  horario: "18:50",
                  disciplina: {
                    create: {
                      nome: "Programação Linear e Inteira",
                      nome_curto: "PLI",
                    },
                  },
                },
                {
                  sala: "E204",
                  diaSemana: "Quinta",
                  horario: "20:45",
                  disciplina: {
                    create: {
                      nome: "Programação Linear e Inteira",
                      nome_curto: "PLI",
                    },
                  },
                },

              ],
            },
          },
        },
      },
    });
    // Populando a tabela Aluno
    const aluno2 = await prisma.aluno.create({
      data: {
        nome: "Ricardo Torres",
        semestre: {
          create: {
            nome: "2022.2",
            disciplinaSemestre: {
              create: [
                {
                  sala: "B103",
                  diaSemana: "Segunda",
                  horario: "20:45",
                  disciplina: {
                    create: {
                      nome: "Segurança e Auditoria de Sistemas",
                      nome_curto: "SAS",
                    },
                  },
                },
                {
                  sala: "B103",
                  diaSemana: "Quarta",
                  horario: "20:45",
                  disciplina: {
                    create: {
                      nome: "Segurança e Auditoria de Sistemas",
                      nome_curto: "SAS",
                    },
                  },
                },
                {
                  sala: "C203",
                  diaSemana: "Sexta",
                  horario: "20:45",
                  disciplina: {
                    create: {
                      nome: "Eletiva - Aprendizagem de Máquina",
                      nome_curto: "Aprendiz. Máquina",
                    },
                  },
                },
                {
                  sala: "C203",
                  diaSemana: "Quinta",
                  horario: "18:50",
                  disciplina: {
                    create: {
                      nome: "Eletiva - Aprendizagem de Máquina",
                      nome_curto: "Aprendiz. Máquina",
                    },
                  },
                },
              ],
            },
          },
        },
      },
    });

    // Populando a tabela Linha 155
    const linha155 = await prisma.linha.create({
      data: {
        nome: "155",
        tempo_ate_ponto_controle: 15,
        partidaLinha: {
          create: [
            {
              dia: "Segunda",
              horario: "12:30",
            },
            {
              dia: "Segunda",
              horario: "13:30",
            },
            {
              dia: "Segunda",
              horario: "14:30",
            },
            {
              dia: "Segunda",
              horario: "15:30",
            },
            {
              dia: "Segunda",
              horario: "16:30",
            },
            {
              dia: "Segunda",
              horario: "17:30",
            },
            {
              dia: "Segunda",
              horario: "18:30",
            },
            {
              dia: "Segunda",
              horario: "15:30",
            },
            {
              dia: "Segunda",
              horario: "19:30",
            },
            {
              dia: "Segunda",
              horario: "20:30",
            },
            {
              dia: "Segunda",
              horario: "21:30",
            },
            {
              dia: "Segunda",
              horario: "22:30",
            },



            {
              dia: "Terca",
              horario: "12:30",
            },
            {
              dia: "Terca",
              horario: "13:30",
            },
            {
              dia: "Terca",
              horario: "14:30",
            },
            {
              dia: "Terca",
              horario: "15:30",
            },
            {
              dia: "Terca",
              horario: "16:30",
            },
            {
              dia: "Terca",
              horario: "17:30",
            },
            {
              dia: "Terca",
              horario: "18:30",
            },
            {
              dia: "Terca",
              horario: "15:30",
            },
            {
              dia: "Terca",
              horario: "19:30",
            },
            {
              dia: "Terca",
              horario: "20:30",
            },
            {
              dia: "Terca",
              horario: "21:30",
            },
            {
              dia: "Terca",
              horario: "22:30",
            },




            {
              dia: "Quarta",
              horario: "14:30",
            },
            {
              dia: "Quarta",
              horario: "15:30",
            },
            {
              dia: "Quarta",
              horario: "16:30",
            },
            {
              dia: "Quarta",
              horario: "17:30",
            },
            {
              dia: "Quarta",
              horario: "18:30",
            },
            {
              dia: "Quarta",
              horario: "15:30",
            },
            {
              dia: "Quarta",
              horario: "19:30",
            },
            {
              dia: "Quarta",
              horario: "20:30",
            },
            {
              dia: "Quarta",
              horario: "21:30",
            },
            {
              dia: "Quarta",
              horario: "22:30",
            },



            {
              dia: "Quinta",
              horario: "12:30",
            },
            {
              dia: "Quinta",
              horario: "13:30",
            },
            {
              dia: "Quinta",
              horario: "14:30",
            },
            {
              dia: "Quinta",
              horario: "15:30",
            },
            {
              dia: "Quinta",
              horario: "16:30",
            },
            {
              dia: "Quinta",
              horario: "17:30",
            },
            {
              dia: "Quinta",
              horario: "18:30",
            },
            {
              dia: "Quinta",
              horario: "15:30",
            },
            {
              dia: "Quinta",
              horario: "19:30",
            },
            {
              dia: "Quinta",
              horario: "20:30",
            },
            {
              dia: "Quinta",
              horario: "21:30",
            },
            {
              dia: "Quinta",
              horario: "22:30",
            },



            {
              dia: "Sexta",
              horario: "12:30",
            },
            {
              dia: "Sexta",
              horario: "13:30",
            },
            {
              dia: "Sexta",
              horario: "14:30",
            },
            {
              dia: "Sexta",
              horario: "15:30",
            },
            {
              dia: "Sexta",
              horario: "16:30",
            },
            {
              dia: "Sexta",
              horario: "17:30",
            },
            {
              dia: "Sexta",
              horario: "18:30",
            },
            {
              dia: "Sexta",
              horario: "15:30",
            },
            {
              dia: "Sexta",
              horario: "19:30",
            },
            {
              dia: "Sexta",
              horario: "20:30",
            },
            {
              dia: "Sexta",
              horario: "21:30",
            },
            {
              dia: "Sexta",
              horario: "22:30",
            },
          ],
        },
      },
    });


    // Populando a tabela Linha 152
    const linha152 = await prisma.linha.create({
      data: {
        nome: "152",
        tempo_ate_ponto_controle: 10,
        partidaLinha: {
          create: [
            {
              dia: "Segunda",
              horario: "12:00",
            },
            {
              dia: "Segunda",
              horario: "13:00",
            },
            {
              dia: "Segunda",
              horario: "14:00",
            },
            {
              dia: "Segunda",
              horario: "15:00",
            },
            {
              dia: "Segunda",
              horario: "16:00",
            },
            {
              dia: "Segunda",
              horario: "17:00",
            },
            {
              dia: "Segunda",
              horario: "18:00",
            },
            {
              dia: "Segunda",
              horario: "15:00",
            },
            {
              dia: "Segunda",
              horario: "19:00",
            },
            {
              dia: "Segunda",
              horario: "20:00",
            },
            {
              dia: "Segunda",
              horario: "21:00",
            },
            {
              dia: "Segunda",
              horario: "22:00",
            },



            {
              dia: "Terca",
              horario: "12:00",
            },
            {
              dia: "Terca",
              horario: "13:00",
            },
            {
              dia: "Terca",
              horario: "14:00",
            },
            {
              dia: "Terca",
              horario: "15:00",
            },
            {
              dia: "Terca",
              horario: "16:00",
            },
            {
              dia: "Terca",
              horario: "17:00",
            },
            {
              dia: "Terca",
              horario: "18:00",
            },
            {
              dia: "Terca",
              horario: "15:00",
            },
            {
              dia: "Terca",
              horario: "19:00",
            },
            {
              dia: "Terca",
              horario: "20:00",
            },
            {
              dia: "Terca",
              horario: "21:00",
            },
            {
              dia: "Terca",
              horario: "22:00",
            },




            {
              dia: "Quarta",
              horario: "14:00",
            },
            {
              dia: "Quarta",
              horario: "15:00",
            },
            {
              dia: "Quarta",
              horario: "16:00",
            },
            {
              dia: "Quarta",
              horario: "17:00",
            },
            {
              dia: "Quarta",
              horario: "18:00",
            },
            {
              dia: "Quarta",
              horario: "15:00",
            },
            {
              dia: "Quarta",
              horario: "19:00",
            },
            {
              dia: "Quarta",
              horario: "20:00",
            },
            {
              dia: "Quarta",
              horario: "21:00",
            },
            {
              dia: "Quarta",
              horario: "22:00",
            },



            {
              dia: "Quinta",
              horario: "12:00",
            },
            {
              dia: "Quinta",
              horario: "13:00",
            },
            {
              dia: "Quinta",
              horario: "14:00",
            },
            {
              dia: "Quinta",
              horario: "15:00",
            },
            {
              dia: "Quinta",
              horario: "16:00",
            },
            {
              dia: "Quinta",
              horario: "17:00",
            },
            {
              dia: "Quinta",
              horario: "18:00",
            },
            {
              dia: "Quinta",
              horario: "15:00",
            },
            {
              dia: "Quinta",
              horario: "19:00",
            },
            {
              dia: "Quinta",
              horario: "20:00",
            },
            {
              dia: "Quinta",
              horario: "21:00",
            },
            {
              dia: "Quinta",
              horario: "22:00",
            },



            {
              dia: "Sexta",
              horario: "12:00",
            },
            {
              dia: "Sexta",
              horario: "13:00",
            },
            {
              dia: "Sexta",
              horario: "14:00",
            },
            {
              dia: "Sexta",
              horario: "15:00",
            },
            {
              dia: "Sexta",
              horario: "16:00",
            },
            {
              dia: "Sexta",
              horario: "17:00",
            },
            {
              dia: "Sexta",
              horario: "18:00",
            },
            {
              dia: "Sexta",
              horario: "15:00",
            },
            {
              dia: "Sexta",
              horario: "19:00",
            },
            {
              dia: "Sexta",
              horario: "20:00",
            },
            {
              dia: "Sexta",
              horario: "21:00",
            },
            {
              dia: "Sexta",
              horario: "22:00",
            },
          ],
        },
      },
    });



    console.log("Dados populados com sucesso!");
  } catch (err) {
    console.error(err);
  } finally {
    // Encerrando a conexão com o banco de dados
    await prisma.$disconnect();
  }
}

// Chamando a função para popular o banco de dados
seed();
