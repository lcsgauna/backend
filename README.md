# Teste técnico Inovvati Backend

## Requisitos
* Node: 20> 
* Docker

## Configuração
No terminal execute os comandos: 

```bash
 docker run --name postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

 yarn install

 yarn migrate

 yarn generate
```
## Executar o projeto

```bash
 yarn run start
# ou
 yarn run start:dev
```

## API Client

Para teste de requisição na api foi utilizado (API Client Bruno)[https://www.usebruno.com/] , caso tenha interesse testar desta maneira a collection está no diretório `rest-api`