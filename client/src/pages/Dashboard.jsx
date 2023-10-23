import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavDash";
import Home from "./dashboard/Home";
import Users from "./dashboard/Users";
import Content from "./dashboard/Content";
import Error from "./Error";

import { Routes, Route } from "react-router-dom";

import "../Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex body">
        <div className="sidebar close">
          <Sidebar />
        </div>
        <section className="content">
        <div className="navbar navbar-expand-lg shadow">
          <Navbar />
        </div>
        <div className="container-fluid p-3">
          <Routes>
            <Route path="" exact={true} element={<Home />} />
            <Route path="Users" exact={true} element={<Users />} />
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
