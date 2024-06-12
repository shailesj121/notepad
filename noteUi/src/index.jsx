// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {} from "react-router-dom";
import Login from "./pages/login";
// import NoPage from "./pages/noPage";
import Home from "./pages/Notes";
import Signup from "./pages/SignUp";
import  {ProtactedRoute}  from "./utils/protactedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
    <Routes>
        {/* <Route path="/" element={<NoPage />} /> */}
        <Route index path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtactedRoute />}>
          <Route path="/user" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
);
