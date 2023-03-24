// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();

// Função para criar um novo aluno
export const createAluno = async (req, res) => {
  const { nome, semestre } = req.body;

  try {
    const newAluno = await prisma.aluno.create({
      data: {
        nome,
      },
    });

    res.status(201).json({ message: 'Aluno criado com sucesso!', data: newAluno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar aluno.' });
  }
};

// Função para buscar todos os alunos
export const getAllAlunos = async (req, res) => {
  try {
    const allAlunos = await prisma.aluno.findMany();
    res.json({ data: allAlunos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar alunos.' });
  }
};

// Função para buscar um aluno pelo ID
export const getAlunoById = async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await prisma.aluno.findUnique({
      where: {
        id: parseInt(id),
      }

    });

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    res.json({ data: aluno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar aluno.' });
  }
};

// Função para atualizar um aluno
export const updateAluno = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const updatedAluno = await prisma.aluno.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome,
      },
    });

    res.json({ message: 'Aluno atualizado com sucesso!', data: updatedAluno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar aluno.' });
  }
};

// Função para deletar um aluno
export const deleteAluno = async (req, res) => {
  const { id } = req.params;

  try {
    const alunoExists = await prisma.aluno.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!alunoExists) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    const deletedAluno = await prisma.aluno.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: 'Aluno deletado com sucesso!', data: deletedAluno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar aluno.' });
  }
};