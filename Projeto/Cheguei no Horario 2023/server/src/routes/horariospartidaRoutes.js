import express from 'express';
import { 
    createHorariodePartida, 
    getAllHorariosdePartida, 
    getHorariodePartidaById, 
    updateHorariodePartida, 
    deleteHorariodePartida } from '../controllers/horariosPartida.js';

const horariosdepartidaRoutes = express.Router();

// Rotas do CRUD
horariosdepartidaRoutes.post("/horarios-partida/", createHorariodePartida);
horariosdepartidaRoutes.get("/horarios-partida/", getAllHorariosdePartida);
horariosdepartidaRoutes.get("/horarios-partida/:id", getHorariodePartidaById);
horariosdepartidaRoutes.put("/horarios-partida/:id", updateHorariodePartida);
horariosdepartidaRoutes.delete("/horarios-partida/:id", deleteHorariodePartida);


export default horariosdepartidaRoutes;






