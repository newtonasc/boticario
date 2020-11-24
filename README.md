# boticario

Testes na api realizados pela extensão **Rest Client do VSCode**.

https://marketplace.visualstudio.com/items?itemName=humao.rest-client

Arquivo com as rotas para teste 

```
.route.rest
```

Dump do banco MySQL

```
File 20201124.sql
```

Configurar o acesso ao banco pelo arquivo **.env** (Parâmetro **DATABASE_STRING**)

Para o cadastro de revendedor não precisa do login

Para as demais rotas (Cadastrar compras, listar compras e a api externa) é necessário realizar o login, 

e passar o token no header **x-access-token**
