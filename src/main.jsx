import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";

import Main from "./layout/Main.jsx";
import CreateForm from "./pages/CreateForm.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      {/* App Layout */}
      <Route element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<CreateForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
