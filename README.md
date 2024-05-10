# cognita-challenge

Esse teste tem o objetivo de me ajudar a passar no processo seletivo da vaga de desenvolvedor Fullstack. Segue abaixo algumas informações sobre como ele foi feito e como rodá-lo.

## Comandos para executar

### Banco de dados

Primeiramente, certifique-se que você possui o neo4j desktop baixado em sua máquina e rodando:

Link do site: https://neo4j.com/download/

Depois crie um projeto na interface do neo4j e utilize a database neo4j padrão, clicando em open para abrir o browser.

Após isso, digite ou cole o comando cypher para criar os nós iniciais no banco de dados:

```
    CREATE (s:Step { 
	id: 'step-1', 
	title: 'O primeiro passo', 
	content: 'O conteúdo do primeiro passo' 
  })
  CREATE (t:Trail {
  	id: 'trail-1',
  	title: 'A primeira trilha'
  })  
  CREATE (tm:Theme {
  	id: 'theme-1',
  	title: 'O primeiro tema'
  })
  CREATE (a:Academy {
  	id: 'academy-1',
  	title: 'A primeira academia'
  })
```

Depois rode cada comando abaixo, um de cada vez, para criar as relações entre os nós, assim como descrito nas instruções do teste (Uma trilha tem passos, um tema tem trilhas e uma academia tem temas):

```
  MATCH (a:Trail), (b:Step) 
  CREATE (a)-[r:HAVE]->(b) 
  RETURN a,b
```

```
  MATCH (a:Theme), (b:Trail) 
  CREATE (a)-[r:HAVE]->(b) 
  RETURN a,b
```


```
  MATCH (a:Academy), (b:Theme) 
  CREATE (a)-[r:HAVE]->(b) 
  RETURN a,b
```

E finalmente, crie um usuário para a aplicação via a opção da interface do neo4j desktop ou via os comandos abaixo:

### Comandos cypher comuns
```
  CREATE USER remixUser SET PASSWORD 'admin123';
  GRANT ROLE publisher TO remixUser;
  GRANT ROLE reader TO remixUser;
```
```
  ALTER CURRENT USER SET PASSWORD FROM 'firstpass' TO 'admin123'
```

### Comandos do neo4j desktop no browser

Para listar os usuários e poder atribuir permissões/cargos:

```
  :server user list
```

Para mostrar o formulário de cadastro de usuário:

```
  :server user add
```

Obs.: Tenha certeza de que seu usuário tem as permissões (role) para ler e escrever na sua base de dados (publisher e reader), e caso, tenha criado utilizando comandos cypher normal, pode ser que o usuário tenha que trocar a senha inicial (passwordChange) ao logar a primeira vez no banco, então se for criado assim, logue primeiro com a nova conta no banco, troque sua senha, e a aplicação poderá acessar o banco com suas novas informações.

### Aplicação

Execute um git clone no seu terminal de preferência com o link (HTTPS ou SSH) do repositório:

```
  git clone git@github.com:MatheusAlvesPereiraRosa/cognita-challenge.git
```

Entre no arquivo do repositório local e rode:

```
  npm i
```

Crie um arquivo .env na raíz do projeto e insira as informações referente a conexão com banco de dados como no exemplo abaixo:

```
  NEO4J_URI=bolt://localhost:7687
  NEO4J_USER=remixUser
  NEO4J_PASSWORD=admin123
```

Depois rode:

```
  npm run dev
```

Após isso sua aplicação irá iniciar e você sera levado a página inicial com tudo funcionando.
