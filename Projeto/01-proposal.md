# **CSI606-2021-02 - Remoto - Proposta de Trabalho Final**

## *Aluna(o): Henrique Barcelos Saraiva*

--------------

<!-- Descrever um resumo sobre o trabalho. -->

### Resumo

O novo escopo do trabalho consiste em uma plataforma que faz a gestão de disciplinas cursadas em um semestre, além de alunos, semestres e horários de aula. Além disso, o sistema também permite o cadastro de linhas de ônibus e os horários de partida deles. No final, a ideia é mostrar de forma amigável ao usuário um cronograma geral de aulas, que mostre as disciplinas que o aluno está cursando em um determinado semestre, bem como a sala e uma recomendação de melhor linha de ônibus, para que ele possa pegar uma das linhas de João Monlevade (ou qualquer outra cadastrada) e chegar sem atrasos.

<!-- Apresentar o tema. -->
### 1. Tema

Um projeto consiste em uma plataforma para gestão de disciplinas cursadas ao longo dos semestres e da recomendação da melhor linha para que o aluno chegue a aula sem atrasos.

<!-- Descrever e limitar o escopo da aplicação. -->
### 2. Escopo

- CRUD de Alunos, Disciplinas, Semestres, Linhas e Horários (tanto de aula quanto de horários de partida dos ônibus).
- Recomendação: o sistema de recomendação compara os horários das disciplinas que o aluno está cursando em um determinado semestre com os horários de partida dos ônibus. Ele recomenda, para cada disciplina da grade, a melhor linha. A melhor linha é decidida usando um valor simbólico de 40 minutos, que é o tempo em média que os ônibus gastam do ponto inicial ao ponto da UFOP. Idealmente, haveria um "ponto de controle", e a variável inclusive pode ser cadastrada no front-end, mas não foi possível implementa-la devido a limitações de tempo e conhecimento. A ideia era que cada linha tivesse um ponto de controle diferente, que representa o tempo em minutos que cada linha gasta até o ponto da minha casa, chamado de "Ponto A - Bitus". Ao considerar isso, as recomendações ficariam mais precisas.

<!-- Apresentar restrições de funcionalidades e de escopo. -->
### 3. Restrições

Nenhuma além das restrições técnicas e de tempo. O sistema foi desenvolvido usando Node.JS para o servidor, bem como as bibliotecas e frameworks vistos em sala, como Express, Nodemon e Prisma como ORM para gerenciar o banco de dados. No front-end foi utilizado o Angular com alguns componentes do Material Design. Também usei as classes do Grid System do bootstrap para me ajudar a posicionar os elementos na tela e faze-los de forma responsiva sem muitos problemas.

<!-- Construir alguns protótipos para a aplicação, disponibilizá-los no Github e descrever o que foi considerado. //-->
### 4. Protótipo

  Link do protótipo no Figma: https://www.figma.com/file/pNwnSBHrDEPJ9PXgTgnGtt/Prot%C3%B3tipo-Sistemas-Web?node-id=0%3A1&t=H5RRPPnaf9Hjs68f-1

### 5. Referências

- [Node.js](https://nodejs.org/en)
- [Angular Material](https://material.angular.io/)
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
