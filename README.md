
# Musfy


> Um site onde os usuários conseguem upar e escutar musicas.


## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão 20.9.0 ou superior do `<NodeJS>`
- Você instalou a versão 2.39 ou superior do `<Git>`
- Você tem uma máquina `<Windows / Linux / Mac>`.
- Você tem o `<Docker>` instalado na sua maquina.

## 🚀 Instalando

Para instalar o Musfy, faça isso:

Linux, macOS e Windows:

## 1. Clone o projeto do GitHub:

```
<git clone https://github.com/eduoop/musfy.git>
```

## 2. Entre na pasta do projeto:

```
<cd musfy>
```

## 3. Instale as dependências usando o npm:

```
<npm i>
```
## 4. Crie o arquivo do docker:

```
<docker compose up -d>
```

## 5. Conecte-se ao banco de dados criado:

```
Crie o arquivo <.env> e adicione a propiedade <DATABASE_URL=postgresql://postgres:password@localhost:5432> para que o prisma possa se conectar com o banco. 
```

## 6. Adicione as variaveis do google para usar oauth:

```
No <.env> adicione as variáveis <GOOGLE_CLIENT_ID> e <GOOGLE_CLIENT_SECRET>. (Você precisará gerar
elas no console do Google)

```

## 7. Adicione as variaveis da AWS S3:

```
No <.env> adicione as variáveis <AWS_ACCESS_KEY_ID> e <AWS_SECRET_ACCESS_KEY>. (Você precisará gerar
elas na S3)

```

## 🎲 Preparando o bando de dados

Para preparar o banco com as migrações:

```
1. Rode uma migração para o banco de dados <npx prisma migrate dev --name "add_initial_tables">
```

```
2. Garanta que a migração foi efetuada com sucesso consultando o banco de dados ultilizando o prisma <npx prisma studio>
```

## ☕ Usando

```
para rodar o projeto, use: <npm run dev>
```

## ⛓️ Projeto hospedado

```
<https://musfy.vercel.app/>
```

## 🤝 Criador

Feito Por:

<table>
  <tr>
    <td align="center">
      <a href="#" title="defina o titulo do link">
        <img src="https://avatars.githubusercontent.com/u/85969484?s=400&u=b0e89e575a7cb91fc9f8a69e126a9d7587aa9478&v=4" width="100px;" alt="Foto do Eduardo Meneses no GitHub"/><br>
        <sub>
          <b>Eduardo Meneses</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.