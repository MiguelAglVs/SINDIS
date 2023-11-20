import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavDash";
import Home from "./dashboard/Home";
import Admin from "./dashboard/Admin";
import Content from "./dashboard/Content";
import Roles from "./dashboard/Roles";
import Mas from "./dashboard/Mas";
import Error from "./Error";

import { Routes, Route } from "react-router-dom";

import "../Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex body" data-bs-theme="light">
        <div className="sidebar close bg-body-tertiary">
          <Sidebar />
        </div>
        <section className="content bg-body-tertiary">
          <div className="navbar navbar-expand-lg shadow">
            <Navbar />
          </div>
          <div className="container-fluid p-3">
            <Routes>
              <Route path="" exact={true} element={<Home />} />
              <Route path="Admin" exact={true} element={<Admin />} />
              <Route path="Content" exact={true} element={<Content />} />
              <Route path="Roles" exact={true} element={<Roles />} />
              <Route path="Mas" exact={true} element={<Mas />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
