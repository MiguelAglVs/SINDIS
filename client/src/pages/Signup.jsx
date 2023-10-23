import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import Navigation from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const valorInicial = {
    Nombre: "",
    Correo: "",
    Contrasena: "",
  };

  const [values, setValues] = useState(valorInicial);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si ya hay un token en las cookies
    const token = Cookies.get("token");
    if (token) {
      // Si hay un token, redirigir a la página de inicio
      setRedirectToHome(true);
    }
  }, []);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validarDatos = () => {
    // Expresiones regulares para validación
    const nombreRegex = /^[a-zA-Z\s]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!nombreRegex.test(values.Nombre)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Nombre inválido. Debe contener solo letras y espacios.",
      });
      return false;
    }

    if (!correoRegex.test(values.Correo)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo electrónico inválido.",
      });
      return false;
    }

    if (!contrasenaRegex.test(values.Contrasena)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Contraseña inválida. Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.",
      });
      return false;
    }

    return true;
  };

  const enviarDatos = async (e) => {
    e.preventDefault();

    // Validar datos antes de enviarlos
    if (!validarDatos()) {
      return;
    }

    // Logica para peticion POST
    const newAdmin = {
      Nombre_Admin: values.Nombre,
      Correo_Admin: values.Correo,
      Contrasena_Admin: values.Contrasena,
    };

    try {
      await axios.post("http://localhost:3000/api/register", newAdmin);
      // Mostrar SweetAlert2 en caso de éxito
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Cuenta creada con éxito",
      }).then((result) => {
        if (result.isConfirmed) {
          setRedirectToHome(true);
        }
      });
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear la cuenta",
      });
    }
    setValues({ ...valorInicial });
  };

  if (redirectToHome) {
    // window.location.href = "/Login";
    navigate("/Login");
  }

  return (
    <>
    <Navigation />
      <section className="knowledge">
        <div className="container">
          <form className="form" id="formulario" onSubmit={enviarDatos}>
            <h2 className="form__title">Registrarse</h2>
            <p className="form__paragraph">
              ¿Ya tienes cuenta?
              <Link to="/Login" className="form__link">
                Clic aquí
              </Link>
            </p>
            <div className="form__container">
              <div className="form__group">
                <input
                  type="text"
                  id="name"
                  className="form__input"
                  placeholder=""
                  name="Nombre"
                  value={values.Nombre}
                  onChange={capturarDatos}
                  autoComplete="off"
                />
                <label htmlFor="name" className="form__label">
                  Usuario:
                </label>
                <span className="form__line"></span>
              </div>
              <div className="form__group">
                <input
                  type="mail"
                  id="mail"
                  className="form__input"
                  placeholder=""
                  name="Correo"
                  value={values.Correo}
                  onChange={capturarDatos}
                  autoComplete="off"
                />
                <label htmlFor="mail" className="form__label">
                  Correo:
                </label>
                <span className="form__line"></span>
              </div>
              <div className="form__group">
                <input
                  type="password"
                  id="pass"
                  className="form__input"
                  placeholder=""
                  name="Contrasena"
                  value={values.Contrasena}
                  onChange={capturarDatos}
                  autoComplete="off"
                />
                <label htmlFor="pass" className="form__label">
                  Contraseña:
                </label>
                <span className="form__line"></span>
              </div>
              <input type="submit" className="form__submit" value="enviar" />
            </div>
            <p></p>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signup;
