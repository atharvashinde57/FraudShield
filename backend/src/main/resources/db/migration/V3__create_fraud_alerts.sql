-- Flyway Database Migration: V3__create_fraud_alerts.sql
-- Table: fraud_alerts (Security Incidents & Flagged High-Risk Transactions)

CREATE TABLE IF NOT EXISTS fraud_alerts (
    id VARCHAR(100) PRIMARY KEY,
    alert_code VARCHAR(100),
    transaction_id VARCHAR(100),
    customer_name VARCHAR(255),
    customer_id VARCHAR(100),
    amount VARCHAR(50),
    risk_score INT,
    risk_level VARCHAR(50),
    reasons_csv VARCHAR(1000),
    timestamp VARCHAR(100),
    status VARCHAR(50)
);
