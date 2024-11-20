# ADS_Senac_PI_Grupo_04_quarto_semestre

![Banner](frontend/assets/banner/banner_img.gif) 

# Home Care Application

Projeto usando Node.JS v22.11.0 (atual LTS);

Backend criado com express-generator, usando a stack javascript/node;

Frontend criado con next.js, usando a stack typescript/react native;

Backend a ser implementado na plataforma Render, com uso de banco de dados PostgreSQL;

Backend segue o padrão MVC de estruturação e segue o padrão REST para lidar com as rotas.

## Descrição
O projeto tem como objetivo desenvolver um aplicativo mobile que conecta clientes que precisam de cuidados domiciliares (como idosos, pessoas em recuperação pós-cirúrgica ou com necessidades especiais) a enfermeiros e técnicos de enfermagem que desejam atuar como cuidadores. A aplicação é dividida em duas partes: um backend construído com Node.js e Express, e um frontend desenvolvido com Next.js.

## Tecnologias Utilizadas

- **Backend**: 
  - Node.js v22.11.0 (LTS)
  - Express.js (usando express-generator)
  - PostgreSQL (banco de dados)
  - Padrão MVC e REST para estruturação e rotas

- **Frontend**: 
  - Next.js
  - TypeScript

- **Implantação**: 
  - Render (plataforma de hospedagem)

## Estrutura do Projeto

home-care-application/
├── backend/                # Código do backend
│   ├── controllers/        # Controladores MVC
│   ├── models/             # Modelos de dados
│   ├── routes/             # Rotas da API
│   ├── config/             # Configurações do banco de dados
│   ├── middleware/         # Middleware para autenticação e validação
│   ├── app.js              # Configuração do Express
│   └── server.js           # Inicialização do servidor
└── front-web               # Código do frontend
├── src/
│   ├── components/     # Componentes React
│   ├── screens/        # Telas da aplicação
│   ├── navigation/     # Navegação da aplicação
│   ├── services/       # Serviços para chamadas à API
│   └── App.tsx         # Componente principal
└── app.json            # Configurações do Expo

## 🚀 Instalação

### Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend

1. Instale as dependências:

npm install

2. Configure o banco de dados PostgreSQL:

- Crie um banco de dados no PostgreSQL.

- Atualize as configurações de conexão no arquivo config/database.js.

3. Execute as migrações (se aplicável):

npm run migrate

4. Inicie o servidor:

npm start

Frontend

1. Navegue até o diretório do frontend:

cd frontend

2. Instale as dependências:

npm install

3. Inicie o aplicativo:

npm run dev

## ☕ Uso

- Backend: Rodando localmente, a API está disponível em http://localhost:3000. Você pode usar ferramentas como Postman para testar os endpoints ou fazer isso pelo swagger em http://localhost:3000/swagger.

- Frontend: O aplicativo pode ser executado ......

## 📫 Contribuindo para o projeto

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Fork o repositório.

2. Crie uma branch para sua feature:
git checkout -b minha-feature

3. Faça suas alterações e commit:
git commit -m "Adiciona nova feature"

4. Envie para o repositório remoto:
git push origin minha-feature

5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a MIT License.

## 🤝 Autores

<table>
  <tr>
    <td align="center">
      <a href="#" title="Guilherme P Muller">
        <img src="https://avatars.githubusercontent.com/u/14915623?v=4" width="100" height="100" alt="Guilherme P Muller"/>
        <br>
        <sub><b>Guilherme P Muller</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Lucas Gauto">
        <img src="https://avatars.githubusercontent.com/u/131922918?v=4" width="100" height="100" alt="Lucas Gauto"/>
        <br>
        <sub><b>Lucas Gauto</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Ana Paula Lima">
        <img src="https://avatars.githubusercontent.com/u/106444181?v=4" width="100" height="100" alt="Ana Paula Lima"/>
        <br>
        <sub><b>Ana Paula Lima</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Amanda Nascimento">
        <img src="https://avatars.githubusercontent.com/u/104909894?v=4" width="100" height="100" alt="Amanda Nascimento"/>
        <br>
        <sub><b>Amanda Nascimento</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="Anderson Ferreira">
        <img src="https://avatars.githubusercontent.com/u/97910606?v=4" width="100" height="100" alt="Anderson Ferreira"/>
        <br>
        <sub><b>Anderson Ferreira</b></sub>
      </a>
    </td>
  </tr>
</table>

