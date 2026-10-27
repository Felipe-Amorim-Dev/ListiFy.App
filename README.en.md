<p align="center"><img src="docs/Capa-ListiFy_App.png" alt="Project cover ListiFy.App" width="100%" /></p>

<h1 align="center">📚 ListiFy App</h1>

<p align="center"><em>Angular application for organizing personal collections.</em></p>

<p align="center">🇧🇷 <a href="README.md">Português</a> | 🇺🇸 English</p>

<p align="center"><img src="https://img.shields.io/badge/license-MIT-006bed?style=flat-square" alt="MIT" /> <img src="https://img.shields.io/github/last-commit/Felipe-Amorim-Dev/ListiFy.App?style=flat-square&color=006bed" alt="Last commit" /></p>

<p align="center"><a href="#sobre">About</a> • <a href="#tecnologias">Technologies</a> • <a href="#como-rodar">Running locally</a> • <a href="#licenca">License</a> • <a href="#autor">Author</a></p>

---

<a id="sobre"></a>
## 📖 About

ListiFy frontend developed with Angular 16, TypeScript, Bootstrap and Tailwind CSS. It uses the API maintained in ListiFy.Api.

## ✨ Features

- Collection management interface
- ASP.NET Core API integration

## 🛠️ Technologies

![Angular 16](https://img.shields.io/badge/Angular_16-006bed?style=for-the-badge) ![TypeScript 5.1](https://img.shields.io/badge/TypeScript_5.1-006bed?style=for-the-badge) ![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap_5.3-006bed?style=for-the-badge) ![Tailwind CSS 3.4](https://img.shields.io/badge/Tailwind_CSS_3.4-006bed?style=for-the-badge)

## 📦 Prerequisites

Node.js and npm compatible with the Angular version used by this project.

<a id="como-rodar"></a>
## 🚀 Running locally

```bash
git clone https://github.com/Felipe-Amorim-Dev/ListiFy.App.git
cd ListiFy.App
npm ci
npm start
```

http://localhost:4200

## 🔗 Related repositories

- [ListiFy.Api](https://github.com/Felipe-Amorim-Dev/ListiFy.Api) — Back-end ASP.NET Core

## 🏗️ Architecture and responsibilities

- AppModule registers components, routes, forms and HttpClient.
- AuthenticationGuard protects collection and account routes.
- src/environments/environment.ts configures apiBaseUrl, listifyUsuario and listifyItem.

### Execution flow

1. Angular forms → HTTP requests → ListiFy.Api → SQL Server
2. Dedicated components implement registration, catalogue, item updates and account screens.

### Local execution

```bash
npm ci
npm start
```

Project endpoint: http://localhost:4200

<a id="licenca"></a>
## 📄 License

Distributed under the [MIT license](LICENSE).

<a id="autor"></a>
## 👤 Author

**Felipe Figueiredo Amorim** — Full Stack Developer.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Felipe%20Amorim-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/felipe-amorim-dev/) [![E-mail](https://img.shields.io/badge/E--mail-contato-006bed?style=for-the-badge)](mailto:felipe.f.amorim@outlook.com)

<p align="center"><strong>Obrigado por visitar! / Thanks for visiting!</strong></p>
