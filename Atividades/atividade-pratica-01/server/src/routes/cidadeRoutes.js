import express from 'express';
import { 
    CreateCidade, 
    GetAllCidades, 
    GetCidadeById, 
    UpdateCidade, 
    DeleteCidade } from '../controllers/cidadeController.js';

const cidadesRoutes = express.Router();

// Rotas do CRUD
cidadesRoutes.post("/cidades/", CreateCidade);
cidadesRoutes.get("/cidades/", GetAllCidades);
cidadesRoutes.get("/cidades/:id", GetCidadeById);
cidadesRoutes.put("/cidades/:id", UpdateCidade);
cidadesRoutes.delete("/cidades/:id", DeleteCidade);

export default cidadesRoutes;