
<h4 align="center">
  Hubbe - Tela secreta
</h4>

<p align="center">
  <a href="#--sobre-o-projeto">Sobre</a> •
  <a href="#-%EF%B8%8F-funcionalidades">Funcionalidades</a> •
  <a href="#--layout">Layout</a> •
  <a href="#--tecnologias">Tecnologias</a> •
  <a href="#--milhas-a-mais">Milhas a mais</a> 
</p>

<br/>

![](https://github.com/brunosllz/hubbe-technical-test/blob/main/.github/assets/)

## [](https://github.com/brunosllz/hubbe-technical-test#--sobre-o-projeto) 💻 Sobre o projeto

Projeto desenvolvido para o teste técnico da [Hubbe](https://hubbe.app/), o desafio tem como premissa um projeto Full Stack, que permita  gerenciar o acesso dos usuários a uma tela secreta.

---

## [](https://github.com/brunosllz/hubbe-technical-test#-%EF%B8%8F-funcionalidades) ⚙️ Funcionalidades

- Bloqueio/desbloqueio de recursos
- Feedback em real-time

---

#### 🧭 Rodando a aplicação

Clone o repositório do projeto:
```bash
  $ git clone https://github.com/brunosllz/hubbe-technical-test.git
```

Este projeto está utilizando MongoDB com banco de dados, caso não tenha uma instância do Mongo rodando na sua máquina, pode subir uma utilizando o docker compose na raiz do projeto:
```bash
  # Subir instância do MongoDB
  $ docker compose up -d
```

Copie o .env-example colocando as credências conforme a configuração do seu banco:
```bash
  # Copie o .env-example renomeando para .env
  $ cp .env-example .env

  # Substitua o "<your-user>" e "<your-password>" pelas suas credências
  - DATABASE_URL="mongodb://<your-user>:<your-password>@localhost:27017/hubbe?authSource=admin&directConnection=true"
```

Navegue até aplicação node e rode o seed para popular os dados iniciais:
```bash
  # Navegar para a api
  $ cd ./apps/api

  # Roda o Seed
  $ pnpm prisma db seed
```

Vá para a raiz do projeto e rode o comando para subi o ambiente de desenvolvimento:
```bash
  # Ir para raiz do projeto
  $ cd ./

  # Subir o ambiente de desenvolvimento
  $ pnpm run dev
```
---

## [](https://github.com/brunosllz/hubbe-technical-test#--layout) 🔖 Layout

No front-end temos um layout bem simples, onde somente mostro a funcionalidade de bloqueio/desbloqueio implementada, onde o recurso que está sendo gerenciado é a tela secreta em questão, que só poderia ser acessada por um usuário de cada vez.
 
 ![gif](https://github.com/brunosllz/hubbe-technical-test/blob/main/.github/assets/layout-example.gif)

---

## [](https://github.com/brunosllz/hubbe-technical-test#--tecnologias) 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- NextJS
- NodeJS
- Typescript
- Socket.io
- Prisma
- Jest
- TailwildCss


> Veja o arquivo [package.json](https://github.com/brunosllz/hubbe-technical-test/blob/main/package.json)
---

#### 📋 Justificativa

Esta solução foi construída pensando no gerenciamento de bloqueio/desbloqueio de recursos, com isso temos um app construído com NodeJs, onde é responsável por fazer o gerenciamento dos recursos. Para que fosse possível ter um feedback em real-time do status do recurso de acordo com o limite de acesso de clientes presetado ao recurso, optei pela utilização do protocolo WS (Web socket), onde possibilita que tenhamos uma comunicação bidirecional e em real-time entre cliente e servidor.

Já em questão de banco de dados, optei pela utilização da "família" NoSQL, tendo em vista de preciso ter uma baixa latência no feedback do status do recurso e um controle dos clientes conectados. Inicialmente para facilitar está comunicação entre DB e a aplicação, estou utilizando o Prisma, o mesmo disponibiliza métodos bult-in para facilitação de operações ao DB, mas como citei anteriormente, "inicialmente", pois a decisão da utilização desta ferramenta foi tomada devido a minha familiaridade com a mesma e o curto período de tempo para a entrega no desafio. Porém com isso em vista optei por um design já mais desacoplado, onde a minha lógica de negócio trabalha de forma isolada de ferramentas externas, portanto caso necessário, futuramente poderia estar facilmente substituindo a ferramenta do Prisma por outra, de forma simplificada sem alterar as funcionalidades da aplicação. 
