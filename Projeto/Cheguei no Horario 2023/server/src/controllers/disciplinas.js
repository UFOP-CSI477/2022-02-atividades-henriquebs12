// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();


// Função especial para contar a quantidade de disciplinas associadas a um semestre
export const getQntDisciplinasBySemestreId = async (req, res) => {
  const { id } = req.params;
  try {
    const semestre = await prisma.semestre.findUnique({
      where: { id: parseInt(id) },
      include: { disciplinaSemestre: true },
    });
    if (!semestre) {
      return res.status(404).json({ error: 'Semestre não encontrado' });
    }
    const count = semestre.disciplinaSemestre.length;
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a quantidade de disciplinas do semestre' });
  }
};


// Função especial que retorna todos as disciplinas de um semestre
export const getDisciplinasBySemestreId = async (req, res) => {
  const { id } = req.params;

  try {
    const disciplinas = await prisma.disciplinaSemestre.findMany({
      where: { semestreId: parseInt(id) },
      select: { id: true, disciplina: { select: { nome: true } } },
    });
    
    if (disciplinas.length === 0) {
      return res.status(404).json({ message: 'Não há disciplinas cadastradas para este semestre.' });
    }

    return res.json(disciplinas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar disciplinas do semestre.' });
  }
};

// Função especial que recebe o semestre, o aluno e retorna todas as disciplinas e 
// horários cursadas nesse determinado semestre, por ex: http://localhost:3000/alunos/1/semestres/1/disciplinas
export const getDisciplinasAlunonoSemestre = async (req, res) => {
  try {
    const alunoId = parseInt(req.params.alunoId);
    const semestreId = parseInt(req.params.semestreId);

    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId },
      include: {
        semestre: {
          where: { id: semestreId },
          include: {
            disciplinaSemestre: {
              include: { disciplina: true }
            }
          }
        }
      }
    });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    if (!aluno.semestre.length) {
      return res
        .status(404)
        .json({ message: "O aluno não está cursando nenhuma disciplina nesse semestre" });
    }

    const disciplinas = aluno.semestre[0].disciplinaSemestre.map(ds => ({
      nome: ds.disciplina.nome_curto,
      sala: ds.sala,
      diaSemana: ds.diaSemana,
      horario: ds.horario
    }));

    return res.json(disciplinas);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Já existe uma disciplina com esse nome" });
    }
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};


// Função responsável por cadastrar uma nova disciplina
export const createDisciplina = async (req, res) => {
  try {
    const { nome, nome_curto } = req.body;
    const disciplina = await prisma.disciplina.create({
      data: {
        nome,
        nome_curto
      }
    });
    res.status(201).json(disciplina);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Disciplina já cadastrada' });
    }
    console.error(error);
    res.status(500).json({ 
      error: 'Não foi possível criar a disciplina',
      message: error.message
    });
  }
};


// Função responsável por buscar todas as disciplinas cadastradas
export const getAllDisciplinas = async (req, res) => {
  try {
    const disciplinas = await prisma.disciplina.findMany();
    res.status(200).json(disciplinas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar as disciplinas.' });
  }
};

// Função responsável por buscar uma disciplina pelo ID
export const getDisciplinaById = async (req, res) => {
  const { id } = req.params;

  try {
    const disciplina = await prisma.disciplina.findUnique({
      where: { id: parseInt(id) },
      include: { disciplinaSemestre: true },
    });

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    return res.json(disciplina);
  } catch (error) {
    console.log(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    return res.status(500).json({ message: 'Erro ao buscar disciplina' });
  }
};


// Função responsável por atualizar uma disciplina existente
export const updateDisciplina = async (req, res) => {
  const { id } = req.params;
  const { nome, nome_curto } = req.body;

  try {
    const disciplina = await prisma.disciplina.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        nome_curto,
      },
    });

    res.status(200).json(disciplina);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Disciplina não encontrada' });
    }

    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'O nome da Disciplina precisa ser único' });
    }

    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


// Função responsável por deletar uma disciplina a partir de um ID
export const deleteDisciplina = async (req, res) => {
  const { id } = req.params

  try {
    const disciplina = await prisma.disciplina.delete({
      where: { id: Number(id) },
    })

    if (disciplina) {
      return res.status(200).json({
        message: `Disciplina com id ${id} foi deletada com sucesso.`,
      })
    }
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: `Disciplina com id ${id} não encontrada.`,
      })
    }
    return res.status(500).json({ error: error.message })
  }
}