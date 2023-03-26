import express from 'express';
import { 
    CreateTipoSanguineo, 
    GetAllTiposSanguineos, 
    GetTipoSanguineoById, 
    UpdateTipoSanguineo, 
    DeleteTipoSanguineo } from '../controllers/tiposanguineoController.js';

const tiposanguineosRoutes = express.Router();

// Rotas do CRUD
tiposanguineosRoutes.post("/tipos-sanguineos/", CreateTipoSanguineo);
tiposanguineosRoutes.get("/tipos-sanguineos/", GetAllTiposSanguineos);
tiposanguineosRoutes.get("/tipos-sanguineos/:id", GetTipoSanguineoById);
tiposanguineosRoutes.patch("/tipos-sanguineos/:id", UpdateTipoSanguineo);
tiposanguineosRoutes.delete("/tipos-sanguineos/:id", DeleteTipoSanguineo);

export default tiposanguineosRoutes;