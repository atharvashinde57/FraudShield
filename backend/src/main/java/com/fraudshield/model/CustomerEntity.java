package com.fraudshield.model;

import javax.persistence.*;

@Entity
@Table(name = "customers")
public class CustomerEntity {

    @Id
    private String id;

    private String name;
    private String email;
    private String country;
    private int accountAgeMonths;
    private int totalTransactions;
    private String totalVolume;
    private int fraudAttempts;
    private String riskLevel;
    private String accountStatus;

    @Column(length = 500)
    private String devicesCsv;

    @Column(length = 500)
    private String locationsCsv;

    private String recentActivity;

    public CustomerEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public int getAccountAgeMonths() { return accountAgeMonths; }
    public void setAccountAgeMonths(int accountAgeMonths) { this.accountAgeMonths = accountAgeMonths; }

    public int getTotalTransactions() { return totalTransactions; }
    public void setTotalTransactions(int totalTransactions) { this.totalTransactions = totalTransactions; }

    public String getTotalVolume() { return totalVolume; }
    public void setTotalVolume(String totalVolume) { this.totalVolume = totalVolume; }

    public int getFraudAttempts() { return fraudAttempts; }
    public void setFraudAttempts(int fraudAttempts) { this.fraudAttempts = fraudAttempts; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getAccountStatus() { return accountStatus; }
    public void setAccountStatus(String accountStatus) { this.accountStatus = accountStatus; }

    public String getDevicesCsv() { return devicesCsv; }
    public void setDevicesCsv(String devicesCsv) { this.devicesCsv = devicesCsv; }

    public String getLocationsCsv() { return locationsCsv; }
    public void setLocationsCsv(String locationsCsv) { this.locationsCsv = locationsCsv; }

    public String getRecentActivity() { return recentActivity; }
    public void setRecentActivity(String recentActivity) { this.recentActivity = recentActivity; }
}
