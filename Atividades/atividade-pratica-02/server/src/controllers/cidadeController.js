// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();


// Função para criar uma nova cidade
export const CreateCidade = async (req, res) => {
  try {
    // Extrai as informações da requisição
    const { nome, estado_id } = req.body;

    // Cria a nova cidade no banco de dados usando o Prisma
    const cidade = await prisma.cidade.create({
      data: {
        nome,
        estado_id,
      },
    });

    // Retorna a cidade criada como resposta da requisição
    res.status(201).json(cidade);
  } catch (error) {
    // Trata os erros comuns e retorna uma mensagem de erro como resposta da requisição
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar cidade' });
  } finally {
    // Finaliza a conexão com o banco de dados
    await prisma.$disconnect();
  }
};


// Função que retorna todas as cidades cadastradas no banco de dados
export const GetAllCidades = async (req, res) => {
  try {
    // Busca todas as cidades cadastradas no banco de dados usando o Prisma
    const cidades = await prisma.cidade.findMany({
      // Inclui os relacionamentos necessários para a consulta
      include: {
        estado: true,
        locais_coleta: false,
        pessoas: false,
      },
    });

    // Retorna a lista de cidades como resposta da requisição
    res.status(200).json(cidades);
  } catch (error) {
    // Trata os erros comuns e retorna uma mensagem de erro como resposta da requisição
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar cidades' });
  } finally {
    // Finaliza a conexão com o banco de dados
    await prisma.$disconnect();
  }
};


// Função para buscar cidade pelo ID
export const GetCidadeById = async (req, res) => {
  const cidadeId = parseInt(req.params.id); // Pega o id da cidade da URL e converte para inteiro

  try {
    const cidade = await prisma.cidade.findUnique({ // Busca a cidade pelo id
      where: {
        id: cidadeId,
      },
      include: {
        estado: true,
        locais_coleta: false,
        pessoas: false,
      },
    });

    if (!cidade) { // Se a cidade não existir, retorna um erro 404
      return res.status(404).json({ message: "Cidade não encontrada com esse ID" });
    }

    return res.json(cidade); // Retorna a cidade encontrada
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar cidade" }); // Em caso de erro, retorna um erro 500
  }
};



// Função para buscar cidade pelo ID
export const UpdateCidade = async (req, res) => {
  const { id } = req.params;
  const { nome, estado_id } = req.body;

  try {
    const cidadeExistente = await prisma.cidade.findUnique({ where: { id: parseInt(id) }, include: { estado: true } });

    if (!cidadeExistente) {
      return res.status(404).json({ message: "Cidade não encontrada" });
    }

    // verifica se já existe uma cidade com o mesmo nome no mesmo estado
    const cidadeExistenteMesmoNome = await prisma.cidade.findFirst({
      where: {
        nome,
        estado_id: parseInt(estado_id)
      }
    });

    if (cidadeExistenteMesmoNome && cidadeExistente.id !== cidadeExistenteMesmoNome.id) {
      return res.status(409).json({ message: "Já existe uma cidade com o mesmo nome nesse estado" });
    }

    const cidadeAtualizada = await prisma.cidade.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nome,
        estado_id: parseInt(estado_id)
      },
      include: {
        estado: true
      }
    });

    res.status(200).json({ cidade: cidadeAtualizada });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar a cidade" });
  }
};



// Função para buscar cidade pelo ID
export const DeleteCidade = async (req, res) => {
  const { id } = req.params;

  try {
    const cidade = await prisma.cidade.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: `Cidade com id ${id} foi deletada com sucesso` });
  } catch (err) {
    if (err.code === 'P2025') {
      // o estado não foi encontrado
      res.status(404).json({ message: `Cidade com id ${id} não encontrado` });
    } else {
      // erro interno do servidor
      res.status(500).json({ message: 'Erro ao deletar cidade' });
    }
  }
};