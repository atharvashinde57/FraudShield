package com.fraudshield.controller;

import com.fraudshield.model.FraudRuleEntity;
import com.fraudshield.repository.FraudRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private FraudRuleRepository fraudRuleRepository;

    @GetMapping("/rules")
    public List<FraudRuleEntity> getRules() {
        return fraudRuleRepository.findAll();
    }

    @PostMapping("/rules")
    public ResponseEntity<FraudRuleEntity> createRule(@RequestBody FraudRuleEntity rule) {
        if (rule.getId() == null) {
            rule.setId("RULE-00" + (fraudRuleRepository.count() + 1));
        }
        if (rule.getStatus() == null) {
            rule.setStatus("ACTIVE");
        }
        FraudRuleEntity saved = fraudRuleRepository.save(rule);
        return ResponseEntity.ok(saved);
    }
}
