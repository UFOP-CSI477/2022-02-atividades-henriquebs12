import express from 'express';
import { 
    CreateDoacao, 
    GetAllDoacoes, 
    GetDoacaoById, 
    UpdateDoacao, 
    DeleteDoacao } from '../controllers/doacaoController.js';

const doacoesRoutes = express.Router();

// Rotas do CRUD
doacoesRoutes.post("/doacoes/", CreateDoacao);
doacoesRoutes.get("/doacoes/", GetAllDoacoes);
doacoesRoutes.get("/doacoes/:id", GetDoacaoById);
doacoesRoutes.patch("/doacoes/:id", UpdateDoacao);
doacoesRoutes.delete("/doacoes/:id", DeleteDoacao);

export default doacoesRoutes;