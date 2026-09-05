package com.fraudshield.model;

import javax.persistence.*;

@Entity
@Table(name = "fraud_rules")
public class FraudRuleEntity {

    @Id
    private String id;

    private String name;

    @Column(length = 500)
    private String conditionExpr;

    private String action;
    private int riskIncrement;
    private String status;
    private int triggeredCount;

    public FraudRuleEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getConditionExpr() { return conditionExpr; }
    public void setConditionExpr(String conditionExpr) { this.conditionExpr = conditionExpr; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public int getRiskIncrement() { return riskIncrement; }
    public void setRiskIncrement(int riskIncrement) { this.riskIncrement = riskIncrement; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getTriggeredCount() { return triggeredCount; }
    public void setTriggeredCount(int triggeredCount) { this.triggeredCount = triggeredCount; }
}
