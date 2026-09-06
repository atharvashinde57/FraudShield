-- Flyway Database Migration: V1__create_users.sql
-- Table: users (Authentication & SecOps Analyst Accounts)

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50)
);
