import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const Admin = () => {
  const token = Cookies.get("token");
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  let rol = tokenData.rol;

  const valorInicial = {
    Rol: "0",
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
  const [Usuarios, setUsuarios] = useState([]);
  const [Roles, setRoles] = useState([]);
  const [selectedRol, setSelectedRol] = useState("");
  const [editRolSlected, seteditRolSlected] = useState("");
  const [errores, setErrores] = useState({});
  const [validClasses, setValidClasses] = useState({});

  const [editUserId, setEditUserId] = useState(null);

  // Restablece el usuario en el estado
  const resetUsuario = () => {
    setValues(valorInicial);
    setSelectedRol("0");
    setValidClasses({});
  };

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

  const capturarUsuario = (e) => {
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

  const enviarUsuario = async (e) => {
    e.preventDefault();

    if (Object.keys(errores).length === 0) {
      const newAdmin = {
        cedula: values.Cedula,
        nombre: values.Nombre,
        apellido: values.PApellido,
        segundo_apellido: values.SApellido,
        direccion: values.Direccion,
        telefono: values.Telefono,
        correo: values.Correo,
        contrasena: values.Pass,
        rol: selectedRol,
      };
      console.log(newAdmin);

      try {
        await axios.post("http://localhost:3000/api/admin", newAdmin);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Cuenta creada con éxito",
        }).then((result) => {
          if (result.isConfirmed) {
            resetUsuario();
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

  // Editar usuario
  const [editFormValues, setEditFormValues] = useState({});

  const capturarEdit = (e) => {
    const { name, value } = e.target;
    setEditFormValues({ ...editFormValues, [name]: value });
  };

  const actualizarUsuario = async (e, id) => {
    e.preventDefault();

    const updatedUser = {
      nombre: editFormValues.editNombre,
      apellido: editFormValues.editPapeliido,
      segundo_apellido: editFormValues.editSapellido,
      direccion: editFormValues.editdireccion,
      telefono: editFormValues.edittelefono,
      correo: editFormValues.editCorreo,
      contrasena: editFormValues.editContrasena,
      rol: editRolSlected,
    };
    console.log(updatedUser);
    try {
      await axios.put(`http://localhost:3000/api/admin/${id}`, updatedUser);
      await Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado con éxito",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar el usuario.",
      });
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    const confirmation = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/${id}`);
        await Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
      } catch (error) {
        await Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      }
    }
  };

  return (
    <>
      <h2 className="h5">Usuarios</h2>
      <div className="container-sm pt-3">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-12">
          <div className="col">
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
                      Lista de usuarios
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
                              <th scope="col">dni</th>
                              <th scope="col">Nombre</th>
                              <th scope="col">Direccion</th>
                              <th scope="col">Telefono</th>
                              <th scope="col">Correo</th>
                              <th scope="col">Rol</th>
                              <th scope="col">Opciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Usuarios.map((Usuario) => (
                              <tr key={Usuario.dni}>
                                <th scope="row">{Usuario.dni}</th>
                                <td>
                                  {Usuario.nombre} {Usuario.Papellido}{" "}
                                  {Usuario.Sapellido}
                                </td>
                                <td>{Usuario.direccion}</td>
                                <td>{Usuario.telefono}</td>
                                <td>{Usuario.correo}</td>
                                <td>{Usuario.rol}</td>
                                <td>
                                  <div className="btn-group w-100">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#Modal${Usuario.dni}`}
                                      onClick={() => setEditUserId(Usuario.dni)}
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() =>
                                        eliminarUsuario(Usuario.dni)
                                      }
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
              </div>
            </section>
            <section className="card mt-3">
              <div className="card-header">Crear Usuario</div>
              <div className="card-body">
                <form
                  className="row g-3"
                  id="formulario"
                  onSubmit={enviarUsuario}
                >
                  <div className="form-floating">
                    <select
                      className="form-select"
                      name="rol"
                      value={selectedRol}
                      onChange={(e) => setSelectedRol(e.target.value)}
                    >
                      <option value="0">-- SELECIONE UN ROL --</option>
                      {Roles.map((roles) => (
                        <option key={roles.id} value={roles.id}>
                          {roles.nombre}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="floatingSelect">Rol</label>
                  </div>
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
                      onChange={capturarUsuario}
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
                      onChange={capturarUsuario}
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
                      onChange={capturarUsuario}
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
                      onChange={capturarUsuario}
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
                      onChange={capturarUsuario}
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
                      onChange={capturarUsuario}
                      autoComplete="off"
                    />
                    <label htmlFor="Telefono">
                      Telefono<samp style={{ color: "red" }}>*</samp>
                    </label>
                    <div className="invalid-feedback">
                      {errores.Telefono &&
                        "Ingrese un numero de telefono válido."}
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
                      onChange={capturarUsuario}
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
                      className={`form-control ${
                        errores.Pass ? "is-invalid" : ""
                      } ${validClasses.Pass || ""}`}
                      id="Pass"
                      placeholder=""
                      name="Pass"
                      value={values.Pass}
                      onChange={capturarUsuario}
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
                      className={`form-control ${
                        errores.CPass ? "is-invalid" : ""
                      } ${validClasses.CPass || ""}`}
                      id="CPass"
                      placeholder=""
                      name="CPass"
                      value={values.CPass}
                      onChange={capturarUsuario}
                      autoComplete="off"
                    />
                    <label htmlFor="CPass">
                      Confirmar contraseña
                      <samp style={{ color: "red" }}>*</samp>
                    </label>
                    <div className="invalid-feedback">
                      {errores.CPass && "Las contraseñas no coinciden."}
                    </div>
                  </div>
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <input
                      type="submit"
                      className="btn btn-about"
                      value="enviar"
                      disabled={rol === 1}
                    />
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>

      {Usuarios.map((Usuario) => (
        <div
          key={Usuario.dni}
          className="modal fade"
          id={`Modal${Usuario.dni}`}
          aria-labelledby={"ModalLabel" + Usuario.dni}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id={"ModalLabel" + Usuario.dni}
                >
                  Editar a {Usuario.nombre}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning" role="alert">
                  <i className="fa-solid fa-circle-info px-2"></i>
                  Ingrese solo los datos que desea editar.
                </div>
                <form
                  className="row g-3"
                  onSubmit={(e) => actualizarUsuario(e, Usuario.dni)}
                >
                  <div className="col-md-12">
                    <label
                      htmlFor={`editRol${Usuario.dni}`}
                      className="form-label"
                    >
                      Rol
                    </label>
                    <select
                      className="form-select"
                      id={`editRol${Usuario.dni}`}
                      name="editRol"
                      value={editRolSlected}
                      onChange={(e) => seteditRolSlected(e.target.value)}
                    >
                      <option value="0">-- SELECCIONE UN ROL --</option>
                      {Roles.map((roles) => (
                        <option key={roles.id} value={roles.id}>
                          {roles.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor={`editNombre${Usuario.dni}`}
                      className="form-label"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`editNombre${Usuario.dni}`}
                      name="editNombre"
                      value={editFormValues[`editNombre${Usuario.dni}`]}
                      onChange={capturarEdit}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor={`editNombre${Usuario.dni}`}
                      className="form-label"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`editPapeliido${Usuario.dni}`}
                      name="editPapeliido"
                      value={editFormValues[`editPapeliido${Usuario.dni}`]}
                      onChange={capturarEdit}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor={`editNombre${Usuario.dni}`}
                      className="form-label"
                    >
                      Segundo Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`editSapellido${Usuario.dni}`}
                      name="editSapellido"
                      value={editFormValues[`editSapellido${Usuario.dni}`]}
                      onChange={capturarEdit}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor={`editNombre${Usuario.dni}`}
                      className="form-label"
                    >
                      Direccion
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`editdireccion${Usuario.dni}`}
                      name="editdireccion"
                      value={editFormValues[`editdireccion${Usuario.dni}`]}
                      onChange={capturarEdit}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor={`editNombre${Usuario.dni}`}
                      className="form-label"
                    >
                      Telefono
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`edittelefono${Usuario.dni}`}
                      name="edittelefono"
                      value={editFormValues[`edittelefono${Usuario.dni}`]}
                      onChange={capturarEdit}
                    />
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor={`editCorreo${Usuario.dni}`}
                      className="form-label"
                    >
                      Correo
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id={`editCorreo${Usuario.dni}`}
                      name="editCorreo"
                      value={editFormValues[`editCorreo${Usuario.dni}`]}
                      onChange={capturarEdit}
                    />
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor={`editContrasena${Usuario.dni}`}
                      className="form-label"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id={`editContrasena${Usuario.dni}`}
                      name="editContrasena"
                      value={editFormValues[`editContrasena${Usuario.dni}`]}
                      onChange={capturarEdit}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    value="enviar"
                  >
                    Guardar cambios
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Admin;
