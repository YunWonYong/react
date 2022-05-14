import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrap from "./layout/Wrap";
import Lobby from "./contents/Lobby";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrap />}>
          <Route index element={<Lobby />} />
          <Route path="/about" />
          <Route path="/news" />
          <Route path="/event" />
          <Route path="/sloco" />
          <Route path="/market" />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
