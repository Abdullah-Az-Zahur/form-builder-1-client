import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import EditForm from "./pages/EditForm.jsx";
import Main from "./layout/Main.jsx";
import Categorize from "./components/Categorize.jsx";
import CreateForm from "./layout/CreateForm.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      {/* App Layout */}
      <Route element={<Main />}>
        <Route path="/" element={<Home />} />

        {/* Create Form */}
        <Route element={<CreateForm />}>
          <Route path="categorize" element={<Categorize />} />
          <Route path="form" element={<EditForm />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
