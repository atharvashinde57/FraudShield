package com.fraudshield.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @GetMapping("/overview")
    public Map<String, Object> getAnalyticsOverview() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalVolume", "₹24.8M");
        stats.put("transactionsMonitored", 128492);
        stats.put("fraudDetected", 1284);
        stats.put("fraudRate", "0.99%");
        stats.put("preventedLoss", "₹8.4M");

        List<Map<String, Object>> paymentMethods = new ArrayList<>();
        paymentMethods.add(createMethodMap("Credit Card", 45));
        paymentMethods.add(createMethodMap("UPI", 28));
        paymentMethods.add(createMethodMap("Wire Transfer", 15));
        paymentMethods.add(createMethodMap("Crypto Swap", 8));
        paymentMethods.add(createMethodMap("ACH", 4));

        stats.put("paymentMethods", paymentMethods);

        return stats;
    }

    private Map<String, Object> createMethodMap(String name, int value) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        map.put("value", value);
        return map;
    }
}
