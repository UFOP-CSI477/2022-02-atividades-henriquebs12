import express from 'express';
import { 
    CreateEstado, 
    GetAllEstados, 
    GetEstadoById, 
    UpdateEstado, 
    DeleteEstado } from '../controllers/estadoController.js';

const estadosRoutes = express.Router();

// Rotas do CRUD
estadosRoutes.post("/estados/", CreateEstado);
estadosRoutes.get("/estados/", GetAllEstados);
estadosRoutes.get("/estados/:id", GetEstadoById);
estadosRoutes.put("/estados/:id", UpdateEstado);
estadosRoutes.delete("/estados/:id", DeleteEstado);

export default estadosRoutes;