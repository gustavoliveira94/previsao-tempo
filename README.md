# Previsão do Tempo

## Descrição

Aplicação para verificar a previsão do tempo.
Logo quando iniciar a aplicação automaticamente irá pegar a sua localização e renderizar a previsão do local.
Você também pode alterar a localização para visualizar a previsão de outras cidades.

## Instalação

1. Baixe e instale o Node: [https://nodejs.org/]
2. Clone o repositório: `git clone https://github.com/gustavoliveira94/previsao-tempo.git` (SSH) or `https://github.com/gustavoliveira94/previsao-tempo.git` (HTTPS)
3. \[Opcional\] Instale o Yarn globalmente: `npm install -g yarn`
4. Instale as dependências do projeto: `yarn install` ou `npm install`
5. Inicie o ambiente de desenvolvimento: `npm start` ou `yarn start`.

## Iniciando no Docker

1. Na raiz do projeto execute: `docker build -t previsao .`.
2. Depois execute: `docker run -p 3000:3000 -d previsao`.

## Principais dependências

* [React](https://reactjs.org/)
* [Styled-components](https://styled-components.com/)

## Estrutura de diretórios

```
/
├─ src/              # Aplicação
├─ ├─api/            # Componente que retorna chamada da api
├─ ├─assets/         # imagens
├─ ├─components/     # Componentes react
├─ ├─styles/         # Arquivos relacionados a estilização
├─ .dockerignore     # Arquivos ignorados do docker
├─ .editorconfig     # Preferência do editorconfig
├─ .eslintrc         # Preferência do linter Javascript
├─ .gitignore        # Lista de arquivos e pastas ignoradas pelo git
├─ .prettierrc       # Preferência do prettier
├─ dockerfile        # Configuração do docker
├─ package.json      # Manifesto do projeto
└─ README.md         # Esse arquivo
```
