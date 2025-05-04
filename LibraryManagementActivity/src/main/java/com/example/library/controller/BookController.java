package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/books"})
@Tag(name = "Book Operations", description = "CRUD operations for books")
public class BookController {
   private final BookRepository bookRepository;

   public BookController(BookRepository bookRepository) {
      this.bookRepository = bookRepository;
   }

   @RequestMapping(
      method = {RequestMethod.GET}
   )
   @Operation(summary = "Get all books", description = "Retrieve a list of all books in the system")
   @ApiResponse(responseCode = "200", description = "Successfully retrieved list of books")
   @GetMapping
   public List<Book> getAllBooks() {
      return this.bookRepository.findAll();
   }
   @Operation(summary = "Get book by ID", description = "Retrieve a book by its ID", parameters = {
      @Parameter(name = "id", description = "ID of the book to retrieve")
   })
   @ApiResponse(responseCode = "200", description = "Successfully retrieved book")
   @ApiResponse(responseCode = "404", description = "Book not found")
   @GetMapping("/{id}")
   public ResponseEntity<Book> getBookById(@PathVariable Long id) {
      return (ResponseEntity)this.bookRepository.findById(id).map((book) -> {
         return ResponseEntity.ok().body(book);
      }).orElse(ResponseEntity.notFound().build());
   }

   @Operation(summary = "Create a new book", description = "Create a new book in the system")
   @ApiResponse(responseCode = "201", description = "Book successfully created")
   @PostMapping
   public Book createBook(@RequestBody Book book) {
      return (Book)this.bookRepository.save(book);
   }

   
   @Operation(summary = "Update book", description = "Update a book's details by its ID")
   @ApiResponse(responseCode = "200", description = "Successfully updated book")
   @ApiResponse(responseCode = "404", description = "Book not found")
   @PutMapping("/{id}")
   public ResponseEntity<Book> updateBook(
      @Parameter(description = "ID of the book to update") @PathVariable Long id,
      @RequestBody Book bookDetails) {
      return (ResponseEntity)this.bookRepository.findById(id).map((book) -> {
         book.setTitle(bookDetails.getTitle());
         book.setAuthor(bookDetails.getAuthor());
         book.setIsbn(bookDetails.getIsbn());
         book.setPublicationYear(bookDetails.getPublicationYear());
         book.setGenre(bookDetails.getGenre());
         book.setPages(bookDetails.getPages());
         Book updatedBook = (Book)this.bookRepository.save(book);
         return ResponseEntity.ok(updatedBook);
      }).orElse(ResponseEntity.notFound().build());
   }
   @Operation(summary = "Delete a book", description = "Delete a book by its ID")
   @ApiResponse(responseCode = "204", description = "Successfully deleted book")
   @ApiResponse(responseCode = "404", description = "Book not found")
   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteBook(
      @Parameter(description = "ID of the book to delete") @PathVariable Long id
   ) {
      return (ResponseEntity)this.bookRepository.findById(id).map((book) -> {
         this.bookRepository.delete(book);
         return ResponseEntity.noContent().build();
      }).orElse(ResponseEntity.notFound().build());
   }
}
