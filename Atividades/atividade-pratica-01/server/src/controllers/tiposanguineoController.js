// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();


// Função para criar um novo tipo sanguíneo
export const CreateTipoSanguineo = async (req, res) => {
    const { tipo, fator } = req.body // Obtenha os dados do tipo sanguíneo do corpo da requisição
  
    try {
      const novoTipoSanguineo = await prisma.tipoSanguineo.create({ // Crie um novo registro na tabela de tipo sanguíneo
        data: {
          tipo,
          fator
        }
      })
      res.status(201).json(novoTipoSanguineo) // Responda com o novo registro criado
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar tipo sanguíneo.' }) // Trate erros e retorne uma resposta de erro apropriada
    }
  }


// Função para buscar todos os tipos sanguíneos cadastrados
export const GetAllTiposSanguineos = async (req, res) => {
    try {
      const tiposSanguineos = await prisma.tipoSanguineo.findMany(); // Busca todos os tipos sanguíneos na base de dados utilizando o método findMany do Prisma
  
      if (tiposSanguineos.length === 0) { // Verifica se há resultados
        return res.status(404).json({ message: "Nenhum tipo sanguíneo encontrado." }); // Retorna status 404 caso não encontre resultados
      }
  
      res.status(200).json(tiposSanguineos); // Retorna os tipos sanguíneos encontrados
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tipos sanguíneos.", error }); // Retorna status 500 em caso de erro
    }
  };

// Função para buscar todos um tipo sanguíneo a partir de seu ID
export const GetTipoSanguineoById = async (req, res) => {
    try {
      const tipoSanguineo = await prisma.tipoSanguineo.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { pessoas: true },
      });
  
      if (!tipoSanguineo) {
        return res.status(404).json({ message: "Tipo sanguíneo não encontrado" });
      }
  
      return res.status(200).json(tipoSanguineo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao buscar tipo sanguíneo" });
    }
  };

// Função para atualizar um tipo sanguíneo a partir de seu ID
export const UpdateTipoSanguineo = async (req, res) => {
    const { id } = req.params;
    const { tipo, fator } = req.body;
  
    try {
      const tipoSanguineo = await prisma.tipoSanguineo.update({
        where: { id: parseInt(id) },
        data: { tipo, fator },
      });
      res.json(tipoSanguineo);
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ message: 'Nenhum resultado encontrado para atualizar' });
      } else {
        res.status(500).json({ message: 'Erro ao atualizar tipo sanguíneo' });
      }
    }
  };

// Função para deletar um tipo sanguíneo a partir de seu ID
export const DeleteTipoSanguineo = async (req, res) => {
    const { id } = req.params; // Obtém o ID do tipo sanguíneo a ser deletado
  
    try {
      // Procura o tipo sanguíneo com o ID fornecido
      const tipoSanguineo = await prisma.tipoSanguineo.findUnique({
        where: { id: Number(id) },
      });
  
      // Verifica se o tipo sanguíneo existe
      if (!tipoSanguineo) {
        return res.status(404).json({ error: 'Tipo sanguíneo não encontrado para deletar' });
      }
  
      // Deleta o tipo sanguíneo
      await prisma.tipoSanguineo.delete({
        where: { id: Number(id) },
      });
  
      // Retorna a confirmação da exclusão
      return res.json({ message: 'Tipo sanguíneo deletado com sucesso' });
    } catch (error) {
      // Retorna o erro em caso de falha na exclusão
      return res.status(500).json({ error: 'Erro ao deletar tipo sanguíneo' });
    }
  };