import express from 'express';
import { 
    CreatePessoa, 
    GetAllPessoas, 
    GetPessoaById, 
    UpdatePessoa, 
    DeletePessoa } from '../controllers/pessoaController.js';

const pessoasRoutes = express.Router();

// Rotas do CRUD
pessoasRoutes.post("/pessoas/", CreatePessoa);
pessoasRoutes.get("/pessoas/", GetAllPessoas);
pessoasRoutes.get("/pessoas/:id", GetPessoaById);
pessoasRoutes.patch("/pessoas/:id", UpdatePessoa);
pessoasRoutes.delete("/pessoas/:id", DeletePessoa);

export default pessoasRoutes;