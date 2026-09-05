package com.fraudshield.repository;

import com.fraudshield.model.FraudRuleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FraudRuleRepository extends JpaRepository<FraudRuleEntity, String> {
    List<FraudRuleEntity> findByStatus(String status);
}
