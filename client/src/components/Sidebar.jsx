import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
    const body = document.querySelector(".body");
    const sidebar = body.querySelector(".sidebar");
    const toggle = body.querySelector(".toggle");
    // const searchBtn = body.querySelector(".search-box");
    const modeSwitch = body.querySelector(".toggle-switch");

    const toggleClickHandler = () => {
      sidebar.classList.toggle("close");
    };

    toggle.addEventListener("click", toggleClickHandler);

    return () => {
      toggle.removeEventListener("click", toggleClickHandler);
    };
  }, []);

  const token = Cookies.get("token");
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  let nombre = tokenData.nombre;
  let rol = tokenData.rol;

  const logout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar la sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        window.location.href = "/login";
      }
    });
  };

  return (
    <>
      <div className="header-sidebar">
        <div className="logo icon">
          <a href="/" aria-label="ir a la pagina principal">
            <img
              src="/assets/img/Logo.webp"
              alt="logo"
              width="50px"
              height="40"
            />
          </a>
        </div>
      </div>
      <div className="menu-bar">
        <div className="menu">
          {/* <li className="search-box">
            <i className="fa-solid fa-magnifying-glass icon"></i>
            <input type="text" placeholder="Buscar..." />
          </li> */}
          <ul className="menu-links">
            <li
              className={`navlink ${isActive === "dashboard" ? "activo" : ""}`}
            >
              <NavLink
                to=""
                exact="true"
                onClick={() => setIsActive("dashboard")}
              >
                <i className="fa-solid fa-house icon"></i>
                <span className="text nav-text">Dasboard</span>
              </NavLink>
            </li>
            <li className={`navlink ${isActive === "users" ? "activo" : ""}`}>
              <NavLink
                to="/Dashboard/Admin"
                exact="true"
                onClick={() => setIsActive("users")}
              >
                {/* <i className="fa-solid fa-gears icon"></i> */}
                <i className="fa-solid fa-user icon"></i>
                <span className="text nav-text">Usuarios</span>
              </NavLink>
            </li>
            <li className={`navlink ${isActive === "roles" ? "activo" : ""}`}>
              <NavLink
                to="/Dashboard/Roles"
                exact="true"
                onClick={() => setIsActive("roles")}
              >
                <i className="fa-solid fa-user-shield icon"></i>
                <span className="text nav-text">Roles</span>
              </NavLink>
            </li>
            <li className={`navlink ${isActive === "Mas" ? "activo" : ""}`}>
              <NavLink
                to="/Dashboard/Mas"
                exact="true"
                onClick={() => setIsActive("Mas")}
              >
                <i className="fa-solid fa-grip icon"></i>
                <span className="text nav-text">Mas</span>
              </NavLink>
            </li>
            <li className={`navlink ${isActive === "content" ? "activo" : ""}`}>
              <NavLink
                to="/Dashboard/Content"
                exact="true"
                onClick={() => setIsActive("content")}
              >
                <i className="fa-regular fa-images icon"></i>

                <span className="text nav-text">Contenido</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="botton-content">
          <ul className="menu-links">
            <li className="navlink">
              <Link onClick={logout} className="">
                <i className="fa-solid fa-arrow-right-from-bracket icon"></i>
                <span className="text nav-text">Salir</span>
              </Link>
            </li>
            {/* <li className="mode">
              <div className="sun-moon">
                <i className="fa-regular fa-moon icon moon"></i>
                <i className="fa-regular fa-sun icon sun"></i>
                <div className="toggle-switch">
                  <span className="switch"></span>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
