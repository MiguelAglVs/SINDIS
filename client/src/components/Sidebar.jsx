import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Sidebar = () => {
  const location = useLocation();
  const token = Cookies.get("token");
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  const nombre = tokenData.nombre;
  const perfil = tokenData.perfil;
  const nonbre_perfil = tokenData.nonbre_perfil;

  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveMenu(currentPath);
  }, [location.pathname]);

  const [isRolesSubMenuOpen, setIsRolesSubMenuOpen] = useState(false);
  const [isTablasSubMenuOpen, setIsTablasSubMenuOpen] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const closeOtherSubMenus = (currentSubMenu) => {
    if (currentSubMenu === "Roles") {
      setIsTablasSubMenuOpen(false);
    } else if (currentSubMenu === "Tablas") {
      setIsRolesSubMenuOpen(false);
    }
  };

  const handleRolesClick = () => {
    closeOtherSubMenus("Roles");
    setIsRolesSubMenuOpen(!isRolesSubMenuOpen);
  };

  const handletablasClick = () => {
    closeOtherSubMenus("Tablas");
    setIsTablasSubMenuOpen(!isTablasSubMenuOpen);
  };

  const handleSubMenuLinkClick = () => {
    setIsRolesSubMenuOpen(false);
    setIsTablasSubMenuOpen(false);
  };

  const toggleSidebarActive = () => {
    setIsSidebarActive(!isSidebarActive);
  };

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
      <div className={`sidebar ${isSidebarActive ? "active" : ""}`}>
        <div className="menu-btn" onClick={toggleSidebarActive}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="head">
          <div className="user-img">
            <NavLink to="/">
              <img src="/assets/img/Logo.webp" alt="" />
            </NavLink>
          </div>
          <div className="user-details">
            <p className="title">{nonbre_perfil}</p>
            <p className="name">{nombre}</p>
          </div>
        </div>
        <div className="nav-slider">
          <div className="menu">
            <p className="title">main</p>
            <ul>
              {perfil !== 1 && (
                <>
                  <li className={activeMenu === "/Dashboard" ? "active" : ""}>
                    <NavLink to="/Dashboard">
                      <i className="fa-solid fa-house icon"></i>
                      <span className="text">Dashboard</span>
                    </NavLink>
                  </li>

                  <li
                    className={
                      activeMenu === "/Dashboard/Admin" ? "active" : ""
                    }
                  >
                    <NavLink to="/Dashboard/Admin">
                      <i className="fa-solid fa-user-group icon"></i>
                      <span className="text">Usuarios</span>
                    </NavLink>
                  </li>
                  <li className={isRolesSubMenuOpen ? "active" : ""}>
                    <NavLink onClick={handleRolesClick}>
                      <i className="fa-solid fa-id-card-clip icon"></i>
                      <span className="text">Acceso</span>
                      <i
                        className={`fa-solid fa-chevron-${
                          isRolesSubMenuOpen ? "up" : "down"
                        } arrow`}
                      ></i>
                    </NavLink>

                    <ul
                      className={`sub-menu ${isRolesSubMenuOpen ? "open" : ""}`}
                    >
                      <li
                        className={
                          activeMenu === "/Dashboard/Roles" ? "active" : ""
                        }
                      >
                        <NavLink
                          to="/Dashboard/Roles"
                          onClick={handleSubMenuLinkClick}
                        >
                          <samp className="text">Roles</samp>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/Dashboard/Perfiles"
                          onClick={handleSubMenuLinkClick}
                        >
                          <samp className="text">Perfiles</samp>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/Dashboard/Permisos"
                          onClick={handleSubMenuLinkClick}
                        >
                          <samp className="text">Permisos</samp>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/Dashboard/Formularios"
                          onClick={handleSubMenuLinkClick}
                        >
                          <samp className="text">Formularios</samp>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li
                className={
                  activeMenu === "/Dashboard/Inscription" ? "active" : ""
                }
              >
                <NavLink to="/Dashboard/Inscription">
                  <i className="fa-solid fa-user icon"></i>
                  <span className="text">Inscripción</span>
                </NavLink>
              </li>
              {perfil !== 1 && (
                <>
                  <li
                    className={
                      activeMenu === "/Dashboard/Content" ? "active" : ""
                    }
                  >
                    <NavLink to="/Dashboard/Content">
                      <i className="fa-solid fa-image icon"></i>
                      <span className="text">Contenido</span>
                    </NavLink>
                  </li>
                  <li className={isTablasSubMenuOpen ? "active" : ""}>
                    <NavLink onClick={handletablasClick}>
                      <i className="fa-solid fa-table-cells-large icon"></i>
                      <span className="text">Tablas</span>
                      <i
                        className={`fa-solid fa-chevron-${
                          isTablasSubMenuOpen ? "up" : "down"
                        } arrow`}
                      ></i>
                    </NavLink>
                    <ul
                      className={`sub-menu ${
                        isTablasSubMenuOpen ? "open" : ""
                      }`}
                    >
                      <li
                        className={
                          activeMenu === "/Dashboard/Eps" ? "active" : ""
                        }
                      >
                        <NavLink
                          to="/Dashboard/Eps"
                          onClick={handleSubMenuLinkClick}
                        >
                          <samp className="text">Eps</samp>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="" onClick={handleSubMenuLinkClick}>
                          <samp className="text">Diagnosticos</samp>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="" onClick={handleSubMenuLinkClick}>
                          <samp className="text">Discaoacidades</samp>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="menu">
          <p className="title">Cuenta</p>
          <ul>
            <li>
              <NavLink onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket icon"></i>
                <span className="text">Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
