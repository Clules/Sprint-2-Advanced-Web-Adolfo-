// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import BookDetail from "./components/BookDetail";
// import other components like BookDetail, BookForm, etc.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/new" element={<AddBook />} />
        <Route path="/books/:id" element={<BookDetail />} />
        {/* more routes: /books/:id, /books/new, etc. */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
