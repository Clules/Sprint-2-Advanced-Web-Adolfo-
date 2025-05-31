// frontend/src/components/NewBook.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../api/apiService";

interface NewBookData {
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  genre: string;
  pages: number;
}

export default function AddBook() {
  const navigate = useNavigate();

  // Local state for each field
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<number>(
    new Date().getFullYear()
  );
  const [genre, setGenre] = useState<string>("");
  const [pages, setPages] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // Basic front-end validation
    if (
      !title.trim() ||
      !author.trim() ||
      !isbn.trim() ||
      !genre.trim() ||
      pages <= 0
    ) {
      setError("Please fill in all fields and ensure pages is greater than 0.");
      setSubmitting(false);
      return;
    }

    const newBook: NewBookData = {
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      publicationYear,
      genre: genre.trim(),
      pages,
    };

    try {
      await createBook(newBook);
      // On success, redirect to book list
      navigate("/books");
    } catch (err) {
      setError(
        "Failed to create book. Please check your input or login status."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Book</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* ISBN */}
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Publication Year */}
        <div>
          <label
            htmlFor="publicationYear"
            className="block text-sm font-medium text-gray-700"
          >
            Publication Year
          </label>
          <input
            type="number"
            id="publicationYear"
            value={publicationYear}
            onChange={(e) => setPublicationYear(Number(e.target.value))}
            min={1000}
            max={new Date().getFullYear()}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Pages */}
        <div>
          <label
            htmlFor="pages"
            className="block text-sm font-medium text-gray-700"
          >
            Pages
          </label>
          <input
            type="number"
            id="pages"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            min={1}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 rounded-md text-white ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Saving..." : "Create Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
