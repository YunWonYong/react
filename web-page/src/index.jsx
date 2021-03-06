import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrap from "./layout/Wrap";
import Lobby from "./contents/Lobby";
import Market from "./contents/Market";
import Mint from "./contents/Mint";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrap />}>
          <Route index element={<Lobby />} />
          <Route path="/about" />
          <Route path="/news" />
          <Route path="/event" />
          <Route path="/sloco" />
          <Route path="/mint" element={<Mint/>}/>
          <Route path="/market" element={<Market />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
, document.getElementById("root"));
