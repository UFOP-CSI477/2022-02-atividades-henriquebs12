// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();

// Função especial que busca todas os horários de partida de todas as Linhas, compara com o horário de início da disciplina e retorna a melhor linha.
export const getMelhorLinha = async (req, res) => {
  try {
    const { id } = req.params; // Horário de início da disciplina (exemplo: "14:00")

    // Função que calcula o tempo de espera entre o horário da disciplina e o horário de partida da linha
    const calcularTempoEspera = (horarioPartida, horarioDisciplina, tempoAtePontoControle) => {
      const [partidaHora, partidaMinuto] = horarioPartida.split(':').map(n => parseInt(n))
      const [disciplinaHora, disciplinaMinuto] = horarioDisciplina.split(':').map(n => parseInt(n))
      const partidaEmMinutos = partidaHora * 60 + partidaMinuto
      const disciplinaEmMinutos = disciplinaHora * 60 + disciplinaMinuto
      const tempoTotalEmMinutos = disciplinaEmMinutos - partidaEmMinutos - tempoAtePontoControle
      return tempoTotalEmMinutos
    }

    // Busca todas as linhas
    const linhas = await prisma.linha.findMany({
      select: {
        id: true,
        nome: true,
        tempo_ate_ponto_controle: true,
        partidaLinha: {
          select: {
            dia: true,
            horario: true
          },
          orderBy: {
            horario: 'asc'
          }
        }
      },
      orderBy: {
        nome: 'asc'
      }
    })

    let melhorLinha = null
    let menorTempoEspera = Infinity

    
    // Verifica qual é a melhor linha com base no horário da disciplina
    linhas.forEach(linha => {
      linha.partidaLinha.forEach(partida => {
        const horarioPartida = partida.horario
        const tempoEspera = calcularTempoEspera(horarioPartida, id, linha.tempo_ate_ponto_controle)
        if (tempoEspera < 40 && tempoEspera < menorTempoEspera) {
          melhorLinha = linha
          menorTempoEspera = tempoEspera
        }
      })
    })

    if (melhorLinha) {
      const melhorHorario = melhorLinha.partidaLinha.find(partida => {
        const tempoEspera = calcularTempoEspera(partida.horario, id, melhorLinha.tempo_ate_ponto_controle)
        return tempoEspera === menorTempoEspera
      })
      res.json({linha: melhorLinha.nome, horario: melhorHorario.horario})
    } else {
      res.status(404).json({ error: 'Não foi possível encontrar uma linha disponível no horário.' })
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({
    error: "Não foi possível encontrar a melhor linha.",
    });
    }
    };




// Rota especial para retornar todos os dias e horários de partida de uma linha a partir do seu Id no formato ../linhas/:id/horario-partida/
export const getPartidasByLinha = async (req, res) => {
  try {
    const { id } = req.params;
    const linhas = await prisma.linha.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        partidaLinha: {
          select: {
            id: true,
            dia: true,
            horario: true
          }
        }
      }
    });

    if (!linhas) {
      return res.status(404).json({ message: 'Linha não encontrada.' });
    }

    const horarios = linhas.partidaLinha.map(partida => ({
      id: partida.id,
      dia: partida.dia,
      horario: partida.horario
    }));

    return res.json(horarios);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};


// Função para criar uma nova linha de ônibus
export const createLinha = async (req, res) => {
  const { nome, tempo_ate_ponto_controle, partidaLinha } = req.body;
  try {
    const linha = await prisma.linha.create({
      data: {
        nome,
        tempo_ate_ponto_controle,
        partidaLinha: {
          create: partidaLinha,
        },
      },
      include: {
        partidaLinha: true,
      },
    });
    res.status(201).json(linha);
  } catch (error) {
    console.error(error.message);
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Linha já cadastrada.' });
    } else {
      res.status(500).json({ error: 'Erro interno.' });
    }
  }
};


// Função para listar todas as linhas de ônibus
export const getAllLinhas = async (req, res) => {
  try {
    const linhas = await prisma.linha.findMany();
    res.status(200).json(linhas);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro interno' });
  }
};

// Função para listar uma linha de ônibus pelo id
export const getLinhaById = async (req, res) => {
  const { id } = req.params;

  try {
    const linha = await prisma.linha.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        partidaLinha: true,
      },
    });

    if (!linha) {
      return res.status(404).json({ message: 'Linha não encontrada' });
    }

    res.status(200).json(linha);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Linha não encontrada' });
    }

    console.log(error);

    res.status(500).json({ message: 'Erro interno' });
  }
};

// Função para atualizar uma linha de ônibus pelo id
export const updateLinha = async (req, res) => {
  const { id } = req.params
  const { nome, tempo_ate_ponto_controle } = req.body

  try {
    const linha = await prisma.linha.findUnique({
      where: { id: parseInt(id) },
    })

    if (!linha) {
      return res.status(404).json({ error: 'Linha não encontrada.' })
    }

    // Verifica se já existe uma linha com o nome fornecido na requisição
    const linhaExistente = await prisma.linha.findUnique({
      where: { nome },
    })

    if (linhaExistente && linhaExistente.id !== parseInt(id)) {
      return res.status(400).json({ error: 'Já existe uma linha com esse nome.' })
    }

    const linhaAtualizada = await prisma.linha.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        tempo_ate_ponto_controle,
      },
    })

    return res.status(200).json({ linha: linhaAtualizada })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(400).json({ error: 'Erro de validação de dados.' })
    }

    if (error.code === 'P2016') {
      return res.status(400).json({ error: 'Erro de chave única.' })
    }

    if (error.code === 'P2002') {
      return res.status(500).json({ error: 'Erro interno do servidor.' })
    }

    return res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}

// Função responsável por deletar uma linha pelo ID
export const deleteLinha = async (req, res) => {
  const { id } = req.params;
  try {
    const linha = await prisma.linha.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json(linha);
  } catch (error) {
    console.log(error.message);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Linha não encontrada' });
    } else {
      res.status(500).json({ error: 'Erro interno ao deletar a linha',
      message: error.message });
    }
  }
};