package com.fraudshield.controller;

import com.fraudshield.model.TransactionEntity;
import com.fraudshield.repository.TransactionRepository;
import com.fraudshield.service.FraudDetectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private FraudDetectionService fraudDetectionService;

    @GetMapping
    public List<TransactionEntity> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionEntity> getTransactionById(@PathVariable String id) {
        Optional<TransactionEntity> txn = transactionRepository.findById(id);
        return txn.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TransactionEntity> createTransaction(@RequestBody TransactionEntity txn) {
        if (txn.getId() == null) {
            txn.setId("TXN-" + (10000 + (int)(Math.random() * 90000)));
        }
        if (txn.getFormattedAmount() == null) {
            txn.setFormattedAmount("₹" + String.format("%,.0f", txn.getAmount()));
        }
        TransactionEntity evaluated = fraudDetectionService.evaluateTransaction(txn);
        return ResponseEntity.ok(evaluated);
    }

    @PostMapping("/{id}/block")
    public ResponseEntity<?> blockTransaction(@PathVariable String id) {
        return transactionRepository.findById(id).map(txn -> {
            txn.setStatus("BLOCKED");
            transactionRepository.save(txn);
            return ResponseEntity.ok(txn);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approveTransaction(@PathVariable String id) {
        return transactionRepository.findById(id).map(txn -> {
            txn.setStatus("LEGITIMATE");
            txn.setRiskScore(10);
            txn.setRiskLevel("LOW");
            transactionRepository.save(txn);
            return ResponseEntity.ok(txn);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
