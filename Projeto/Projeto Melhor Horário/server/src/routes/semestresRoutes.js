import express from 'express';
import { 
    getSemestresByAlunoId,
    createSemestre, 
    getAllSemestres, 
    getSemestreById, 
    updateSemestre, 
    deleteSemestre } from '../controllers/semestres.js';

const semestresRoutes = express.Router();

// Rota especial que retorna todos os semestres que um Aluno específico está cursando
semestresRoutes.get('/alunos/:id/semestres', getSemestresByAlunoId);


// Rotas do CRUD
semestresRoutes.post("/semestres/", createSemestre);
semestresRoutes.get("/semestres/", getAllSemestres);
semestresRoutes.get("/semestres/:id", getSemestreById);
semestresRoutes.put("/semestres/:id", updateSemestre);
semestresRoutes.delete("/semestres/:id", deleteSemestre);

export default semestresRoutes;

