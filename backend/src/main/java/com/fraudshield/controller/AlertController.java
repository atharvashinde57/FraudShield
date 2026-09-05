package com.fraudshield.controller;

import com.fraudshield.model.FraudAlertEntity;
import com.fraudshield.repository.FraudAlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/alerts")
@CrossOrigin(origins = "*")
public class AlertController {

    @Autowired
    private FraudAlertRepository fraudAlertRepository;

    @GetMapping
    public List<FraudAlertEntity> getAllAlerts() {
        return fraudAlertRepository.findAll();
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<?> resolveAlert(@PathVariable String id) {
        return fraudAlertRepository.findById(id).map(alert -> {
            alert.setStatus("Resolved");
            fraudAlertRepository.save(alert);
            return ResponseEntity.ok(alert);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
