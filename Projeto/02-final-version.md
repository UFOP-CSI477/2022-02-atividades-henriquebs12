# **CSI606-2021-02 - Remoto - Trabalho Final - Resultados**

## *Aluna(o): Henrique Barcelos Saraiva*

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo
O novo escopo do trabalho consiste em uma plataforma que faz a gestão de disciplinas cursadas em um semestre, além de alunos, semestres e horários de aula. Além disso, o sistema também permite o cadastro de linhas de ônibus e os horários de partida deles. No final, a ideia é mostrar de forma amigável ao usuário um cronograma geral de aulas, que mostre as disciplinas que o aluno está cursando em um determinado semestre, bem como a sala e uma recomendação de melhor linha de ônibus, para que ele possa pegar uma das linhas de João Monlevade (ou qualquer outra cadastrada) e chegar sem atrasos.


- CRUD de Alunos, Disciplinas, Semestres, Linhas e Horários (tanto de aula quanto de horários de partida dos ônibus).
- Recomendação: o sistema de recomendação compara os horários das disciplinas que o aluno está cursando em um determinado semestre com os horários de partida dos ônibus. Ele recomenda, para cada disciplina da grade, a melhor linha. A melhor linha é decidida usando um valor simbólico de 40 minutos, que é o tempo em média que os ônibus gastam do ponto inicial ao ponto da UFOP. Idealmente, haveria um "ponto de controle", e a variável inclusive pode ser cadastrada no front-end, mas não foi possível implementa-la devido a limitações de tempo e conhecimento. A ideia era que cada linha tivesse um ponto de controle diferente, que representa o tempo em minutos que cada linha gasta até o ponto da minha casa, chamado de "Ponto A - Bitus". Ao considerar isso, as recomendações ficariam mais precisas.

### 1. Funcionalidades implementadas
- Foi previsto o CRUD e foi desenvolvido de todas as entidades: Alunos, Semestres, Linhas e Horários.
- Visão amigável de todo o sistema, inclusive da rota /Alunos, que mostra de forma visualmente agradável o cronograma de horários do aluno, baseado no semestre que ele escolher.

### 2. Funcionalidades previstas e não implementadas
- Infelizmente não consegui implementar com exatidão o sistema de recomendações de melhor linha. O cálculo de comparação de horários é feito, mas só é impresso na tela uma única linha recomendada, mesmo tendo várias outras cadastradas e possívelmente candidatas a melhor linha. Não tive tempo o suficiente para entender e resolver.
- De todos os cadastros do CRUD, uma única parte não foi implementada: a associação de horários com disciplinas cadastradas no banco. O backend está feito e funcionando, inclusive sendo possível testar as rotas pelo Insominia, mas a implementação no front-end não foi possível devido a limitações de tempo e conhecimento.
### 3. Outras funcionalidades implementadas
- Gostaria de dar destaque ao esforço em fazer uma interface amigável.
 - Arquivo SEED para popular o banco de dados.
### 4. Principais desafios e dificuldades
Front-end. Como foram poucas aulas, tive muita dificuldade em implementar o front-end. Tive que pedir ajuda no último dia para conseguir entender meus erros e poder conserta-los em tempo hábil. Outra dificuldade foi trabalhar com um projeto relativamente simples, mas com uma organização complexa de grandes projetos. Muitos componentes e pastas fazer você se perder com frequência, o que pode ser ruim para projetos pequenos.

### 5. Instruções para instalação e execução
** Devido ao fato de ter tído múltiplos erros para subir a versão final, estou enviando um arquivo .zip de garantia até que eu resolva isso:
https://drive.google.com/file/d/1Ed9CbZJmDx-bJjo_mh48YsVlct1XimPO/view?usp=share_link

[INSTALAÇÃO SERVER]
cd server
npm install
npm start --dev
npm install @prisma/client

Adicionar no arquivo .env para novas instalações da pasta "server/":
DATABASE_URL="file:./aplicacao.sqlite"

**[POPULAR BANCO]**<br>
`cd server`<br>
`npm run seed`<br>

**[RODAR SERVIDOR]**<br>
`cd server`<br>
`npm start --dev`<br>

**[INSTALAÇÃO FRONT-END]**<br>
`cd melhor-horario-front`<br>
`npm install`<br>
`npm run start`<br>

### 6. Referências
<!-- Referências podem ser incluídas, caso necessário. Utilize o padrão ABNT. -->
