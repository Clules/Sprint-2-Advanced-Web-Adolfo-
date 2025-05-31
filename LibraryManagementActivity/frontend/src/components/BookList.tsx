"use client";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Book,
  Calendar,
  Bookmark,
  Layers,
  Hash,
  Clock,
  Plus,
} from "lucide-react";
import { getAllBooks } from "../api/apiService";

interface BookType {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  genre: string;
  pages: number;
  createdAt: string;
}

export default function BookList() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);
        const data = await getAllBooks();
        // Ensure each book has a createdAt property
        setBooks(
          data.map((book: any) => ({
            ...book,
            createdAt: book.createdAt ?? "",
          }))
        );
      } catch (err) {
        setError("Could not fetch books. Please log in.");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, [navigate]);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8 flex">
        <div className="w-full">
          <h1 className="text-4xl font-bold text-gray-900">My Library</h1>
          <p className="text-gray-600 mt-2">
            Your personal collection of books
          </p>
        </div>
        <button
          onClick={() => navigate("/books/new")}
          className="flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          New Book
          <Plus className="inline-block ml-2 h-4 w-4" />
        </button>
      </header>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg overflow-hidden shadow-sm bg-white animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <Book className="h-16 w-16 text-gray-400" />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h2>
                <p className="text-gray-700 font-medium">{book.author}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bookmark className="h-4 w-4 mr-2" />
                    <span>Genre: {book.genre}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Published: {book.publicationYear}</span>
                  </div>
                  <div className="flex items-center">
                    <Layers className="h-4 w-4 mr-2" />
                    <span>{book.pages} pages</span>
                  </div>
                  <div className="flex items-center">
                    <Hash className="h-4 w-4 mr-2" />
                    <span>ISBN: {book.isbn}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Added: {formatDate(book.createdAt)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate(`/books/${book.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 w-full"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && books.length === 0 && !error && (
        <div className="text-center py-12">
          <Book className="h-16 w-16 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No books found
          </h3>
          <p className="mt-1 text-gray-500">
            Start adding books to your collection.
          </p>
        </div>
      )}
    </div>
  );
}
