import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

import Navigation from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const valorInicial = {
    Cedula: "",
    Nombre: "",
    PApellido: "",
    SApellido: "",
    Direccion: "",
    Telefono: "",
    Correo: "",
    Pass: "",
    CPass: "",
  };

  const [values, setValues] = useState(valorInicial);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [errores, setErrores] = useState({});
  const [validClasses, setValidClasses] = useState({});
  const navigate = useNavigate();

  const resetUsuario = () => {
    setValues(valorInicial);
  };

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
    validarCampo(name, value);
  };

  const validarCampo = (name, value) => {
    const nombreRegex = /^[a-zA-Z\s]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const numeroRegex = /^\d{10}$/;
    const ideRegex = /^\d{7,10}$/;
    const direccionRegex =
      /^[A-Za-z]{2,7}\s?\d{0,3}\s?[A-Za-z]?\s?#\s?\d{0,2}[A-Za-z]?\s?-\s?\d{0,3}[A-Za-z]?$/;
    const nuevosErrores = { ...errores };

    if (name === "Cedula") {
      if (!ideRegex.test(value)) {
        nuevosErrores.Cedula = true;
      } else {
        delete nuevosErrores.Cedula;
        setValidClasses({ ...validClasses, Cedula: "is-valid" });
      }
    }

    if (name === "Nombre") {
      if (!nombreRegex.test(value)) {
        nuevosErrores.Nombre = true;
      } else {
        delete nuevosErrores.Nombre;
        setValidClasses({ ...validClasses, Nombre: "is-valid" });
      }
    }

    if (name === "PApellido") {
      if (!nombreRegex.test(value)) {
        nuevosErrores.PApellido = true;
      } else {
        delete nuevosErrores.PApellido;
        setValidClasses({ ...validClasses, PApellido: "is-valid" });
      }
    }

    if (name === "SApellido") {
      if (!nombreRegex.test(value)) {
        nuevosErrores.SApellido = true;
      } else {
        delete nuevosErrores.SApellido;
        setValidClasses({ ...validClasses, SApellido: "is-valid" });
      }
    }

    if (name === "Telefono") {
      if (!numeroRegex.test(value)) {
        nuevosErrores.Telefono = true;
      } else {
        delete nuevosErrores.Telefono;
        setValidClasses({ ...validClasses, Telefono: "is-valid" });
      }
    }

    if (name === "Direccion") {
      if (!direccionRegex.test(value)) {
        nuevosErrores.Direccion = true;
      } else {
        delete nuevosErrores.Direccion;
        setValidClasses({ ...validClasses, Direccion: "is-valid" });
      }
    }

    if (name === "Correo") {
      if (!correoRegex.test(value)) {
        nuevosErrores.Correo = true;
      } else {
        delete nuevosErrores.Correo;
        setValidClasses({ ...validClasses, Correo: "is-valid" });
      }
    }

    if (name === "Pass") {
      if (!contrasenaRegex.test(value)) {
        nuevosErrores.Pass = true;
      } else {
        delete nuevosErrores.Pass;
        setValidClasses({ ...validClasses, Pass: "is-valid" });
      }
    }

    if (name === "CPass") {
      if (value !== values.Pass) {
        nuevosErrores.CPass = true;
      } else {
        delete nuevosErrores.CPass;
        setValidClasses({ ...validClasses, CPass: "is-valid" });
      }
    }

    setErrores(nuevosErrores);
  };

  const enviarDatos = async (e) => {
    e.preventDefault();

    if (Object.keys(errores).length === 0) {
      const newUser = {
        cedula: values.Cedula,
        nombre: values.Nombre,
        apellido: values.PApellido,
        segundo_apellido: values.SApellido,
        direccion: values.Direccion,
        telefono: values.Telefono,
        correo: values.Correo,
        contrasena: values.Pass,
      };

      try {
        await axios.post("http://localhost:3000/api/register", newUser);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Cuenta creada con éxito",
        }).then((result) => {
          if (result.isConfirmed) {
            resetUsuario();
            navigate("/Login");
          }
        });
      } catch (error) {
        console.error("Error en la solicitud POST:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al crear la cuenta.",
        });
      }
    }
  };

  useEffect(() => {
    if (redirectToHome) {
      navigate("/Login");
    }
  }, [redirectToHome]);

  return (
    <>
      <Navigation />
      <section className="knowledge">
        <div className="container-landing">
          <form className="form row g-3" id="formulario" onSubmit={enviarDatos}>
            <h2 className="form__title">Registrarse</h2>
            <p className="form__paragraph">
              ¿Ya tienes cuenta?
              <Link to="/Login" className="form__link">
                Clic aquí
              </Link>
            </p>
            <div className="col-md-6 form-floating mb-3">
              <input
                type="number"
                className={`form-control ${
                  errores.Cedula ? "is-invalid" : ""
                } ${validClasses.Cedula || ""}`}
                id="Cedula"
                placeholder=""
                name="Cedula"
                value={values.Cedula}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="Cedu">
                Cedula<samp style={{ color: "red" }}>*</samp>
              </label>
              <div className="invalid-feedback">
                {errores.Cedula &&
                  "Ingrese un numero de identificacion válido."}
              </div>
            </div>
            <div className="col-md-6 form-floating mb-3">
              <input
                type="text"
                className={`form-control ${
                  errores.Nombre ? "is-invalid" : ""
                } ${validClasses.Nombre || ""}`}
                id="Nombre"
                placeholder=""
                name="Nombre"
                value={values.Nombre}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="Nombre">
                Nombre<samp style={{ color: "red" }}>*</samp>
              </label>
              <div className="invalid-feedback">
                {errores.Nombre && "Ingrese un nombre válido."}
              </div>
            </div>
            <div className="col-md-6 form-floating mb-3">
              <input
                className={`form-control ${
                  errores.PApellido ? "is-invalid" : ""
                } ${validClasses.PApellido || ""}`}
                type="text"
                id="PApellido"
                placeholder=""
                name="PApellido"
                value={values.PApellido}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="PApellido">
                Apellido<samp style={{ color: "red" }}>*</samp>
              </label>
              <div className="invalid-feedback">
                {errores.SApellido && "Ingrese un apellido válido."}
              </div>
            </div>
            <div className="col-md-6 form-floating mb-3">
              <input
                type="text"
                className={`form-control ${
                  errores.SApellido ? "is-invalid" : ""
                } ${validClasses.SApellido || ""}`}
                id="SApellido"
                placeholder=""
                name="SApellido"
                value={values.SApellido}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="SApellido">Segundo pellido</label>
              <div className="invalid-feedback">
                {errores.SApellido && "Ingrese un apellido válido."}
              </div>
            </div>
            <div className="col-md-6 form-floating mb-3">
              <input
                type="text"
                className={`form-control ${
                  errores.Direccion ? "is-invalid" : ""
                } ${validClasses.Direccion || ""}`}
                id="Direccion"
                placeholder=""
                name="Direccion"
                value={values.Direccion}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="Direccion">
                Direccion<samp style={{ color: "red" }}>*</samp>
              </label>
              <div className="invalid-feedback">
                {errores.Direccion && "Ingrese una direccion válida."}
              </div>
            </div>
            <div className="col-md-6 form-floating mb-3">
              <input
                type="text"
                className={`form-control ${
                  errores.Telefono ? "is-invalid" : ""
                } ${validClasses.Telefono || ""}`}
                id="Telefono"
                placeholder=""
                name="Telefono"
                value={values.Telefono}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="Telefono">
                Telefono<samp style={{ color: "red" }}>*</samp>
              </label>
              <div className="invalid-feedback">
                {errores.Telefono && "Ingrese un numero de telefono válido."}
              </div>
            </div>
            <div className="col-md-12 form-floating mb-3">
              <input
                type="tel"
                className={`form-control ${
                  errores.Correo ? "is-invalid" : ""
                } ${validClasses.Correo || ""}`}
                id="Correo"
                placeholder=""
                name="Correo"
                value={values.Correo}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="Correo">
                Correo<samp style={{ color: "red" }}>*</samp>
              </label>
              <div className="invalid-feedback">
                {errores.Correo && "Ingrese un correo válido."}
              </div>
            </div>
            <div className="col-md-6 form-floating mb-3">
              <input
                type="password"
                className={`form-control ${errores.Pass ? "is-invalid" : ""} ${
                  validClasses.Pass || ""
                }`}
                id="Pass"
                placeholder=""
                name="Pass"
                value={values.Pass}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="Pass">
                Contraseña<samp style={{ color: "red" }}>*</samp>
              </label>
              <div className="invalid-feedback">
                {errores.Pass &&
                  "La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números."}
              </div>
            </div>
            <div className="col-md-6 form-floating mb-3">
              <input
                type="password"
                className={`form-control ${errores.CPass ? "is-invalid" : ""} ${
                  validClasses.CPass || ""
                }`}
                id="CPass"
                placeholder=""
                name="CPass"
                value={values.CPass}
                onChange={capturarDatos}
                autoComplete="off"
              />
              <label htmlFor="CPass">
                Confirmar contraseña<samp style={{ color: "red" }}>*</samp>
              </label>
              <div className="invalid-feedback">
                {errores.CPass && "Las contraseñas no coinciden."}
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <input type="submit" className="btn btn-about" value="enviar" />
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signup;
