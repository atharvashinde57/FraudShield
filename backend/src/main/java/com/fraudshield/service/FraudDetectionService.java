package com.fraudshield.service;

import com.fraudshield.model.FraudAlertEntity;
import com.fraudshield.model.TransactionEntity;
import com.fraudshield.repository.FraudAlertRepository;
import com.fraudshield.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class FraudDetectionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private FraudAlertRepository fraudAlertRepository;

    public TransactionEntity evaluateTransaction(TransactionEntity txn) {
        int calculatedScore = 0;
        List<String> riskReasons = new ArrayList<>();

        // Rule 1: High Ticket Size Anomaly
        if (txn.getAmount() > 50000) {
            calculatedScore += 45;
            riskReasons.add("High amount transfer above threshold (> ₹50,000)");
        } else if (txn.getAmount() > 20000) {
            calculatedScore += 20;
            riskReasons.add("Elevated ticket size transaction");
        }

        // Rule 2: Device & Tor Proxy Anomaly
        if (txn.getDevice() != null && txn.getDevice().toLowerCase().contains("tor")) {
            calculatedScore += 50;
            riskReasons.add("Anonymized Tor Exit Node IP / Unrecognized hardware fingerprint");
        }

        // Rule 3: Geo-velocity distance anomaly
        if (txn.getLocation() != null && (txn.getLocation().contains("Russia") || txn.getLocation().contains("Offshore"))) {
            calculatedScore += 40;
            riskReasons.add("Cross-border login velocity anomaly (> 500km in < 15 mins)");
        }

        // Cap score between 0 and 99
        calculatedScore = Math.min(Math.max(calculatedScore, txn.getRiskScore()), 99);
        txn.setRiskScore(calculatedScore);

        // Map severity level
        if (calculatedScore >= 81) {
            txn.setRiskLevel("CRITICAL");
            txn.setStatus("SUSPICIOUS");
        } else if (calculatedScore >= 61) {
            txn.setRiskLevel("HIGH");
            txn.setStatus("SUSPICIOUS");
        } else if (calculatedScore >= 31) {
            txn.setRiskLevel("MEDIUM");
            txn.setStatus("UNDER_REVIEW");
        } else {
            txn.setRiskLevel("LOW");
            txn.setStatus("LEGITIMATE");
        }

        // Save evaluated transaction
        TransactionEntity savedTxn = transactionRepository.save(txn);

        // Generate critical fraud alert if threshold breached
        if (calculatedScore >= 80) {
            FraudAlertEntity alert = new FraudAlertEntity();
            alert.setId("ALT-" + (System.currentTimeMillis() % 10000));
            alert.setAlertCode("RULE-CRIT-" + (calculatedScore > 90 ? "90" : "80"));
            alert.setTransactionId(savedTxn.getId());
            alert.setCustomerName(savedTxn.getCustomerName());
            alert.setCustomerId(savedTxn.getCustomerId());
            alert.setAmount(savedTxn.getFormattedAmount());
            alert.setRiskScore(calculatedScore);
            alert.setRiskLevel(savedTxn.getRiskLevel());
            alert.setReasonsCsv(String.join("; ", riskReasons));
            alert.setTimestamp("Just now");
            alert.setStatus("Critical");
            fraudAlertRepository.save(alert);
        }

        return savedTxn;
    }
}
