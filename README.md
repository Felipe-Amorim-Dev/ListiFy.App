# ListiFy — Angular application

**Portfolio application / Projeto de portfólio.** Angular 16 frontend for organizing personal collections (for example CDs, DVDs and other collectibles). The backend is [ListiFy.Api](https://github.com/Felipe-Amorim-Dev/ListiFy.Api).

## Technology
Angular, TypeScript, HTML/CSS, Bootstrap and Tailwind CSS dependencies are included in the project.

## Local development
```bash
git clone https://github.com/Felipe-Amorim-Dev/ListiFy.App.git
cd ListiFy.App
npm ci
npm start
```
Typically opens at `http://localhost:4200`. Configure API URLs and start the backend separately; check environment settings in `src/environments` before running.

## Build and tests
```bash
npm run build
npm test
```
Tests may include Angular-generated specs; confirm behavior coverage and CI results rather than treating their presence as proof of reliability.

## Scope and limitations
This repository contains the **frontend only**. Authentication, persistence and network behavior depend on the backend and its local configuration. No production deployment or security guarantees are claimed.

**PT-BR:** Front-end de organização de coleções em Angular, integrado ao repositório ListiFy.Api. A execução ponta a ponta depende da configuração do backend.
