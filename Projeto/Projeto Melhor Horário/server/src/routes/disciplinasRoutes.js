import express from 'express';
import { 
    getDisciplinasAlunonoSemestre,
    getDisciplinasBySemestreId,
    getQntDisciplinasBySemestreId,
    getAllDisciplinas, 
    getDisciplinaById, 
    createDisciplina, 
    updateDisciplina, 
    deleteDisciplina } from "../controllers/disciplinas.js";

const disciplinasRoutes = express.Router();

// Rota especial para retornar todas as disciplinas que estão sendo cursadas por um Aluno em um Semestre
disciplinasRoutes.get("/aluno/:alunoId/semestres/:semestreId/disciplinas/", getDisciplinasAlunonoSemestre);

// Rota especial que retorna todos as disciplinas de um semestre
disciplinasRoutes.get("/semestres/:id/disciplinas/", getDisciplinasBySemestreId);

// Rota especial que retorna todos as disciplinas de um semestre
disciplinasRoutes.get("/semestres/:id/disciplinas/count/", getQntDisciplinasBySemestreId);


// Rotas do CRUD
disciplinasRoutes.post("/disciplinas/", createDisciplina);
disciplinasRoutes.get("/disciplinas/", getAllDisciplinas);
disciplinasRoutes.get("/disciplinas/:id", getDisciplinaById);
disciplinasRoutes.put("/disciplinas/:id", updateDisciplina);
disciplinasRoutes.delete("/disciplinas/:id", deleteDisciplina);

export default disciplinasRoutes;