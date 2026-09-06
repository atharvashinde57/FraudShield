-- Flyway Database Migration: V2__create_transactions.sql
-- Table: transactions (Financial Transaction Monitoring Records)

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(100) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_id VARCHAR(100),
    amount DOUBLE,
    currency VARCHAR(10),
    formatted_amount VARCHAR(50),
    location VARCHAR(255),
    country VARCHAR(100),
    payment_method VARCHAR(100),
    merchant VARCHAR(255),
    risk_score INT,
    risk_level VARCHAR(50),
    status VARCHAR(50),
    timestamp VARCHAR(100),
    device VARCHAR(255),
    ip_address VARCHAR(100)
);
