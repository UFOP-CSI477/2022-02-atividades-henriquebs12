// Importando a instância do Prisma
import { PrismaClient } from '@prisma/client';

// Instanciando o Prisma
const prisma = new PrismaClient();

// Função para criar uma nova pessoa
export const CreatePessoa = async (req, res) => {
    const { nome, rua, numero, complemento, documento, cidade_id, tipo_id } = req.body;
  
    // Verifica se os campos obrigatórios foram fornecidos
    if (!nome || !rua || !numero || !documento || !cidade_id || !tipo_id) {
      return res.status(400).json({ message: 'Campos obrigatórios não fornecidos' });
    }
  
    try {
      const pessoa = await prisma.pessoa.create({
        data: {
          nome,
          rua,
          numero,
          complemento,
          documento,
          cidade: {
            connect: { id: cidade_id }
          },
          tipo_sanguineo: {
            connect: { id: tipo_id }
          }
        }
      });
      res.status(201).json(pessoa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar pessoa' });
    }
  }


// Função para buscar todas as pessoas cadastradas
export const GetAllPessoas = async (req, res) => {
  try {
    // Use o método findMany do Prisma para buscar todas as pessoas
    const pessoas = await prisma.pessoa.findMany({
      include: {
        cidade: true,
          }
      });

    // Verifique se foram encontradas pessoas
    if (!pessoas) {
      // Se não houver pessoas, envie uma resposta com status 404 e uma mensagem de erro
      return res.status(404).json({ message: 'Resultado não encontrado' })
    }

    // Se houver pessoas, envie uma resposta com status 200 e as pessoas encontradas
    res.status(200).json(pessoas)
  } catch (err) {
    // Se ocorrer um erro, envie uma resposta com status 500 e uma mensagem de erro
    res.status(500).json({ message: 'Erro ao buscar pessoas' })
  }
}



// Função para buscar uma pessoa a partir de seu ID
export const GetPessoaById = async (req, res) => {
    try {
      const pessoaId = parseInt(req.params.id); // Obtém o id da pessoa a partir dos parâmetros da requisição
      const pessoa = await prisma.pessoa.findUnique({ // Busca a pessoa pelo id utilizando a função findUnique do Prisma
        where: {
          id: pessoaId
        },
        include: {
          cidade: true,
          tipo_sanguineo: true,
          doacoes: {
            include: {
              local: true
            }
          }
        }
      });
      if (pessoa) { // Se a pessoa for encontrada, retorna a resposta com o objeto encontrado
        res.status(200).json(pessoa);
      } else { // Caso contrário, retorna o status 404 (Não encontrado) e uma mensagem de erro
        res.status(404).json({ error: "Resultado não encontrado" });
      }
    } catch (error) { // Em caso de erro, retorna o status 500 (Erro do servidor) e uma mensagem de erro
      console.error(error);
      res.status(500).json({ error: "Erro" });
    }
  }


// Função para atualizar as informações de uma pessoa a partir de seu ID
export const UpdatePessoa = async (req, res) => {
    const { id } = req.params; // recupera o ID da pessoa a ser atualizada
    const { nome, rua, numero, complemento, documento, cidade_id, tipo_id } = req.body; // recupera os dados atualizados da pessoa
  
    // verifica se os campos obrigatórios foram enviados
    if (!id || !nome || !rua || !numero || !documento || !cidade_id || !tipo_id) {
      return res.status(400).json({ message: 'Campos obrigatórios não foram enviados' });
    }
  
    try {
      // procura a pessoa no banco de dados pelo ID
      const pessoa = await prisma.pessoa.findUnique({
        where: {
          id: parseInt(id)
        }
      });
  
      // verifica se a pessoa existe no banco de dados
      if (!pessoa) {
        return res.status(404).json({ message: 'Pessoa não encontrada' });
      }
  
      // atualiza a pessoa no banco de dados
      const updatedPessoa = await prisma.pessoa.update({
        where: {
          id: parseInt(id)
        },
        data: {
          nome,
          rua,
          numero,
          complemento,
          documento,
          cidade_id: parseInt(cidade_id),
          tipo_id: parseInt(tipo_id)
        }
      });
  
      // retorna a pessoa atualizada
      res.status(200).json(updatedPessoa);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao atualizar pessoa' });
    }
  };


// Função para deletar uma pessoa a partir de seu ID
export const DeletePessoa = async (req, res) => {
    const { id } = req.params; // obtem o id da pessoa a ser deletada a partir dos parâmetros da requisição
    try {
      const pessoa = await prisma.pessoa.delete({ // tenta deletar a pessoa do banco de dados
        where: { id: Number(id) } // filtra pelo id da pessoa
      });
      res.status(200).json(pessoa); // retorna a pessoa deletada em caso de sucesso
    } catch (error) {
      if (error.code === 'P2025') { // verifica se o erro é de pessoa não encontrada
        res.status(404).json({ message: 'Pessoa não encontrada para deletar' }); // retorna status 404 e uma mensagem de erro
      } else { // caso contrário, trata como um erro interno
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar a pessoa' });
      }
    }
  };