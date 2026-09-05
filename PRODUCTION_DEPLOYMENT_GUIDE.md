# 🌐 FraudShield - Production Deployment & Cloud Database Guide

This guide explains how to deploy FraudShield live to the web, cloud database choices, and environment variables needed.

---

## ❓ 1. Do You Need MongoDB?

**No, MongoDB is NOT required.**

### Why MySQL / PostgreSQL is Better for FraudShield:
- **Financial Integrity**: Financial transactions require strict **ACID compliance** to guarantee zero data corruption.
- **Relational Structure**: FraudShield links `Users`, `Transactions`, `FraudAlerts`, `Customers`, and `FraudRules` via relational foreign keys.
- **Existing Architecture**: The Spring Boot backend is already built with **Spring Data JPA & Hibernate** which connects directly to MySQL / PostgreSQL.

---

## ☁️ 2. Cloud Database Options (Free & Paid)

To keep your data safe and persistent in the cloud when live, choose any of these cloud MySQL hosting providers:

| Provider | Free Tier Available? | Setup Difficulty | Best For |
| :--- | :--- | :--- | :--- |
| **Railway (MySQL)** | Yes ($5 free credit/mo) | ⚡ 1-Click | Quickest deployment with Spring Boot |
| **Aiven for MySQL** | Yes (Free Trial) | 🟢 Easy | Managed cloud MySQL |
| **Render (PostgreSQL)** | Yes (Free 90 days) | 🟢 Easy | Spring Boot native support |
| **AWS RDS (MySQL)** | Yes (12 Months Free) | 🟡 Moderate | Enterprise Production |

---

## 🚀 3. Recommended 3-Step Live Deployment Setup

### Step 1: Provision Cloud Database (e.g., Railway / Aiven)
1. Create a MySQL database on **Railway.app** or **Aiven.io**.
2. Note your database credentials:
   - `DB_HOST` (e.g., `mysql.railway.internal` or `containers-us-west.railway.app`)
   - `DB_PORT` (e.g., `3306` or `3307`)
   - `DB_NAME` (`fraudshield_db`)
   - `DB_USER` (`root` or `frauduser`)
   - `DB_PASSWORD` (`your_cloud_password`)

---

### Step 2: Deploy Spring Boot Backend API (Render.com / Railway)

1. Connect your GitHub repository (`https://github.com/atharvashinde57/FraudShield.git`) to **Render.com** or **Railway.app**.
2. Select **Web Service** -> Root directory: `/backend` (or select Docker deploy using `backend/Dockerfile`).
3. Set Environment Variables:
   ```env
   SPRING_DATASOURCE_URL=jdbc:mysql://<DB_HOST>:<DB_PORT>/fraudshield_db?useSSL=false&serverTimezone=UTC
   SPRING_DATASOURCE_USERNAME=<DB_USER>
   SPRING_DATASOURCE_PASSWORD=<DB_PASSWORD>
   SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.MySQL8Dialect
   SPRING_JPA_HIBERNATE_DDL_AUTO=update
   APP_JWT_SECRET=FraudShieldSecuritySuperSecretKey2026EnterpriseSecOpsAuthenticationTokenKey9988776655
   ```
4. Render / Railway will give you a live API URL like:
   `https://fraudshield-api.onrender.com`

---

### Step 3: Deploy React Frontend (Vercel / Netlify / Render)

1. Connect your GitHub repository (`https://github.com/atharvashinde57/FraudShield.git`) to **Vercel.com** or **Netlify.com**.
2. Build Settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. In `src/services/api.ts`, update `API_BASE_URL` to point to your live backend:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fraudshield-api.onrender.com/api/v1';
   ```
4. In Vercel / Netlify dashboard, add Environment Variable:
   ```env
   VITE_API_URL=https://fraudshield-api.onrender.com/api/v1
   ```
5. Click **Deploy**! Your site will be live on a custom URL (e.g., `https://fraudshield.vercel.app`).
