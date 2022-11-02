# NodeJs Challenge 20201030

## Descrição

O desafio se diz em criar uma REST API usando as informações de uma API externa chamada Open Food Facts como fonte de dados, importando-as diariamente para o banco da aplicação.


### Instruções iniciais para inicialização
```bash
$ git clone https://github.com/frreiro/nodejs-coodesh-challenge

$ cd nodejs-coodesh-challenge

$ npm install

$ npm run start:dev
```
### A REST API

Na REST API teremos um CRUD com os seguintes endpoints:

- `GET /`: Detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória.
- `PUT /products/:code`: Será responsável por receber atualizações do Projeto Web
- `DELETE /products/:code`: Mudar o status do produto para `trash`
- `GET /products/:code`: Obter a informação somente de um produto da base de dados
- `GET /products`: Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o `REQUEST`.
