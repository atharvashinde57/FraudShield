# 🛡️ FraudShield - Financial Fraud Detection & Transaction Monitoring System

An enterprise-grade fintech security dashboard featuring a **React 18 TypeScript** frontend, **Spring Boot 2.7 REST API**, **Spring Security + JWT Authentication**, **Fraud Detection Service Engine**, **Flyway Database Versioning**, and **MySQL / H2 Spring Data JPA** persistence.

---

## 🏗️ System Architecture

```text
                 USER
                  │
                  ▼
          ┌───────────────┐
          │ React Frontend│
          │ Render Static │
          └───────┬───────┘
                  │ HTTPS
                  ▼
          ┌───────────────┐
          │ Spring Boot   │
          │ REST API      │
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

## 🔒 Production Security & Environment Variables

Key secrets such as `APP_JWT_SECRET` and database credentials should **never** be hard-coded or committed to version control. Generate a random secret for production deployment:

```bash
openssl rand -hex 64
```

### Required Backend Environment Variables

```env
PORT=8080
SPRING_DATASOURCE_URL=jdbc:mysql://<DB_HOST>:3306/fraudshield_db?useSSL=false&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=<DB_USER>
SPRING_DATASOURCE_PASSWORD=<DB_PASSWORD>
SPRING_JPA_HIBERNATE_DDL_AUTO=update
APP_JWT_SECRET=<your-generated-secret>
```

### Required Frontend Environment Variables

```env
VITE_API_URL=https://your-production-backend-url/api/v1
```

---

## 🗄️ Database Migrations (Flyway)

FraudShield includes Flyway schema migrations located in `backend/src/main/resources/db/migration/`:
- `V1__create_users.sql`
- `V2__create_transactions.sql`
- `V3__create_fraud_alerts.sql`
- `V4__create_fraud_rules.sql`
- `V5__create_customers.sql`

Using explicit migration scripts ensures safe, version-controlled database schema changes in production environments.

---

## ⚡ Quick Start Options

### Option 1: Run with Docker Compose (Full Stack + MySQL)

```bash
docker-compose up --build
```
- **React Frontend**: `http://localhost:5173` (or `http://localhost`)
- **Spring Boot API**: `http://localhost:8080/api/v1`

---

### Option 2: Run Locally (Dev Mode)

1. **Launch Spring Boot Backend**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
2. **Launch React Frontend**:
   ```bash
   npm run dev
   ```

---

## 💼 Resume & Project Highlight

> **FraudShield — Financial Fraud Detection Platform**
> Developed a production-ready fraud detection platform using **Java, Spring Boot, Spring Security, JWT, JPA/Hibernate and MySQL**, implementing RESTful APIs for transaction monitoring, risk scoring and fraud alerts. Deployed the frontend and backend to cloud infrastructure with environment-based configuration.

---

## 📚 Complete Deployment & Architectural Guide

For step-by-step instructions on deploying to Railway, Render, Vercel, and Cloud MySQL, refer to:
👉 **[PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md)**

