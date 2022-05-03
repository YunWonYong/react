import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layouts/Header";
import Search from "./components/users/Search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route path="/user/*" >
            <Route path="search" element={<Search/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);


