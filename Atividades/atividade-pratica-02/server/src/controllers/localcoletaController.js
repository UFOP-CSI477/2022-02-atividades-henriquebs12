// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();


// Função para criar um novo local de coleta
export const CreateLocalColeta = async (req, res) => {
  const { nome, rua, numero, complemento, cidade_id } = req.body; // pega as informações da requisição

  // verifica se todas as informações obrigatórias foram fornecidas
  if (!nome || !rua || !numero || !complemento || !cidade_id) {
    return res.status(400).json({ message: "Erro: Informações incompletas para criar local de coleta" });
  }

  try {
    // tenta criar um novo registro de local de coleta com as informações fornecidas
    const novoLocalColeta = await prisma.locaisColeta.create({
      data: {
        nome,
        rua,
        numero,
        complemento,
        cidade_id: parseInt(cidade_id), // converte para número, caso necessário
      },
    });

    return res.status(201).json(novoLocalColeta); // retorna o novo registro criado em caso de sucesso
  } catch (error) {
    // verifica se o erro ocorreu porque o registro já existe
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Resultado já existe" });
    }

    console.error(error);
    return res.status(500).json({ message: "Erro ao criar local de coleta" });
  }
};

// Função para buscar todos os locais de coleta cadastrados
export const GetAllLocaisColeta = async (req, res) => {
  try {
    const locaisColeta = await prisma.locaisColeta.findMany({
      include: {
        cidade: {
          include: {
            estado: true,
          },
        },
      },
    });
    if (locaisColeta.length === 0) {
      return res.status(404).json({ message: "Locais de coleta não encontrados" });
    }
    res.status(200).json(locaisColeta);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao buscar locais de coleta" });
  }
};

// Função para buscar um local de coleta a partir de seu ID
export const GetLocalColetaById = async (req, res) => {
  const { id } = req.params; // Obtém o ID do parâmetro da URL

  try {
    // Procura pelo local de coleta com o ID informado
    const localColeta = await prisma.locais_coleta.findUnique({
      where: { id: parseInt(id) },
    });

    // Se não encontrar nenhum local de coleta, retorna erro 404
    if (!localColeta) {
      return res.status(404).json({ message: 'Local de coleta não encontrado' });
    }

    // Retorna o local de coleta encontrado
    return res.status(200).json(localColeta);
  } catch (error) {
    // Em caso de erro, retorna erro 500
    return res.status(500).json({ message: 'Erro ao buscar local de coleta', error });
  }
};

// Função para atualizar as informações de um local de coleta a partir de seu ID
export const UpdateLocalColeta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, rua, numero, complemento, cidade_id } = req.body;

    // Verifica se os campos obrigatórios foram enviados
    if (!id || !nome || !rua || !numero || !cidade_id) {
      return res.status(400).json({ message: 'Os campos id, nome, rua, numero e cidade_id são obrigatórios' });
    }

    // Converte o valor da string 'id' para um número inteiro
    const localColetaId = parseInt(id);

    // Busca o registro a ser atualizado no banco de dados
    const localColeta = await prisma.locaisColeta.findUnique({
      where: { id: localColetaId },
    });

    // Verifica se o registro existe
    if (!localColeta) {
      return res.status(404).json({ message: 'Nenhum resultado encontrado para atualizar' });
    }

    // Atualiza o registro no banco de dados
    const updatedLocalColeta = await prisma.locaisColeta.update({
      where: { id: localColetaId },
      data: {
        nome,
        rua,
        numero,
        complemento,
        cidade_id,
      },
    });

    // Retorna o registro atualizado como resposta
    res.status(200).json(updatedLocalColeta);
  } catch (error) {
    // Retorna uma mensagem de erro em caso de falha na atualização
    res.status(500).json({ message: 'Erro ao atualizar o registro'});
  }
};


// Função para deletar um local de coleta a partir de seu ID
export const DeleteLocalColeta = async (req, res) => {
  const { id } = req.params; // pega o id do local de coleta a ser deletado da url

  try {
    const localColeta = await prisma.locaisColeta.delete({
      where: { id: parseInt(id) }, // converte o id para o tipo Int do prisma
    });
    res.status(200).json(localColeta);
  } catch (error) {
    if (error.code === "P2025") {
      // verifica se o erro é por causa do registro não encontrado
      res.status(404).json({ message: `Local de coleta com id ${id} não encontrado para deletar` });
    } else {
      res.status(500).json({ message: "Erro ao deletar local de coleta" });
    }
  }
};