package com.example.library.controller;

import com.example.library.model.AuthRequest;
import com.example.library.service.CustomUserDetailsService;
import com.example.library.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

   @Autowired
   private AuthenticationManager authenticationManager;

   @Autowired
   private JwtUtil jwtUtil;

   @Autowired
   private CustomUserDetailsService customUserDetailsService;

   @PostMapping("/authenticate")
   public String createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
      System.out.println("AuthRequest: " + authRequest);
      System.out.println("Username: " + authRequest.getUsername());
      System.out.println("Password: " + authRequest.getPassword());
      // Step 1: Authenticate user using Spring Security
      authenticationManager.authenticate(
         new UsernamePasswordAuthenticationToken(
            authRequest.getUsername(), authRequest.getPassword()
         )
      );

      // Step 2: Load user from your custom user details service
      UserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getUsername());

      // Step 3: Generate JWT token
      String token = jwtUtil.generateToken(userDetails.getUsername());
      Map<String, String> response = new HashMap<>();
            response.put("token", token);
      // Step 4: Return the token
      return token;
   }
}
