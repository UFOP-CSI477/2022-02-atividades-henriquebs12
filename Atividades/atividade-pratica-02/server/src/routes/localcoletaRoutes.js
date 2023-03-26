import express from 'express';
import { 
    CreateLocalColeta, 
    GetAllLocaisColeta, 
    GetLocalColetaById, 
    UpdateLocalColeta, 
    DeleteLocalColeta } from '../controllers/localcoletaController.js';

const locaiscoletaRoutes = express.Router();

// Rotas do CRUD
locaiscoletaRoutes.post("/locais-coleta/", CreateLocalColeta);
locaiscoletaRoutes.get("/locais-coleta/", GetAllLocaisColeta);
locaiscoletaRoutes.get("/locais-coleta/:id", GetLocalColetaById);
locaiscoletaRoutes.patch("/locais-coleta/:id", UpdateLocalColeta);
locaiscoletaRoutes.delete("/locais-coleta/:id", DeleteLocalColeta);

export default locaiscoletaRoutes;