
# 📦 Projeto – Setup Completo

Bem-vindo ao projeto 👋  
Este guia explica **passo a passo** como preparar e correr o ambiente de desenvolvimento, em **Windows**, **Linux** ou **macOS**.  

> ⚠️ Pré-requisitos obrigatórios:  
> - [Node.js 18+](https://nodejs.org/en/) (inclui `npm`)  
> - [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou Docker Engine + Compose)  
> - [Git](https://git-scm.com/)  
> - (Opcional) [Prisma CLI](https://www.prisma.io/) já vem com `npx`  

---

## 🔹 1. Clonar o repositório

```bash
git clone <URL_DO_REPO>
cd <NOME_DO_REPO>
```

---

## 🔹 2. Criar ficheiros `.env`

### Windows PowerShell
```powershell
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
if (Test-Path infra\.env.example) { Copy-Item infra\.env.example .env } elseif (Test-Path .env.example) { Copy-Item .env.example .env }
```

### Windows Git Bash / Linux / macOS
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
[ -f infra/.env.example ] && cp infra/.env.example .env || { [ -f .env.example ] && cp .env.example .env; }
```

---

## 🔹 3. Instalar dependências

### Backend
```bash
cd backend
npm ci   # usa package-lock.json para instalar exatamente as versões
cd ..
```

### Frontend
```bash
cd frontend
npm ci
cd ..
```

> 💡 Se não existir `package-lock.json`, substitui `npm ci` por:
> ```bash
> npm install
> ```

---

## 🔹 4. (Opcional) Configurar Prisma

Se o projeto usar **Prisma** (BD):

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init   # é preciso ter o Docker a correr para conectar à BD
npm run seed   # só se existir script de seed no package.json
cd ..
```

---

## 🔹 5. Subir serviços com Docker

```bash
docker compose up -d --build
```

Verificar se os containers estão ativos:
```bash
docker compose ps
```

### ✅ 5.1. Testar o endpoint de health após subir o Docker

- **Windows PowerShell (Invoke-WebRequest):**
  ```powershell
  iwr http://localhost:3000/health
  ```

- **Git Bash / Linux / macOS (curl):**
  ```bash
  curl http://localhost:3000/health
  ```

Deves obter uma resposta JSON com estado OK.

---

## 🔹 6. Arrancar o Frontend em Dev

### Windows PowerShell
```powershell
cd frontend
npm run dev
```

### Linux / macOS / Git Bash
```bash
cd frontend
npm run dev
```

- Frontend → http://localhost:5173  
- API → http://localhost:3000  
- Healthcheck → http://localhost:3000/health  

---

## 🔹 7. Comandos úteis

### Parar todos os serviços
```bash
docker compose down
```

### Ver logs do backend
```bash
docker compose logs -f backend
```

### Resetar containers e volumes
```bash
docker compose down -v
```

### Migrar base de dados novamente
```bash
cd backend
npx prisma migrate dev
cd ..
```

---

## 🔹 8. Checklist rápido

✅ `.env` copiados  
✅ `npm ci` corrido em `backend/` e `frontend/`  
✅ `docker compose up -d --build` feito  
✅ **Health OK** com `iwr http://localhost:3000/health` (PowerShell) ou `curl http://localhost:3000/health` (bash)  
✅ Frontend abre em http://localhost:5173  

---

## 🔹 9. Problemas comuns

- **Porta já em uso (3000 / 5173 / 5432 / 6379)**  
  - Para serviços que usem essas portas, ou muda as portas em `.env`/`docker-compose.yml`.  

- **Frontend não consegue ligar ao backend**  
  - Verifica `frontend/.env` → a variável `VITE_API_URL` deve estar como `http://localhost:3000`.  

- **Prisma erros (`DATABASE_URL`)**  
  - Confirma `backend/.env` tem a string correta:  
    ```
    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/incidentdb?schema=public
    ```  
  - Corre novamente:  
    ```bash
    cd backend
    npx prisma generate
    npx prisma migrate dev
    ```

- **Docker não sobe**  
  - Garante que o Docker Desktop está aberto antes de correr `docker compose up`.  

---

# 🎯 Tudo pronto!  
Agora já tens o ambiente configurado para desenvolvimento 🚀
