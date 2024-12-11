import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import EditForm from "./pages/EditForm.jsx";
import Main from "./layout/Main.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<EditForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
