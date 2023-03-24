import express from 'express';
import { 
    getPartidasByLinha,
    getMelhorLinha,
    createLinha,
    getAllLinhas, 
    getLinhaById,  
    updateLinha, 
    deleteLinha } from '../controllers/linhas.js';

const linhasRoutes = express.Router();

// Rota especial para retornar todos os dias e horários de partida de uma linha a partir do seu Id
linhasRoutes.get("/linhas/:id/horarios-partida/", getPartidasByLinha);

// Rota especial retorna a melhor linha a partir do horário da disciplina
linhasRoutes.get("/horario/:id/melhorlinha/", getMelhorLinha);


// Rotas do CRUD
linhasRoutes.post("/linhas/", createLinha);
linhasRoutes.get("/linhas/", getAllLinhas);
linhasRoutes.get("/linhas/:id", getLinhaById);
linhasRoutes.put("/linhas/:id", updateLinha);
linhasRoutes.delete("/linhas/:id", deleteLinha);

export default linhasRoutes;

