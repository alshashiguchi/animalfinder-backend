# Projeto Animal Finder

Projeto foi dividido nas partes abaixo:

  - API Desenvolvida em NodeJS versão 10.16.3, utilizando banco de dados de Postgres e Redis 

# API

  ```bash
  animalfinder-backend
├── coverage
├── database
│   ├── migrations
│   └── seeders
├── script
├── src
│   ├── core
│   │   ├── plugins
│   │   └── utils
│   ├── models
│   ├── modules
│   │   ├── animal
│   │   │   └── public
│   │   │       └── test
│   │   ├── autenticacao
│   │   │   └── test
│   │   └── usuario
│   │       ├── admin
│   │       │   └── test
│   │       └── public
│   │           └── test
│   └── test
└── uploads
    └── img

  ```
       
  - Está utlizando as seguintes tecnologias tratados os seguintes pontos:       
       -  Segurança:
          - JWT.
          - bcrypt.
          - Sequelize ORM.
          - Sanitização de Querys, Params e Payloads.
          - Tratamento de Brute Force com bloqueio de acesso em 6 tentativas por minuto ou 101 no dia.
       -  Framework Hapi
       -  A imagem da API foi disponibilizada no Dockerhub.
       -  Foi utilizado o S3 da Amazon para armazenar as imagens.

### Instalação

**API**
Instalação das dependencias e inicialização do Servidor.

Preencher as informações no arquivo .env

```sh
$ yarn install
$ yarn migration:up
$ yarn seeders:up
$ yarn dev
```
    

Para iniciar os testes 
  - informar o banco de dados no campo `BD_NAME_TEST` no .env

```sh
$ yarn install
$ yarn test
```

*Instalação com docker-compose*

```sh
$ sudo docker-compose up -d
```
A Imagem da API foi disponibilizada no Docker Hub [alshashiguchi/animalfinder](https://hub.docker.com/r/alshashiguchi/animalfinder)
### Documentação

Link para a documentação http://localhost:3000/v1/docs

```sh
$ yarn dev
```


