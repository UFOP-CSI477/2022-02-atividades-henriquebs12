// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();


// Função especial para contar a quantidade de disciplinas associadas a um semestre
export const getQntDisciplinasBySemestreId = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await prisma.disciplinaSemestre.count({
      where: {
        semestreId: parseInt(id)
      }
    });

    return res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar a quantidade de disciplinas.' });
  }
};


// Função para criar um novo semestre
export const createSemestre = async (req, res) => {
  const { nome, aluno } = req.body
  try {
    const semestre = await prisma.semestre.create({
      data: {
        nome,
        aluno: { connect: aluno }
      }
    })
    res.status(201).json({ message: 'Semestre criado com sucesso.', semestre })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Não foi possível criar o semestre.' })
  }
}

// Função para listar todos os semestres cadastrados
export const getAllSemestres = async (req, res) => {
  try {
    const semestres = await prisma.semestre.findMany()
    res.json(semestres)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Não foi possível listar os semestres.' })
  }
}




// Função especial que retorna todos os semestres que um Aluno específico está cursando
export const getSemestresByAlunoId = async (alunoId) => {
  try {
    const semestres = await prisma.aluno.findUnique({
      where: { id: alunoId },
      include: { semestre: true },
    });
    return semestres.semestre;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao buscar semestres do Aluno');
  }
};


// Função para buscar um semestre pelo ID
export const getSemestreById = async (req, res) => {
  const { id } = req.params;

  try {
    const semestre = await prisma.semestre.findUnique({
      where: { id: Number(id) },
    });

    if (!semestre) {
      return res.status(404).json({ error: 'Semestre não encontrado' });
    }

    res.json(semestre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar semestre' });
  }
};


// Função para atualizar um semestre existente
export const updateSemestre = async (req, res) => {
  const { id } = req.params
  const { nome } = req.body

  try {
    const semestre = await prisma.semestre.update({
      where: { id: Number(id) },
      data: { nome }
    })

    res.json(semestre)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Semestre não encontrado' })
    }

    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// Função para deletar um semestre existente
export const deleteSemestre = async (req, res) => {
  const { id } = req.params;

  try {
    const semestreExists = await prisma.semestre.findUnique({
      where: { id: parseInt(id) },
    });

    if (!semestreExists) {
      return res.status(404).json({ error: "Semestre não encontrado" });
    }

    await prisma.semestre.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Semestre deletado com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Não foi possível deletar o semestre",
      prismaCode: err.code,
    });
  }
};
