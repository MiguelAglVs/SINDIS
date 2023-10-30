import React, { useEffect, useState } from "react";
import { MagicMotion } from "react-magic-motion";
import Swal from "sweetalert2";
import axios from "axios";

const Admin = () => {
  const valorInicial = {
    Rol: "",
    Nombre: "",
    Correo: "",
    Contrasena: "",
    nombreRol: "",
  };
  const [values, setValues] = useState(valorInicial);
  const [Usuarios, setUsuarios] = useState([]);
  const [Roles, setRoles] = useState([]);
  const [selectedRol, setSelectedRol] = useState("");
  const [errores, setErrores] = useState({});
  const [validClasses, setValidClasses] = useState({});

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const response = await axios.get("http://localhost:3000/api/admin");
      setUsuarios(response.data);
    };

    obtenerUsuarios();
  }, [Usuarios]);

  useEffect(() => {
    const obtenerRoles = async () => {
      const response = await axios.get("http://localhost:3000/api/roles");
      setRoles(response.data);
    };

    obtenerRoles();
  }, [Roles]);

  const eliminarUsuario = async (id) => {
    await axios.delete(`http://localhost:3000/api/admin/${id}`);
    // const confirmation = await Swal.fire({
    //   title: "¿Estás seguro?",
    //   text: "¿Quieres eliminar este usuario?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Sí, eliminar",
    //   cancelButtonText: "Cancelar",
    // });

    // if (confirmation.isConfirmed) {
    //   try {
    //     await axios.delete(`http://localhost:3000/api/admin/${id}`);
    //     await Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
    //   } catch (error) {
    //     await Swal.fire("Error", "No se pudo eliminar el usuario", "error");
    //   }
    // }
  };

  // const eliminarRol = async (id) => {
  //   const confirmation = await Swal.fire({
  //     title: "¿Estás seguro?",
  //     text: "¿Quieres eliminar este rol?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Sí, eliminar",
  //     cancelButtonText: "Cancelar",
  //   });

  //   if (confirmation.isConfirmed) {
  //     try {
  //       await axios.delete(`http://localhost:3000/api/roles/${id}`);
  //       await Swal.fire("Eliminado", "El rol ha sido eliminado", "success");
  //     } catch (error) {
  //       await Swal.fire("Error", "No se pudo eliminar el rol", "error");
  //     }
  //   }
  // };

  const capturarUsuario = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validarCampo(name, value);
  };

  const validarCampo = (name, value) => {
    const nombreRegex = /^[a-zA-Z\s]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const nuevosErrores = { ...errores };

    if (name === "Nombre") {
      if (!nombreRegex.test(value)) {
        nuevosErrores.Nombre = true;
      } else {
        delete nuevosErrores.Nombre;
        document.getElementById("name").classList.remove("is-invalid");
        document.getElementById("name").classList.add("is-valid");
      }
    }

    if (name === "Correo") {
      if (!correoRegex.test(value)) {
        nuevosErrores.Correo = true;
      } else {
        delete nuevosErrores.Correo;
        document.getElementById("email").classList.remove("is-invalid");
        document.getElementById("email").classList.add("is-valid");
      }
    }

    if (name === "Contrasena") {
      if (!contrasenaRegex.test(value)) {
        nuevosErrores.Contrasena = true;
      } else {
        delete nuevosErrores.Contrasena;
        document.getElementById("pass").classList.remove("is-invalid");
        document.getElementById("pass").classList.add("is-valid");
      }
    }

    if (name === "nombreRol") {
      if (!nombreRegex.test(value)) {
        nuevosErrores.nombreRol = true;
      } else {
        delete nuevosErrores.nombreRol;
        document.getElementById("rol").classList.remove("is-invalid");
        document.getElementById("rol").classList.add("is-valid");
      }
    }

    setErrores(nuevosErrores);
  };

  const enviarUsuario = async (e) => {
    e.preventDefault();

    if (Object.keys(errores).length === 0) {
      const newAdmin = {
        Nombre_Admin: values.Nombre,
        Correo_Admin: values.Correo,
        Contrasena_Admin: values.Contrasena,
        Rol_Admin: selectedRol,
      };

      try {
        await axios.post("http://localhost:3000/api/register", newAdmin);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Cuenta creada con éxito",
        }).then((result) => {
          if (result.isConfirmed) {
            setRedirectToHome(true);
          }
        });

        // Restablece los valores y errores después de enviar los datos
        setValues({ ...valorInicial });
        setErrores({});

        // Elimina las clases "is-valid" de los campos
        document.getElementById("name").classList.remove("is-valid");
        document.getElementById("email").classList.remove("is-valid");
        document.getElementById("pass").classList.remove("is-valid");
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

  const capturarRol = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validarCampo(name, value);
  };

  const enviarRol = async (e) => {
    e.preventDefault();

    if (Object.keys(errores).length === 0) {
      const newRol = {
        Nombre_Rol: values.nombreRol,
      };

      try {
        await axios.post("http://localhost:3000/api/roles", newRol);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Rol creado con éxito",
        }).then((result) => {
          if (result.isConfirmed) {
            setRedirectToHome(true);
          }
        });

        setValues({ ...valorInicial });
        setErrores({});

        document.getElementById("rol").classList.remove("is-valid");
      } catch (error) {
        console.error("Error en la solicitud POST:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al crear el rol.",
        });
      }
    }
  };

  return (
    <>
      <h2>Usuarios y Roles</h2>
      <div className="container-fluid pt-3">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-12">
          <div className="col">
            <section className="card mb-3">
              <div className="card-header">Crear Usuario</div>
              <div className="card-body">
                <form className="row g-3" onSubmit={enviarUsuario}>
                  <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">
                      Rol
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      name="Rol"
                      value={selectedRol}
                      onChange={(e) => setSelectedRol(e.target.value)}
                    >
                      <option disabled value="0">
                        -- SELECIONE UN ROL --
                      </option>
                      {Roles.map((roles) => (
                        <option key={roles.ID_ROL} value={roles.ID_ROL}>
                          {roles.NOMBRE_ROL}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      className={`form-control ${
                        errores.Nombre ? "is-invalid" : ""
                      } ${validClasses.Nombre || ""}`}
                      type="text"
                      id="name"
                      placeholder=""
                      name="Nombre"
                      value={values.Nombre}
                      onChange={capturarUsuario}
                      autoComplete="off"
                    />
                    <div className="invalid-feedback">
                      {errores.Nombre && "Por favor, ingrese un nombre válido."}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Correo
                    </label>
                    <input
                      className={`form-control ${
                        errores.Correo ? "is-invalid" : ""
                      } ${validClasses.Correo || ""}`}
                      type="email"
                      id="email"
                      placeholder=""
                      name="Correo"
                      value={values.Correo}
                      onChange={capturarUsuario}
                      autoComplete="off"
                    />
                    <div className="invalid-feedback">
                      {errores.Correo &&
                        "Por favor, ingrese una dirección de correo válida."}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pass" className="form-label">
                      Contraseña
                    </label>
                    <input
                      className={`form-control ${
                        errores.Contrasena ? "is-invalid" : ""
                      } ${validClasses.Contrasena || ""}`}
                      type="password"
                      id="pass"
                      placeholder=""
                      name="Contrasena"
                      value={values.Contrasena}
                      onChange={capturarUsuario}
                      autoComplete="off"
                    />
                    <div className="invalid-feedback">
                      {errores.Contrasena &&
                        "La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números."}
                    </div>
                  </div>
                  <div className="col-12 d-grid justify-content-md-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      value="enviar"
                    >
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </section>

            <section className="card mb-3">
              <div className="card-header">Crear Rol</div>
              <div className="card-body">
                <form className="row g-3" onSubmit={enviarRol}>
                  <div className="col-md-12">
                    <label htmlFor="rol" className="form-label">
                      Nombre
                    </label>
                    <input
                      className={`form-control ${
                        errores.nombreRol ? "is-invalid" : ""
                      } ${validClasses.nombreRol || ""}`}
                      type="text"
                      id="rol"
                      placeholder=""
                      name="nombreRol"
                      value={values.nombreRol}
                      onChange={capturarRol}
                      autoComplete="off"
                    />
                    <div className="invalid-feedback">
                      {errores.nombreRol &&
                        "Por favor, ingrese un nombre válido."}
                    </div>
                  </div>

                  <div className="col-12 d-grid justify-content-md-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      value="enviar"
                    >
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>

          <section className="col">
            <div className="accordion" id="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Usuarios
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordion"
                >
                  <div className="accordion-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr className="table-dark">
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Usuarios.map((Usuario) => (
                            <tr key={Usuario.Id_Admin}>
                              <th scope="row">{Usuario.Id_Admin}</th>
                              <td>{Usuario.Nombre_Admin}</td>
                              <td>{Usuario.Correo_Admin}</td>
                              <td>{Usuario.Rol_Admin}</td>
                              <td>
                                <div className="btn-group w-100">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                      eliminarUsuario(Usuario.Id_Admin)
                                    }
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Tooltip on top"
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Roles
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr className="table-dark">
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            {/* <th scope="col">Opciones</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {Roles.map((roles) => (
                            <tr key={roles.ID_ROL}>
                              <th scope="row">{roles.ID_ROL}</th>
                              <td>{roles.NOMBRE_ROL}</td>
                              {/* <td>
                                <div className="btn-group w-100">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => eliminarRol(roles.ID_ROL)}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Tooltip on top"
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </div>
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Admin;
