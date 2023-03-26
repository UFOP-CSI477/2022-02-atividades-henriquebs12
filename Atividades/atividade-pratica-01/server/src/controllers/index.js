// Importamos os controllers de cada modelo e exportando-os como um objeto. Isso nos permite acessar cada controller a partir de um único arquivo em outras partes do projeto.

import cidades from './cidadeController.js';
import doacoes from './doacaoController.js';
import estados from './estadoController.js';
import locaiscoleta from './localcoletaController.js';
import pessoas from './pessoaController.js';
import tiposanguineo from './tiposanguineoController.js';


export { cidades, doacoes, estados, locaiscoleta, pessoas, tiposanguineo };
