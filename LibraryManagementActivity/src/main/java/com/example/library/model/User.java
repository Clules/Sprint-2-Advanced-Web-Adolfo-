package com.example.library.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.sql.Timestamp;

@Entity
@Table(
   name = "users"
)
public class User {
   @Id
   @GeneratedValue(
      strategy = GenerationType.IDENTITY
   )
   private Long id;
   @Column(
      nullable = false
   )
   private @NotNull @Size(
   max = 255
) String username;
   @Column(
      nullable = false
   )
   private @NotNull @Size(
   max = 255
) String password;
   @Column(
      nullable = false,
      unique = true
   )
   private @NotNull @Size(
   max = 255
) String email;
   @Column(
      nullable = false
   )
   private @NotNull @Size(
   max = 255
) String firstName;
   @Column(
      nullable = false
   )
   private @NotNull @Size(
   max = 255
) String lastName;
   @Column(
      nullable = false,
      updatable = false
   )
   private @NotNull Timestamp createdAt;
   @Column(
      nullable = false
   )
   private @NotNull Timestamp updatedAt;

   public User() {
   }

   public Long getId() {
      return this.id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getUsername() {
      return this.username;
   }

   public void setUsername(String username) {
      this.username = username;
   }

   public String getPassword() {
      return this.password;
   }

   public void setPassword(String password) {
      this.password = password;
   }

   public String getEmail() {
      return this.email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getFirstName() {
      return this.firstName;
   }

   public void setFirstName(String firstName) {
      this.firstName = firstName;
   }

   public String getLastName() {
      return this.lastName;
   }

   public void setLastName(String lastName) {
      this.lastName = lastName;
   }

   public Timestamp getCreatedAt() {
      return this.createdAt;
   }

   public void setCreatedAt(Timestamp createdAt) {
      this.createdAt = createdAt;
   }

   public Timestamp getUpdatedAt() {
      return this.updatedAt;
   }

   public void setUpdatedAt(Timestamp updatedAt) {
      this.updatedAt = updatedAt;
   }
}
