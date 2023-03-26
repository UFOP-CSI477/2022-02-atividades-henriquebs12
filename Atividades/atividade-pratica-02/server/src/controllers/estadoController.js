// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();

// Função para criar um estado
export const CreateEstado = async (req, res) => {
  const { nome, sigla } = req.body;

  try {
    // Verifica se já existe um estado com o mesmo nome ou sigla
    const estadoExistente = await prisma.estado.findFirst({
      where: {
        OR: [{ nome }, { sigla }],
      },
    });

    if (estadoExistente) {
      return res.status(409).json({ message: 'Estado já existente' });
    }

    // Cria um novo estado
    const novoEstado = await prisma.estado.create({
      data: {
        nome,
        sigla,
      },
    });

    res.status(201).json(novoEstado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar estado' });
  } finally {
    await prisma.$disconnect();
  }
};


// Função que busca todos os estados do banco de dados e retorna em formato JSON
export const GetAllEstados = async (req, res) => {
  try {
    // Busca todos os estados usando o Prisma, incluindo as cidades relacionadas
    const estados = await prisma.estado.findMany({
      include: { cidades: false },
    });

    // Se nenhum estado for encontrado, retorna uma mensagem de erro
    if (estados.length === 0) {
      return res.status(404).json({ error: 'Nenhum estado encontrado' });
    }

    // Retorna a lista de estados em formato JSON
    return res.status(200).json(estados);
  } catch (error) {
    // Se ocorrer um erro durante a busca, retorna uma mensagem de erro
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar estados' });
  }
};




// Função para buscar um estado por ID
export const GetEstadoById = async (req, res) => {
  // Obtém o ID do estado a partir da requisição
  const estadoId = Number(req.params.id);

  try {
    // Busca o estado pelo ID no banco de dados usando o Prisma
    const estado = await prisma.estado.findUnique({
      where: { id: estadoId },
      include: { cidades: false },
    });

    // Se não encontrar nenhum estado com esse ID, retorna um erro 404
    if (!estado) {
      return res.status(404).json({ message: "Estado não encontrado" });
    }

    // Se encontrar, retorna o estado com suas cidades
    return res.status(200).json(estado);
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro genérica e o erro original
    return res.status(500).json({ message: "Erro ao buscar o estado", error });
  }
};

// Função para atualizar um estado a partir de seu ID
export const UpdateEstado = async (req, res) => {
  const { id, nome, sigla } = req.body

  try {
    // Verifica se o estado já existe pelo id fornecido
    const estadoExistente = await prisma.estado.findUnique({ where: { id } })
    if (!estadoExistente) {
      return res.status(404).json({ error: 'Estado não encontrado' })
    }

    // Atualiza o estado com os dados fornecidos
    const estadoAtualizado = await prisma.estado.update({
      where: { id },
      data: { nome, sigla }
    })

    // Retorna o estado atualizado
    return res.status(200).json(estadoAtualizado)
  } catch (error) {
    // Verifica se houve algum erro no processo
    console.log(error)
    return res.status(500).json({ error: 'Não foi possível atualizar o estado.' })
  } finally {
    // Fecha a conexão com o banco de dados
    await prisma.$disconnect()
  }
}

// Função para deletar um estado a partir de seu ID
export const DeleteEstado = async (req, res) => {
  const estadoId = parseInt(req.params.id); // obter o id do estado a ser deletado

  try {
    const estado = await prisma.estado.findUnique({ where: { id: estadoId } }); // verificar se o estado existe

    if (!estado) { // se não existir, retornar erro 404
      return res.status(404).json({ message: `Estado com o id ${estadoId} não encontrado` });
    }

    const cidadeCount = await prisma.cidade.count({ where: { estado_id: estadoId } }); // verificar se o estado tem cidades relacionadas

    if (cidadeCount > 0) { // se tiver, retornar erro 400
      return res.status(400).json({ message: `Não é possível deletar um estado com cidades relacionadas` });
    }

    await prisma.estado.delete({ where: { id: estadoId } }); // deletar o estado

    return res.status(200).json({ message: `Estado com o id ${estadoId} deletado com sucesso` }); // retornar mensagem de sucesso
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro ao deletar o estado' }); // retornar erro 500 se houver um erro desconhecido
  }
};