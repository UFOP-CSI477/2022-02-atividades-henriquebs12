[PARA RODAR O SERVIDOR]
npm start --dev


[INSTALAÇÃO INICIAL]
npm init
npm install express body-parser cors
npm install prisma -D
npx prisma init --datasource-provider sqlite
npm install --save-dev nodemon eslint prettier
npm install @prisma/client

Alteração no package.json para executar o código em um módulo ES:
"type": "module"

Adição de script no arquivo packaget.json
"start": "nodemon src/server.js",


[PRISMA] Criar as migrações:
npx prisma migrate reset // para dropar tudo
npx prisma migrate dev // mudanças no schema do banco