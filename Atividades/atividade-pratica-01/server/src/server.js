// Importação das dependências
import express from 'express';
import cors from 'cors';

import { mainRouter } from './routes/main.js';
import cidadesRoutes from './routes/cidadeRoutes.js';
import doacoesRoutes from './routes/doacaoRoutes.js';
import estadosRoutes from './routes/estadoRoutes.js';
import locaiscoletaRoutes from './routes/localcoletaRoutes.js';
import pessoasRoutes from './routes/pessoaRoutes.js';
import tiposanguineosRoutes from './routes/tiposanguineoRoutes.js';

const PORT = 3333;

// Instanciação do servidor Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use(mainRouter);
app.use(cidadesRoutes);
app.use(doacoesRoutes);
app.use(estadosRoutes);
app.use(locaiscoletaRoutes);
app.use(pessoasRoutes);
app.use(tiposanguineosRoutes);



// Server - start/listen
app.listen(PORT, () => {

  console.log(`[SERVER] O servidor está rodando na porta ${PORT}`);

});
