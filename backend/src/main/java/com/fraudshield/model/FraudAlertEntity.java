package com.fraudshield.model;

import javax.persistence.*;

@Entity
@Table(name = "fraud_alerts")
public class FraudAlertEntity {

    @Id
    private String id;

    private String alertCode;
    private String transactionId;
    private String customerName;
    private String customerId;
    private String amount;
    private int riskScore;
    private String riskLevel;

    @Column(length = 1000)
    private String reasonsCsv;

    private String timestamp;
    private String status;

    public FraudAlertEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAlertCode() { return alertCode; }
    public void setAlertCode(String alertCode) { this.alertCode = alertCode; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getAmount() { return amount; }
    public void setAmount(String amount) { this.amount = amount; }

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getReasonsCsv() { return reasonsCsv; }
    public void setReasonsCsv(String reasonsCsv) { this.reasonsCsv = reasonsCsv; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
