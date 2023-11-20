import React from "react";
import { Component } from "react";
import logo from "/assets/img/Logo.ico";
import menu from "/assets/img/menu.webp";
import close from "/assets/img/close.svg";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

window.addEventListener("scroll", function () {
  var header = this.document.querySelector("header");
  header.classList.toggle("abajo", window.scrollY > 0);
});

const navLinks = [
  {
    name: "Inicio",
    path: "/Home",
  },
  {
    name: "Pódcast",
    path: "/Podcast",
  },
];

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  render() {
    const { isMenuOpen } = this.state;

    // Verifica si hay un token en las cookies
    const token = Cookies.get("token");
    const logout = () => {
      // Muestra una ventana de confirmación antes de realizar el logout
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres cerrar la sesión?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Elimina el token de las cookies
          Cookies.remove("token");
          // Redirige al usuario a la página de inicio de sesión
          window.location.href = "/login";
        }
      });
    };

    return (
      <>
        <header>
          <a href="/" className="nav__logo">
            <img src={logo} alt="Logo" width={80} />
          </a>
          <nav>
            <ul
              className={`nav__link nav__link--menu ${
                isMenuOpen ? "nav__link--show" : ""
              }`}
            >
              {navLinks.map((link, index) => (
                <li key={index} className="content__item nav__item">
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "link-nav link--leda active"
                        : "link-nav link--leda"
                    }
                    data-text={link.name}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              ))}
              {/* Renderiza el botón de inicio de sesión solo si no hay un token */}
              {!token && (
                <li className="content__item nav__item">
                  <NavLink
                    to="/Login"
                    className={(navClass) =>
                      navClass.isActive
                        ? "link-nav link--leda active"
                        : "link-nav link--leda"
                    }
                    data-text="Login"
                  >
                    <span>Login</span>
                  </NavLink>
                </li>
              )}
              {token && (
                <li className="content__item nav__item">
                  <NavLink
                    to="/Dashboard"
                    className={(navClass) =>
                      navClass.isActive
                        ? "link-nav link--leda active"
                        : "link-nav link--leda"
                    }
                    data-text="Perfil"
                  >
                    <span>Perfil</span>
                  </NavLink>
                </li>
              )}
              <img
                src={close}
                className="nav__close"
                onClick={this.toggleMenu}
                alt="Cerrar menú"
              />
            </ul>
            <div className="nav__menu" onClick={this.toggleMenu}>
              <img src={menu} className="nav__img" alt="Menú" width="25px" />
            </div>
          </nav>
        </header>
      </>
    );
  }
}

export default Navbar;
