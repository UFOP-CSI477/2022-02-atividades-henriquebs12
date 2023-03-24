import { Router } from 'express';

const mainRouter = Router();

mainRouter.get('/', (request, response) => {
    response.status(200).send("<h1>Página carregada com sucesso.</h1>")
});

mainRouter.get('/admin', (request, response) => {

    response.json({

        message: "API Server is running."

    });

});

export { mainRouter };