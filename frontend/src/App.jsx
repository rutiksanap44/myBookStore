import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateBook from "./pages/CreatemyBook.jsx";
import DeleteBook from "./pages/DeleteBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/books/create" element={<CreateBook />}></Route>
      <Route path="/books/delete/:id" element={<DeleteBook />}></Route>
      <Route path="/books/details/:id" element={<ShowBook />}></Route>
      <Route path="/books/edit/:id" element={<UpdateBook />}></Route>
    </Routes>
  );
};

export default App;
