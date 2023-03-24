// O arquivo app.js é o arquivo principal do servidor, que define as configurações gerais do servidor, como instanciar o Express, definir as rotas e middlewares, configurar o banco de dados e iniciar o servidor.

// Importação das dependências
import express from 'express';
import cors from 'cors';

import { mainRouter } from './routes/main.js';
import alunosRoutes from './routes/alunosRoutes.js';
import disciplinasRoutes from './routes/disciplinasRoutes.js';
import horariosdepartidaRoutes from './routes/horariospartidaRoutes.js';
import linhasRoutes from './routes/linhasRoutes.js';
import semestresRoutes from './routes/semestresRoutes.js';

const PORT = 3333;

// Instanciação do servidor Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use(mainRouter);
app.use(alunosRoutes);
app.use(disciplinasRoutes);
app.use(horariosdepartidaRoutes);
app.use(linhasRoutes);
app.use(semestresRoutes);

// Server - start/listen
app.listen(PORT, () => {

  console.log(`[SERVER] O servidor está rodando na porta ${PORT}`);

});
