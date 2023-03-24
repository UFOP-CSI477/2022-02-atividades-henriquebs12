import express from 'express';
import { 
    createAluno, 
    deleteAluno, 
    getAllAlunos, 
    getAlunoById, 
    updateAluno } from '../controllers/alunos.js';

const alunosRoutes = express.Router();

// Rotas do CRUD
alunosRoutes.post("/alunos/", createAluno);
alunosRoutes.get("/alunos/", getAllAlunos);
alunosRoutes.get("/alunos/:id", getAlunoById);
alunosRoutes.put("/alunos/:id", updateAluno);
alunosRoutes.delete("/alunos/:id", deleteAluno);

export default alunosRoutes;