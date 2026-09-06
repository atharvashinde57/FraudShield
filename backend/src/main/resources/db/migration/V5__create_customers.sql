-- Flyway Database Migration: V5__create_customers.sql
-- Table: customers (Customer Risk Profiles & Historical Activity)

CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    country VARCHAR(100),
    account_age_months INT,
    total_transactions INT,
    total_volume VARCHAR(100),
    fraud_attempts INT,
    risk_level VARCHAR(50),
    account_status VARCHAR(50),
    devices_csv VARCHAR(500),
    locations_csv VARCHAR(500),
    recent_activity VARCHAR(255)
);
