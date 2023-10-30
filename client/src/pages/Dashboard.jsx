import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavDash";
import Home from "../components/Home";
import Admin from "./dashboard/Admin";
import Content from "./dashboard/Content";
import Error from "./Error";

import { Routes, Route } from "react-router-dom";

import "../Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex body" data-bs-theme="light ">
        <div className="sidebar close bg-body-tertiary">
          <Sidebar />
        </div>
        <section className="content">
        <div className="navbar navbar-expand-lg bg-body-tertiary shadow">
          <Navbar />
        </div>
        <div className="container-fluid p-3 bg-body-tertiary">
          <Routes>
            <Route path="" exact={true} element={<Home />} />
            <Route path="Admin" exact={true} element={<Admin />} />
            <Route path="Content" exact={true} element={<Content />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
