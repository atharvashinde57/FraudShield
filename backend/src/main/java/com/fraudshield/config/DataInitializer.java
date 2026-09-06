package com.fraudshield.config;

import com.fraudshield.model.*;
import com.fraudshield.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private FraudAlertRepository fraudAlertRepository;

    @Autowired
    private FraudRuleRepository fraudRuleRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Analyst User
        if (!userRepository.existsByEmail("analyst@fraudshield.ai")) {
            User analyst = new User("analyst@fraudshield.ai", passwordEncoder.encode("secops2026"), "Senior Analyst", "ROLE_ANALYST");
            userRepository.save(analyst);
        }

        // 2. Seed Initial Transactions
        if (transactionRepository.count() == 0) {
            TransactionEntity t1 = new TransactionEntity();
            t1.setId("TXN-92831");
            t1.setCustomerName("Amit Kumar");
            t1.setCustomerId("CUST-6469");
            t1.setAmount(485000);
            t1.setCurrency("INR");
            t1.setFormattedAmount("₹4,85,000");
            t1.setLocation("Moscow, RU (Tor Exit Node)");
            t1.setCountry("India");
            t1.setPaymentMethod("UPI / Instant Transfer");
            t1.setMerchant("Crypto Swap Vault");
            t1.setRiskScore(94);
            t1.setRiskLevel("CRITICAL");
            t1.setStatus("SUSPICIOUS");
            t1.setTimestamp("2 mins ago");
            t1.setDevice("Unknown Linux Tor Proxy");
            t1.setIpAddress("185.220.101.4");
            transactionRepository.save(t1);

            TransactionEntity t2 = new TransactionEntity();
            t2.setId("TXN-88219");
            t2.setCustomerName("Sarah Jenkins");
            t2.setCustomerId("CUST-1042");
            t2.setAmount(1250);
            t2.setCurrency("USD");
            t2.setFormattedAmount("$1,250");
            t2.setLocation("London, UK");
            t2.setCountry("United Kingdom");
            t2.setPaymentMethod("Credit Card");
            t2.setMerchant("Harrods Department Store");
            t2.setRiskScore(15);
            t2.setRiskLevel("LOW");
            t2.setStatus("LEGITIMATE");
            t2.setTimestamp("8 mins ago");
            t2.setDevice("iPhone 15 Pro Max");
            t2.setIpAddress("82.132.215.12");
            transactionRepository.save(t2);

            TransactionEntity t3 = new TransactionEntity();
            t3.setId("TXN-74102");
            t3.setCustomerName("Rahul Sharma");
            t3.setCustomerId("CUST-8831");
            t3.setAmount(98200);
            t3.setCurrency("INR");
            t3.setFormattedAmount("₹98,200");
            t3.setLocation("Mumbai, IN");
            t3.setCountry("India");
            t3.setPaymentMethod("Wire Transfer");
            t3.setMerchant("Offshore Tech Liquidity");
            t3.setRiskScore(78);
            t3.setRiskLevel("HIGH");
            t3.setStatus("SUSPICIOUS");
            t3.setTimestamp("14 mins ago");
            t3.setDevice("MacBook Pro M2");
            t3.setIpAddress("103.22.140.8");
            transactionRepository.save(t3);
        }

        // 3. Seed Fraud Alerts
        if (fraudAlertRepository.count() == 0) {
            FraudAlertEntity a1 = new FraudAlertEntity();
            a1.setId("ALT-1092");
            a1.setAlertCode("RULE-CRIT-001");
            a1.setTransactionId("TXN-92831");
            a1.setCustomerName("Rahul Sharma");
            a1.setCustomerId("CUST-8831");
            a1.setAmount("₹84,500");
            a1.setRiskScore(94);
            a1.setRiskLevel("CRITICAL");
            a1.setReasonsCsv("Unusual location shift; Tor browser exit node; High ticket size");
            a1.setTimestamp("2 mins ago");
            a1.setStatus("Critical");
            fraudAlertRepository.save(a1);
        }

        // 4. Seed Fraud Rules
        if (fraudRuleRepository.count() == 0) {
            FraudRuleEntity r1 = new FraudRuleEntity();
            r1.setId("RULE-001");
            r1.setName("Rapid High Ticket Transfer");
            r1.setConditionExpr("AMOUNT > 100000 AND IS_NEW_DEVICE == TRUE");
            r1.setAction("BLOCK");
            r1.setRiskIncrement(40);
            r1.setStatus("ACTIVE");
            r1.setTriggeredCount(142);
            fraudRuleRepository.save(r1);

            FraudRuleEntity r2 = new FraudRuleEntity();
            r2.setId("RULE-002");
            r2.setName("Geo Velocity Anomaly");
            r2.setConditionExpr("LOCATION_DELTA_KM > 500 AND TIME_DELTA_MIN < 15");
            r2.setAction("ALERT_CRITICAL");
            r2.setRiskIncrement(35);
            r2.setStatus("ACTIVE");
            r2.setTriggeredCount(89);
            fraudRuleRepository.save(r2);
        }

        // 4. Seed Customer Profiles
        if (customerRepository.count() == 0) {
            CustomerEntity c1 = new CustomerEntity();
            c1.setId("CUST-8831");
            c1.setName("Rahul Sharma");
            c1.setEmail("rahul.sharma@example.com");
            c1.setCountry("India");
            c1.setAccountAgeMonths(24);
            c1.setTotalTransactions(142);
            c1.setTotalVolume("₹14.2L");
            c1.setFraudAttempts(2);
            c1.setRiskLevel("CRITICAL");
            c1.setAccountStatus("Flagged");
            c1.setDevicesCsv("iPhone 14 Pro; MacBook Air M2; Unknown Tor Android");
            c1.setLocationsCsv("Mumbai, IN; Pune, IN");
            c1.setRecentActivity("Flagged transaction TXN-92831 under security hold");
            customerRepository.save(c1);

            CustomerEntity c2 = new CustomerEntity();
            c2.setId("CUST-4412");
            c2.setName("Priya Patel");
            c2.setEmail("priya.p@techcorp.in");
            c2.setCountry("India");
            c2.setAccountAgeMonths(1);
            c2.setTotalTransactions(8);
            c2.setTotalVolume("₹45,000");
            c2.setFraudAttempts(1);
            c2.setRiskLevel("HIGH");
            c2.setAccountStatus("Active");
            c2.setDevicesCsv("iPhone 15 Pro");
            c2.setLocationsCsv("Bengaluru, IN");
            c2.setRecentActivity("High risk UPI transfer requiring 2FA re-auth");
            customerRepository.save(c2);

            CustomerEntity c3 = new CustomerEntity();
            c3.setId("CUST-1092");
            c3.setName("Alexander Wright");
            c3.setEmail("awright@ukfinance.co.uk");
            c3.setCountry("United Kingdom");
            c3.setAccountAgeMonths(36);
            c3.setTotalTransactions(310);
            c3.setTotalVolume("$180,000");
            c3.setFraudAttempts(3);
            c3.setRiskLevel("CRITICAL");
            c3.setAccountStatus("Frozen");
            c3.setDevicesCsv("Dell XPS 15; Linux Proxy Node");
            c3.setLocationsCsv("London, UK; Amsterdam, NL");
            c3.setRecentActivity("Blocked wire transfer $2,430 due to malicious IP");
            customerRepository.save(c3);
        }
    }
}
