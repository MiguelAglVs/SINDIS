import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Navbar = () => {
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
      <div className="container-fluid mx-3">
        <button className="navbar-brand btn toggle" aria-label="abrir menu">
          <i className="fa-solid fa-bars-staggered icon"></i>
        </button>
        <div className="" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {nombre}
              </a>
              <ul className="dropdown-menu dropdown-menu-end my-2">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li><hr className="dropdown-divider"></hr></li>
                <li>
                  <Link className="dropdown-item" onClick={logout}>
                    Log out
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
