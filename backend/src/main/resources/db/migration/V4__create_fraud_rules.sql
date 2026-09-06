-- Flyway Database Migration: V4__create_fraud_rules.sql
-- Table: fraud_rules (Rules Engine Configuration & Custom Expressions)

CREATE TABLE IF NOT EXISTS fraud_rules (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255),
    condition_expr VARCHAR(500),
    action VARCHAR(50),
    risk_increment INT,
    status VARCHAR(50),
    triggered_count INT
);
