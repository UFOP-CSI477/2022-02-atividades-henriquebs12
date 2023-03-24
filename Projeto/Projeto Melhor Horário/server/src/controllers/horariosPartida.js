// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();

// Função para criar uma nova partida de ônibus
export const createHorariodePartida = async (req, res) => {
  const { dia, horario, linhaId } = req.body;

  try {
    // cria uma nova partida de ônibus com os dados enviados no corpo da requisição
    const novaPartida = await prisma.partidaLinha.create({
      data: {
        dia,
        horario,
        linha: {
          connect: {
            id: linhaId,
          },
        },
      },
    });

    res.status(201).json({
      message: "Partida de ônibus criada com sucesso!",
      partida: novaPartida,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: "Não foi possível criar a partida de ônibus.",
      message: err.message
    });
  }
};

// Função para buscar todas as partidas de ônibus cadastradas
export const getAllHorariosdePartida = async (req, res) => {
  try {
    // busca todas as partidas de ônibus cadastradas no banco de dados
    const partidas = await prisma.partidaLinha.findMany({
      include: {
        linha: true,
      },
    });

    res.status(200).json(partidas);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Não foi possível buscar as partidas de ônibus.",
    });
  }
};

// Função para buscar uma partida de ônibus pelo seu ID
export const getHorariodePartidaById = async (req, res) => {
  const { id } = req.params;

  try {
    // busca a partida de ônibus pelo seu ID
    const partida = await prisma.partidaLinha.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        linha: true,
      },
    });

    if (!partida) {
      return res.status(404).json({
        error: "Partida de ônibus não encontrada.",
      });
    }

    res.status(200).json(partida);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Não foi possível buscar a partida de ônibus.",
    });
  }
};

// Função para atualizar uma partida de ônibus existente
export const updateHorariodePartida = async (req, res) => {
  const { id } = req.params;
  const { dia, horario } = req.body;
  try {
    const partidaLinha = await prisma.partidaLinha.update({
      where: { id: parseInt(id) },
      data: {
        dia,
        horario,
      },
    });
    res.status(200).json({
      message: 'Partida de ônibus atualizada com sucesso!',
      data: partidaLinha,
    });
  } catch (error) {
    console.error(error);
    let message = 'Não foi possível atualizar a partida de ônibus.';
    if (error.code === 'P2025') {
      message = 'Não foi possível encontrar a partida de ônibus.';
    }
    res.status(500).json({ message, error });
  }
};

// Função para deletar uma partida de ônibus existente
export const deleteHorariodePartida = async (req, res) => {
  const { id } = req.params;
  try {
    const partidaLinha = await prisma.partidaLinha.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      message: 'Partida de ônibus deletada com sucesso!',
      data: partidaLinha,
    });
  } catch (error) {
    console.error(error);
    let message = 'Não foi possível deletar a partida de ônibus.';
    if (error.code === 'P2025') {
      message = 'Não foi possível encontrar a partida de ônibus.';
    }
    res.status(500).json({ message, error });
  }
};