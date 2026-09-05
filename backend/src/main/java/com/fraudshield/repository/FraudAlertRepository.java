package com.fraudshield.repository;

import com.fraudshield.model.FraudAlertEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FraudAlertRepository extends JpaRepository<FraudAlertEntity, String> {
    List<FraudAlertEntity> findByStatus(String status);
}
