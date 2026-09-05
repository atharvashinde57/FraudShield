# 🛡️ FraudShield - Full-Stack Security & Fraud Detection Platform

## 📖 1. Project Overview & How It Works

**FraudShield** is a real-time financial transaction monitoring and fraud detection dashboard designed for banks, fintech institutions, and SecOps security analysts. 

### How It Works:
1. **Transaction Ingestion**: Financial transactions arrive via REST API or live WebSocket/polling simulation stream.
2. **AI & Rule-Based Scoring Engine**: The **Spring Boot Fraud Detection Service** evaluates every incoming transaction against custom risk rules (high-ticket size anomalies, velocity distance variance, Tor proxy exit nodes, device fingerprint mismatches).
3. **Risk Score Assignment**: A dynamic score between `0` (Safe) and `100` (Critical Fraud) is calculated along with risk level badges (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
4. **Alert Generation**: Transactions scoring `≥ 80` trigger immediate critical security alerts saved directly to **MySQL / JPA database**.
5. **Analyst Workspace**: Security analysts review suspicious transactions in a **3-Panel Investigation Workspace**, log case notes, inspect customer hardware profiles, and execute instant `BLOCK` or `APPROVE` decisions synchronized across the stack.

---

## 💻 2. Technologies Used & Their Specific Purpose

### 🎨 Frontend Stack (React + Vite + TypeScript)

| Technology | Role / Purpose in FraudShield |
| :--- | :--- |
| **React 18** | UI framework used to build interactive, stateful SecOps dashboard views. |
| **TypeScript** | Type safety for financial data schemas (`Transaction`, `FraudAlert`, `CustomerProfile`, `FraudRule`). |
| **Vite** | Modern, lightning-fast build tool and local dev server. |
| **Vanilla CSS (Design Tokens)** | Custom cybersecurity dark-theme design system featuring glassmorphic cards, glowing alert badges, custom scrollbars, and animations. |
| **Recharts** | Data visualization library rendering interactive AreaCharts (Fraud activity stream), PieCharts (Payment rails), BarCharts (Geo-velocity hubs), and Scatter/Line curves (Precision vs. Recall). |
| **Lucide React** | Cyber and fintech icon set (`Shield`, `Radio`, `AlertTriangle`, `Search`, `Lock`, etc.). |

---

### ⚙️ Backend Stack (Spring Boot REST API)

| Technology | Role / Purpose in FraudShield |
| :--- | :--- |
| **Spring Boot 2.7** | Core Java web framework hosting the REST API endpoints (`/api/v1/auth`, `/api/v1/transactions`, `/api/v1/alerts`, `/api/v1/analytics`, `/api/v1/settings`). |
| **Spring Security** | Enterprise security layer protecting endpoints with stateless authentication and CORS configuration. |
| **JSON Web Tokens (JJWT 0.11.5)** | Generates and validates `Bearer` JWT tokens for SecOps analyst authentication (`JwtTokenProvider`, `JwtAuthenticationFilter`). |
| **Fraud Detection Engine Service** | Java service calculating risk velocity scores, ticket size thresholds, and Tor exit node indicators. |
| **Spring Data JPA** | Object-Relational Mapping (ORM) connecting Java entities to SQL database tables without writing raw SQL. |
| **Apache Maven 3.9** | Build tool dependency management and package compiler (`mvn clean package`). |

---

### 🗄️ Database & Containerization Stack

| Technology | Role / Purpose in FraudShield |
| :--- | :--- |
| **MySQL 8.0** | Relational Database Management System (RDBMS) storing transactions, alerts, customer profiles, and custom rules. |
| **H2 Database (Zero-Config Profile)** | Fast in-memory database fallback for zero-setup local dev testing. |
| **Docker & Docker Compose** | Multi-container containerization packaging database, backend REST API, and Nginx frontend into isolated environments. |
| **Nginx (Alpine)** | Web server hosting the built React app dist files in production container environment. |

---

## 🏗️ 3. Full-Stack Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          React 18 Frontend                             │
│       (Vite + TS + Recharts + Cybersecurity Dark Theme System)         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP REST / JWT Authorization Header
┌───────────────────────────────────▼────────────────────────────────────┐
│                    Spring Boot REST API (Port 8080)                    │
│      (Controllers: AuthController, TransactionController, etc.)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                       Spring Security + JJWT                           │
│        (Stateless Session, JwtAuthenticationFilter, Role Access)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    Fraud Detection Service Engine                      │
│        (Velocity Check, Ticket Size Anomaly, Geo Distance Score)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Spring Data JPA / Hibernate
┌───────────────────────────────────▼────────────────────────────────────┐
│                          MySQL 8.0 Database                            │
│           (Tables: users, transactions, fraud_alerts, rules)           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🐳 4. Docker Compatibility & Container Connections Guide

To make the application run seamlessly inside Docker, 3 containerized services communicate across an isolated **Docker Internal Bridge Network** (`fraudshield-network`):

### 🔄 Internal Container Connections:

1. **Database (`fraudshield-mysql`)**:
   - Host inside Docker network: `db`
   - Port inside Docker network: `3306`
2. **Spring Boot Backend (`fraudshield-backend`)**:
   - Host inside Docker network: `backend`
   - Port inside Docker network: `8080`
   - Connects to MySQL using JDBC URL: `jdbc:mysql://db:3306/fraudshield_db`
   - Waits for `db` to pass health check before booting.
3. **React Frontend (`fraudshield-frontend`)**:
   - Exposed on your computer at: `http://localhost:80` and `http://localhost:5173`
   - Uses Nginx reverse proxy to forward `/api/` requests internally to `http://backend:8080/api/`.

---

## 🚀 5. How to Run the Application

### Option A: Run via Docker Compose (Recommended)

1. Ensure Docker Desktop is installed and running on your computer.
2. Open terminal in the project directory:
   ```bash
   docker-compose up --build
   ```
3. Open your browser:
   - **Frontend App**: `http://localhost:5173` or `http://localhost`
   - **Backend API**: `http://localhost:8080/api/v1/analytics/overview`

---

### Option B: Run Locally (Without Docker)

1. **Start Spring Boot Backend**:
   ```bash
   cd backend
   java -jar target/fraudshield-backend-1.0.0.jar
   ```
   *(Runs on `http://localhost:8080` with built-in H2 database)*

2. **Start React Frontend**:
   ```bash
   npm run dev
   ```
   *(Runs on `http://localhost:5173`)*
