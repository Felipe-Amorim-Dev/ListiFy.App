<p align="center"><img src="docs/Capa-ListiFy_App.png" alt="Capa do projeto ListiFy.App" width="100%" /></p>

<h1 align="center">📚 ListiFy App</h1>

<p align="center"><em>Interface Angular para organizar coleções pessoais.</em></p>

<p align="center">🇧🇷 Português | 🇺🇸 <a href="README.en.md">English</a></p>

<p align="center"><img src="https://img.shields.io/badge/licen%C3%A7a-MIT-006bed?style=flat-square" alt="MIT" /> <img src="https://img.shields.io/github/last-commit/Felipe-Amorim-Dev/ListiFy.App?style=flat-square&color=006bed" alt="Last commit" /></p>

<p align="center"><a href="#sobre">Sobre</a> • <a href="#tecnologias">Tecnologias</a> • <a href="#como-rodar">Como rodar</a> • <a href="#licenca">Licença</a> • <a href="#autor">Autor</a></p>

---

<a id="sobre"></a>
## 📖 Sobre

Front-end do ListiFy desenvolvido com Angular 16, TypeScript, Bootstrap e Tailwind CSS. Consome a API mantida no repositório ListiFy.Api.

## ✨ Funcionalidades

- Interface web de coleções
- Integração com API ASP.NET Core

## 🛠️ Tecnologias

![Angular 16](https://img.shields.io/badge/Angular_16-006bed?style=for-the-badge) ![TypeScript 5.1](https://img.shields.io/badge/TypeScript_5.1-006bed?style=for-the-badge) ![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap_5.3-006bed?style=for-the-badge) ![Tailwind CSS 3.4](https://img.shields.io/badge/Tailwind_CSS_3.4-006bed?style=for-the-badge)

## 📦 Pré-requisitos

Node.js e npm compatíveis com a versão do Angular deste projeto.

<a id="como-rodar"></a>
## 🚀 Como rodar

```bash
git clone https://github.com/Felipe-Amorim-Dev/ListiFy.App.git
cd ListiFy.App
npm ci
npm start
```

http://localhost:4200

## 🔗 Repositórios relacionados

- [ListiFy.Api](https://github.com/Felipe-Amorim-Dev/ListiFy.Api) — Back-end ASP.NET Core

## 🏗️ Arquitetura e responsabilidades

- AppModule registra componentes, rotas, formulários e HttpClient.
- AuthenticationGuard controla acesso às rotas de cadastro, consulta e atualização de itens e à conta.
- src/environments/environment.ts centraliza apiBaseUrl, listifyUsuario e listifyItem.

### Fluxo de funcionamento

1. Formulários Angular → comunicação HTTP → ListiFy.Api → SQL Server
2. Componentes específicos implementam cadastro, catálogo, atualização de itens e perfil.

### Execução local

```bash
npm ci
npm start
```

Endereço do projeto: http://localhost:4200

<a id="licenca"></a>
## 📄 Licença

Distribuído sob a [licença MIT](LICENSE).

<a id="autor"></a>
## 👤 Autor

**Felipe Figueiredo Amorim** — Desenvolvedor Full Stack.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Felipe%20Amorim-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/felipe-amorim-dev/) [![E-mail](https://img.shields.io/badge/E--mail-contato-006bed?style=for-the-badge)](mailto:felipe.f.amorim@outlook.com)

<p align="center"><strong>Obrigado por visitar! / Thanks for visiting!</strong></p>
