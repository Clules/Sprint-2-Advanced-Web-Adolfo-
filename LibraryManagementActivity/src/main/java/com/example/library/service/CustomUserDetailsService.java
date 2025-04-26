package com.example.library.service;

import com.example.library.model.User;
import com.example.library.repository.UserRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
   @Autowired
   private UserRepository userRepository;

   public CustomUserDetailsService() {
   }

   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      User user = this.userRepository.findByUsername(username);
      if (user == null) {
         throw new UsernameNotFoundException("User not found");
      } else {
         return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList());
      }
   }
}
