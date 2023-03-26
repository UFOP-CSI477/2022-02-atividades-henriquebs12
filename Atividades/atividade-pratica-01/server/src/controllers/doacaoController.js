// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();

// Função para criar uma nova doação
export const CreateDoacao = async (req, res) => {
  const { pessoa_id, local_id, data } = req.body; // Receber os campos do request body

  // Verificar se os campos obrigatórios foram enviados
  if (!pessoa_id || !local_id || !data) {
    return res.status(400).json({ message: 'Os campos pessoa_id, local_id e data são obrigatórios' });
  }

  try {
    // Verificar se a pessoa e o local existem antes de criar a doação
    const pessoa = await prisma.pessoa.findUnique({ where: { id: pessoa_id } });
    if (!pessoa) {
      return res.status(400).json({ message: 'A pessoa informada não existe' });
    }

    const local = await prisma.locaisColeta.findUnique({ where: { id: local_id } });
    if (!local) {
      return res.status(400).json({ message: 'O local informado não existe' });
    }

    // Criar a doação
    const doacao = await prisma.doacao.create({
      data: {
        pessoa_id: pessoa_id,
        local_id: local_id,
        data: data
      }
    });

    return res.status(201).json(doacao); // Retornar a doação criada em caso de sucesso
  } catch (error) {
    // Verificar se o erro foi devido a um registro duplicado (por exemplo, pessoa já fez uma doação no mesmo local na mesma data)
    if (error.code === 'P2002' && error.meta.target.includes('unique')) {
      return res.status(409).json({ message: 'Essa doação já existe' });
    } else {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar a doação' });
    }
  }
};





// Função para buscar todas as doações
export const GetAllDoacoes = async (req, res) => {
  try {
    // Busca todas as doações no banco de dados
    const doacoes = await prisma.doacao.findMany()

    // Verifica se alguma doação foi encontrada
    if (!doacoes.length) {
      return res.status(404).json({ message: 'Nenhuma doação encontrada' })
    }

    // Retorna as doações encontradas
    return res.status(200).json(doacoes)
  } catch (error) {
    // Retorna um erro em caso de falha na busca
    return res.status(500).json({ message: 'Erro ao buscar todas as doações' })
  }
}


// Função para buscar uma doação a partir de seu ID
export const GetDoacaoById = async (req, res) => {
  const { id } = req.params

  try {
    // Busca a doação no banco de dados pelo id fornecido
    const doacao = await prisma.doacao.findUnique({
      where: { id: parseInt(id) }
    })

    // Verifica se a doação foi encontrada
    if (!doacao) {
      return res.status(404).json({ message: 'Doação não encontrada' })
    }

    // Retorna a doação encontrada
    return res.status(200).json(doacao)
  } catch (error) {
    // Retorna um erro em caso de falha na busca
    return res.status(500).json({ message: 'Erro ao buscar doação pelo ID' })
  }
}



// Função para atualizar uma doação
export const UpdateDoacao = async (req, res) => {
  const { id } = req.params;
  const { pessoa_id, local_id, data } = req.body;

  // verifica se os campos obrigatórios foram enviados
  if (!pessoa_id || !local_id || !data) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
  }

  try {
    const doacao = await prisma.doacao.update({
      where: {
        id: Number(id),
      },
      data: {
        pessoa_id: Number(pessoa_id),
        local_id: Number(local_id),
        data: new Date(data),
      },
      include: {
        pessoa: false,
        local: {
          include: {
            cidade: false,
          },
        },
      },
    });
    if (!doacao) {
      return res.status(404).json({ message: "Doação não encontrada para atualizar" });
    }
    res.status(200).json(doacao);
  } catch (error) {
    if (error.code === "P2002" || error.code === "P2025") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao atualizar doação" });
  }
};


// Função para deletar uma doação
export const DeleteDoacao = async (req, res) => {
  try {
    const { id } = req.params;
    const doacao = await prisma.doacao.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json(doacao);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: `Doação com id ${req.params.id} não encontrado para deletar` });
    } else {
      res.status(500).json({ error: 'Erro ao deletar doação.' });
    }
  }
}