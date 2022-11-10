# ![logo](https://user-images.githubusercontent.com/45273884/201203485-09f1e5d5-4f36-49db-aa32-e6e173819187.svg) Energetic Tracker

![NVIDIA_Share_giI3avDHvG](https://user-images.githubusercontent.com/45273884/201204869-6d30bb65-eeb6-443b-bad4-427b2af8f08d.gif)

## Descrição

Este é Energetic Tracker, uma aplicação simples usando Nextjs no frontend com um backend em Nodejs que foca em guardar consumos energéticos e mostrar alguns dados baseados nesses consumos.

## Como iniciar o projeto

### Backend

Comece configurando um arquivo .env usando o .env.example como base(você pode duplicar o .env.example e renomear para .env), disponibilizo um exemplo de como preencher as envs:
```
# Database
DB_HOST=localhost
DB_DATABASE=postgres
DB_PORT=5432
DB_USER=user-energetic
DB_PASS=energetic

# JWT

JWT_SECRET=dg56sGD4165S4G45S121ED21E3
JWT_EXPIRES_IN=1d
```

Executando o arquivo do docker compose para subir um container com servidor postgres com o comando:
```
docker-compose up -d
```

Instale as dependências do projeto com:
```
npm i
```

Use o comando abaixo para popular com uma conta e alguns consumos no banco de dados:
```
npm run seed:all
```

Para iniciar o servidor use:
```
npm run dev
```

### Frontend

Comece configurando um arquivo .env.local usando o .env.local.example como base(você pode duplicar o .env.local.example e renomear para .env.local), disponibilizo um exemplo de como preencher as envs:
```
API_BASEURL=http://localhost:3333
```

Instale as dependências do projeto com:
```
npm i
```

Para iniciar o servidor use:
```
npm run dev
```

Pronto, agora é só usar seu navegador para acessar com a conta e senha já populados no banco de dados com o comando de seed que você fez nas etapas do server:
```
login = fulano@email.com
password = 123456
```


## Tecnologias usadas

### Backend:

 - O projeto foi escrito usando **typescript**;
 - Servidor usando **express**, **sequelize-typescript** com banco de dados usando drivers **pg** e **pg-hstore**;
 - Validação com **zod**;
 - Encriptação com **bcryptjs** e jwt com **jsonwebtoken**;
 - Manipulação de datas com **date-fns**.

### Frontend:

 - O projeto foi escrito usando **typescript**;
 - Usando o framework de **React**: **Nextjs**;
 - **useContext** para criação de contextos;
 - Estilos com **tailwind**.
 - Ícones com **phosphor-react**;
 - Componentes primitivos usando **radix-ui**;
 - **axios** para chamadas de apis;
 - Formulário usando **react-hook-forms** com validação da biblioteca **zod**;
 - **lodash** para algumas utilidades diversas;
 - Cookies com **cookies-next**;
 - **clsx** para gerenciar classes de css;
 - Gráficos com **apexcharts**.

## Possíveis problemas

  Não foi detectado nenhum até o momento.

## Possíveis melhorias

  - Usar useCallback para reduzir impacto das funções;
  - Usar um seletor de uso de contextos para para reduzir rerenderizaçoes não necessárias

## Autor

Marcelo "Masa" Alves
- <img src="https://user-images.githubusercontent.com/45273884/192056758-d7c1995b-4459-4acf-bb20-c4e19ee5daf3.svg" alt="twitter-logo" style="width: 20px; height: 20px;"> [@masamarux](https://twitter.com/masamarux)
- <img src="https://user-images.githubusercontent.com/45273884/192056770-fa5b48e0-a216-4f55-86fc-83cc6dd3590a.svg" alt="linkedin-logo" style="width: 20px; height: 20px;"> [Marcelo Alves](https://www.linkedin.com/in/marceloalves-/)


## Histórico de versões
* 1.0 - (10/11/2022)
    * Lançamento inicial
