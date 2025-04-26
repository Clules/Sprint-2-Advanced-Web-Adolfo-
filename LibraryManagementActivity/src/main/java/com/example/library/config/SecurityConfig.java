// Source code is decompiled from a .class file using FernFlower decompiler.
package com.example.library.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
   @Autowired
   private JwtRequestFilter jwtRequestFilter;

   public SecurityConfig() {
   }

   @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      ((HttpSecurity)((ExpressionUrlAuthorizationConfigurer.AuthorizedUrl)((ExpressionUrlAuthorizationConfigurer.AuthorizedUrl)((HttpSecurity)http.csrf().disable()).authorizeRequests().requestMatchers("/swagger-ui/**",
          "/v3/api-docs/**",
          "/swagger-ui.html",
          "/swagger-ui.css",
          "/swagger-ui-bundle.js",
          "/swagger-ui-standalone-preset.js",
          "/swagger-initializer.js",
          "/index.css",
          "/favicon-32x32.png",
          "/favicon-16x16.png",
          "/webjars/**",
          "/authenticate")).permitAll().anyRequest()).authenticated().and()).addFilterBefore(this.jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
      return (SecurityFilterChain)http.build();
   }

   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
   }

   @Bean
   public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
   }

   @Bean
   public WebSecurityCustomizer webSecurityCustomizer() {
      return (web) -> web.ignoring().requestMatchers(
          "/swagger-ui/**",
          "/v3/api-docs/**",
          "/swagger-ui.html",
          "/swagger-ui.css",
          "/swagger-ui-bundle.js",
          "/swagger-ui-standalone-preset.js",
          "/swagger-initializer.js",
          "/index.css",
          "/favicon-32x32.png",
          "/favicon-16x16.png",
          "/webjars/**" // sometimes needed for bundled Swagger
      );
   }

   @Bean
   public PasswordEncoder passwordEncoder() {
      return NoOpPasswordEncoder.getInstance();
   }



}
