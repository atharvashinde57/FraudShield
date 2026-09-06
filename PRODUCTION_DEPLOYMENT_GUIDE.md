# 🌐 FraudShield - Production Deployment & Cloud Database Guide

This guide explains how to deploy FraudShield live to the web, cloud database choices, environment variable management, database migration strategies, and enterprise architecture.

---

## ⚠️ 1. Security Best Practices: JWT Secrets & Environment Variables

> [!IMPORTANT]
> Never commit secrets or private keys directly to GitHub or hard-code them in source files. If a secret has ever been committed to a public repository, **rotate it immediately**.

### Generating & Setting `APP_JWT_SECRET`
Generate a strong random secret key using OpenSSL or Base64 in your terminal:
```bash
openssl rand -hex 64
```
Do **NOT** commit this value to code. Set `APP_JWT_SECRET` only in your hosting platform's environment settings:

```env
APP_JWT_SECRET=<your-generated-secret>
```

---

## ⚡ 2. Environment-Based API Configuration

To run the exact same codebase locally and in production:

### Frontend Dynamic URL Resolution (`src/services/api.ts`)
```typescript
const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api/v1";
```

### Local `.env` (Development):
```env
VITE_API_URL=http://localhost:8080/api/v1
```

### Cloud Environment (Production):
```env
VITE_API_URL=https://your-real-backend-url/api/v1
```

---

## ⚙️ 3. Spring Boot Configuration via Environment Variables

Your `application.properties` uses environment variables with fallback defaults:

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:h2:mem:fraudshield_db;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;MODE=MySQL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:sa}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:password}

spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
app.jwt.secret=${APP_JWT_SECRET:<your-generated-secret>}
```

In your cloud provider (e.g. Railway, Render, Heroku), provide:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://HOST:3306/fraudshield_db?useSSL=false&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=frauduser
SPRING_DATASOURCE_PASSWORD=your_secure_password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
APP_JWT_SECRET=<your-generated-secret>
```

---

## 🗄️ 4. Enterprise Production Database Migrations (Flyway / Liquibase)

While `spring.jpa.hibernate.ddl-auto=update` is convenient during active development, production enterprise systems use structured database migrations (e.g. **Flyway** or **Liquibase**) for deterministic schema versioning.

Schema version scripts are stored in `src/main/resources/db/migration/`:
- `V1__create_users.sql`
- `V2__create_transactions.sql`
- `V3__create_fraud_alerts.sql`
- `V4__create_fraud_rules.sql`
- `V5__create_customers.sql`

> [!TIP]
> Mentioning database versioning tools like Flyway during technical interviews demonstrates a strong understanding of modern DevOps and production database management principles.

---

## 🏗️ 5. System Architecture Diagram (Render.com Deployment)

```text
                 USER
                  │
                  ▼
          ┌───────────────┐
          │ React Frontend│
          │  Render Static│
          └───────┬───────┘
                  │ HTTPS
                  ▼
          ┌───────────────┐
          │ Spring Boot   │
          │ Render Web Svc│
          └───────┬───────┘
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
 Spring Security  │     Fraud Engine
      + JWT       │          │
                  ▼          ▼
             JPA/Hibernate
                  │
                  ▼
          ┌───────────────┐
          │ MySQL Cloud   │
          └───────────────┘
```

---

## 🚀 6. Step-by-Step Render.com Deployment Guide

### Step 1: Provision Cloud MySQL Database (Aiven / Railway / Render)
1. Provision a managed MySQL instance on **Aiven.io**, **Railway.app**, or **Render**.
2. Save database connection parameters:
   - `DB_HOST`, `DB_PORT` (3306), `DB_NAME` (`fraudshield_db`), `DB_USER`, `DB_PASSWORD`.

---

### Step 2: Deploy Backend API on Render (Web Service)
1. Go to **Render.com** -> Click **New +** -> Select **Web Service**.
2. Connect your GitHub repository (`https://github.com/atharvashinde57/FraudShield.git`).
3. Settings:
   - **Name**: `fraudshield-api`
   - **Root Directory**: `backend`
   - **Environment**: `Docker` (Render auto-detects `backend/Dockerfile`)
4. In **Environment Variables**, add:
   ```env
   SPRING_DATASOURCE_URL=jdbc:mysql://<DB_HOST>:3306/fraudshield_db?useSSL=false&serverTimezone=UTC
   SPRING_DATASOURCE_USERNAME=<DB_USER>
   SPRING_DATASOURCE_PASSWORD=<DB_PASSWORD>
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   APP_JWT_SECRET=<your-generated-secret>
   ```
5. Click **Create Web Service**. Note your backend live URL:
   `https://fraudshield-api.onrender.com`

---

### Step 3: Deploy Frontend on Render (Static Site)
1. On Render Dashboard -> Click **New +** -> Select **Static Site**.
2. Connect your GitHub repository (`https://github.com/atharvashinde57/FraudShield.git`).
3. Settings:
   - **Name**: `fraudshield-ui`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Advanced** -> **Environment Variables**, add:
   ```env
   VITE_API_URL=https://fraudshield-api.onrender.com/api/v1
   ```
5. Click **Create Static Site**. Render will build and host your live frontend at:
   `https://fraudshield-ui.onrender.com`

---

## 💼 7. Resume & Technical Pitch Highlight

When showcasing this project on your resume or portfolio:

> **FraudShield — Financial Fraud Detection Platform**
> Developed a production-ready fraud detection platform using **Java, Spring Boot, Spring Security, JWT, JPA/Hibernate and MySQL**, implementing RESTful APIs for transaction monitoring, risk scoring and fraud alerts. Deployed both frontend and backend services to Render cloud infrastructure with environment-based configuration.


