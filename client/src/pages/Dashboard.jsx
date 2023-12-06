import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavDash";
import Home from "./dashboard/Home";
import Admin from "./dashboard/Admin";
import Inscripcion from "./dashboard/Inscripcion";
import Content from "./dashboard/Content";
import Eps from "./dashboard/Eps";
import Discapacidades from "./dashboard/Discapacidades";
import Diagnosticos from "./dashboard/Diagnosticos";
import Error from "./Error";

import { Routes, Route } from "react-router-dom";

import "../Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex body" data-bs-theme="light">
        <div className="shadow">
          <Sidebar />
        </div>
        <section className="content w-100 bg-body-tertiary">
          <div className="container-fluid p-3">
            <Routes>
              <Route path="" exact={true} element={<Home />} />
              <Route path="Admin" exact={true} element={<Admin />} />
              <Route path="Admin" exact={true} element={<Admin />} />
              <Route path="Inscription" exact={true} element={<Inscripcion />} />
              <Route path="Content" exact={true} element={<Content />} />
              <Route path="Eps" exact={true} element={<Eps />} />
              <Route path="Discapacidades" exact={true} element={<Discapacidades />} />
              <Route path="Diagnosticos" exact={true} element={<Diagnosticos />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
