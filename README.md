# gestify
Um aplicativo web para gestão de ordens de serviço

# Como rodar

## Backend
1. Vá para a pasta do backend `cd backend`
2. Instale as dependências com `npm i`
3. Gere o banco de dados com `npx prisma generate`
4. Crie o arquivo .env com o link do BD
5. Inicie o servidor com `npm run dev:server`
6. Caso alguma biblioteca apareça como erro, use o comando: `npm i @types/"nome_da_biblioteca" -D`
7. Em caso de conflitos com o banco de dados, rode as migrations com o comando: `npx prisma migrate dev`
## Frontend
1. Vá para a pasta do frontend `cd frontend` 
1. Instale as dependências com `npm i`
2. Crie o arquivo .env com o link da API
3. Inicie com `npm run dev`
