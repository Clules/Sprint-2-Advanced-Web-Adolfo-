package com.example.library.config;

import com.example.library.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
   @Autowired
   private JwtUtil jwtUtil;
   @Autowired
   private UserDetailsService userDetailsService;

   public JwtRequestFilter() {
   }

   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
   throws ServletException, IOException {
      final String authHeader = request.getHeader("Authorization");
      String username = null;
      String jwt = null;

      try {
         if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            try {
               username = jwtUtil.extractUsername(jwt);
            } catch (Exception e) {
               logger.error("Invalid JWT token format: " + jwt, e);
               response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
               return;
            }
         }

         if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
               UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
               authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
               SecurityContextHolder.getContext().setAuthentication(authToken);
            }
         }

         chain.doFilter(request, response);
      } catch (Exception e) {
         logger.error("Error processing JWT", e);
         response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT authentication failed");
      }
   }
}
