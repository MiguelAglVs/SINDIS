import React from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Error from "../pages/Error";
import Podcast from "../pages/Podcast";
import Inscription from "../pages/Inscription";
import Dashboard from "../pages/Dashboard";

const Routers = () => {
  const token = Cookies.get("token");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Podcast" element={<Podcast />} />
      <Route path="/Inscription" element={<Inscription />} />
      <Route path="/Signup" element={<Signup />} />
      <Route
        path="/Dashboard/*"
        element={
          <PrivateRoute token={token} redirectTo={"/Login"}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Routers;
