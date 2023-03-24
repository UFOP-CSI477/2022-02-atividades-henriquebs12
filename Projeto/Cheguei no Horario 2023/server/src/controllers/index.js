// Importamos os controllers de cada modelo e exportando-os como um objeto. Isso nos permite acessar cada controller a partir de um único arquivo em outras partes do projeto.

import alunos from './alunos.js';
import disciplinas from './disciplinas.js';
import horariosPartida from './horariosPartida.js';
import linhas from './linhas.js';
import semestres from './semestres.js';
import tempoAtePonto from './tempoAtePonto.js';

export { alunos, disciplinas, horariosPartida, linhas, semestres, tempoAtePonto };
