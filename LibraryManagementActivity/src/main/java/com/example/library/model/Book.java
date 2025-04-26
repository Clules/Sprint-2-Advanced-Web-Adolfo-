package com.example.library.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.sql.Timestamp;

@Entity
@Table(
   name = "books"
)
public class Book {
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
) String title;
   @Column(
      nullable = false
   )
   private @NotNull @Size(
   max = 255
) String author;
   @Column(
      unique = true,
      nullable = false
   )
   private @NotNull @Size(
   min = 10,
   max = 20
) String isbn;
   private @NotNull @Min(1000L) Integer publicationYear;
   private @Size(
   max = 100
) String genre;
   private @Min(1L) Integer pages;
   @Column(
      name = "created_at",
      nullable = false,
      insertable = false,
      updatable = false
   )
   private Timestamp createdAt;

   public Book() {
   }

   public Long getId() {
      return this.id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getTitle() {
      return this.title;
   }

   public void setTitle(String title) {
      this.title = title;
   }

   public String getAuthor() {
      return this.author;
   }

   public void setAuthor(String author) {
      this.author = author;
   }

   public String getIsbn() {
      return this.isbn;
   }

   public void setIsbn(String isbn) {
      this.isbn = isbn;
   }

   public Integer getPublicationYear() {
      return this.publicationYear;
   }

   public void setPublicationYear(Integer publicationYear) {
      this.publicationYear = publicationYear;
   }

   public String getGenre() {
      return this.genre;
   }

   public void setGenre(String genre) {
      this.genre = genre;
   }

   public Integer getPages() {
      return this.pages;
   }

   public void setPages(Integer pages) {
      this.pages = pages;
   }

   public Timestamp getCreatedAt() {
      return this.createdAt;
   }
}
