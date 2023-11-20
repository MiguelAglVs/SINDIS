import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import Navigation from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const valorInicial = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(valorInicial);
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setRedirectToHome(true);
    }
  }, []);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const enviarDatos = async (e) => {
    e.preventDefault();

    const login = {
      nombre: formData.username,
      contrasena: formData.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        login
      );

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("token", token);

        Swal.fire({
          icon: "success",
          title: "Inicio de Sesión Exitoso",
          text: "¡Bienvenido!",
        }).then((result) => {
          if (result.isConfirmed) {
            setRedirectToHome(true);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Credenciales incorrectas. Inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
      });
    }
  };

  if (redirectToHome) {
    window.location.href = "/Dashboard";
  }

  return (
    <>
      <Navigation />
      <section className="knowledge">
        <div className="container-landing mb-4">
          <form className="form" onSubmit={enviarDatos}>
            <h2 className="form__title">Inicia Sesión</h2>
            <p className="form__paragraph">
              ¿Aún no tienes cuenta?
              <Link to="/Signup" className="form__link">
                Clic aquí
              </Link>
            </p>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder=""
                name="username"
                value={formData.username}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder=""
                name="password"
                value={formData.password}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <input type="submit" className="btn btn-about" value="enviar" />
            </div>

            {/* <div className="form__container">
              <div className="form__group">
                <input
                  type="text"
                  id="username"
                  className="form__input"
                  placeholder=""
                  name="username"
                  value={formData.username}
                  onChange={capturarDatos}
                  autoComplete="off"
                />
                <label htmlFor="username" className="form__label">
                  Usuario o Correo
                </label>
                <span className="form__line"></span>
              </div>
              <div className="form__group">
                <input
                  type="password"
                  id="password"
                  className="form__input"
                  placeholder=""
                  name="password"
                  value={formData.password}
                  onChange={capturarDatos}
                  autoComplete="off"
                />
                <label htmlFor="password" className="form__label">
                  Contraseña
                </label>
                <span className="form__line"></span>
              </div>
              <input type="submit" className="form__submit" value="Enviar" />
            </div> */}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
