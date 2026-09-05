package com.fraudshield.repository;

import com.fraudshield.model.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<TransactionEntity, String> {
    List<TransactionEntity> findByRiskLevel(String riskLevel);
    List<TransactionEntity> findByStatus(String status);
}
