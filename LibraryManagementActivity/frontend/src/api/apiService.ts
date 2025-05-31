// frontend/src/api/apiService.ts
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

// ────────────────────────────────────────────────────────────────────────────────
// ─── 1. BOOK INTERFACES ────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Matches your Java Book entity:
 * {
 *   id?: number;
 *   title: string;
 *   author: string;
 *   isbn: string;
 *   publicationYear: number;
 *   genre: string;
 *   pages: number;
 * }
 */
export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  genre: string;
  pages: number;
}

// ────────────────────────────────────────────────────────────────────────────────
// ─── 2. CONFIGURE BASE URLS ─────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

/**
 * During build, VITE_API_BASE_URL is injected (e.g. "http://backend:8080").
 * In dev mode, fallback to localhost.
 */
const RAW_API: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const AUTH_URL = `${RAW_API}/authenticate`;
const BOOKS_URL = `${RAW_API}/api/books`;

// ────────────────────────────────────────────────────────────────────────────────
// ─── 3. COOKIE HELPERS ──────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const cookieArr = document.cookie.split(";");
  for (let cookie of cookieArr) {
    const [key, val] = cookie.trim().split("=");
    if (key === name) return val;
  }
  return null;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// ────────────────────────────────────────────────────────────────────────────────
// ─── 4. AUTHENTICATION ──────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

/**
 * POST to /authenticate with { username, password }.
 * On success, backend returns `{ token: string }`.
 * We save token in a cookie named 'jwt'.
 *
 * @param username
 * @param password
 * @returns Promise<string>  The JWT string.
 */
export async function login(
  username: string,
  password: string
): Promise<string> {
  try {
    // Tell Axios we expect a plain string response
    const resp = await axios.post<string>(
      AUTH_URL,
      { username, password },
      {
        headers: { "Content-Type": "application/json" },
        responseType: "text", // ensure Axios doesn’t try to parse JSON
      }
    );

    // resp.data is the raw JWT string
    const token = resp.data.trim();
    if (!token) {
      throw new Error("No token returned from /authenticate");
    }

    // Save token in cookie for 1 day
    setCookie("jwt", token, 1);
    return token;
  } catch (err: any) {
    console.error("Login failed:", err.response?.data ?? err.message);
    throw err;
  }
}

/**
 * Clears the saved JWT (logging out).
 */
export function logout(): void {
  deleteCookie("jwt");
}

/**
 * Builds an AxiosRequestConfig with the Authorization header:
 *  { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
 * Throws if no JWT cookie is found.
 */
function authHeaderConfig(): AxiosRequestConfig {
  const token = getCookie("jwt");
  if (!token) {
    throw new Error("No JWT cookie found—user is not logged in.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

// ────────────────────────────────────────────────────────────────────────────────
// ─── 5. BOOK CRUD (requires JWT) ─────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/books
 * @returns Promise<Book[]>  An array of all books.
 */
export async function getAllBooks(): Promise<Book[]> {
  try {
    const config = authHeaderConfig();
    const resp = await axios.get<Book[]>(BOOKS_URL, config);
    return resp.data;
  } catch (err: any) {
    console.error("getAllBooks error:", err.response?.data ?? err.message);
    throw err;
  }
}

/**
 * GET /api/books/{id}
 * @param id  Book ID
 * @returns Promise<Book>  The single Book object.
 */
export async function getBookById(id: number | string): Promise<Book> {
  try {
    const config = authHeaderConfig();
    const resp = await axios.get<Book>(`${BOOKS_URL}/${id}`, config);
    return resp.data;
  } catch (err: any) {
    console.error(
      `getBookById(${id}) error:`,
      err.response?.data ?? err.message
    );
    throw err;
  }
}

/**
 * POST /api/books
 * @param newBook  A Book without ID (backend will generate it)
 * @returns Promise<Book>  The created Book object (including generated id).
 */
export async function createBook(newBook: Book): Promise<Book> {
  try {
    const config = authHeaderConfig();
    const resp = await axios.post<Book>(BOOKS_URL, newBook, config);
    return resp.data;
  } catch (err: any) {
    console.error("createBook error:", err.response?.data ?? err.message);
    throw err;
  }
}

/**
 * PUT /api/books/{id}
 * @param id           Book ID to update
 * @param bookDetails  A full Book object with updated fields
 * @returns Promise<Book>  The updated Book object.
 */
export async function updateBook(
  id: number | string,
  bookDetails: Book
): Promise<Book> {
  try {
    const config = authHeaderConfig();
    const resp = await axios.put<Book>(
      `${BOOKS_URL}/${id}`,
      bookDetails,
      config
    );
    return resp.data;
  } catch (err: any) {
    console.error(
      `updateBook(${id}) error:`,
      err.response?.data ?? err.message
    );
    throw err;
  }
}

/**
 * DELETE /api/books/{id}
 * @param id  Book ID to delete
 * @returns Promise<void>  Resolves if deletion succeeded (204 No Content).
 */
export async function deleteBook(id: number | string): Promise<void> {
  try {
    const config = authHeaderConfig();
    await axios.delete<void>(`${BOOKS_URL}/${id}`, config);
  } catch (err: any) {
    console.error(
      `deleteBook(${id}) error:`,
      err.response?.data ?? err.message
    );
    throw err;
  }
}
