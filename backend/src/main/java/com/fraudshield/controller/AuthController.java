package com.fraudshield.controller;

import com.fraudshield.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.getOrDefault("email", "analyst@fraudshield.ai");

        // Generate JWT token
        String token = tokenProvider.generateToken(email, "ROLE_ANALYST");

        Map<String, Object> userData = new HashMap<>();
        userData.put("email", email);
        userData.put("name", "Senior Analyst");
        userData.put("role", "SecOps Tier-3");

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("tokenType", "Bearer");
        response.put("user", userData);

        return ResponseEntity.ok(response);
    }
}
