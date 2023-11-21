import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal, Button } from "react-bootstrap";

const Admin = () => {
  const token = Cookies.get("token");
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  let perfil = tokenData.perfil;

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => setShowAddModal(false) || setShowEditModal(false);

  const handleAdd = () => setShowAddModal(true);

  const valorInicial = {
    perfil: "0",
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
  const [Perfiles, setPerfiles] = useState([]);
  const [selectedPerfil, setselectedPerfil] = useState("");
  const [editPerfilSlected, seteditPerfilSlected] = useState("");
  const [errores, setErrores] = useState({});
  const [validClasses, setValidClasses] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Usuarios.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetUsuario = () => {
    setValues(valorInicial);
    setselectedPerfil("0");
    seteditPerfilSlected("0");
    setValidClasses({});
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener datos de Usuarios:", error);
    }
  };

  useEffect(() => {
    const obtenerRoles = async () => {
      const response = await axios.get("http://localhost:3000/api/roles");
      setPerfiles(response.data);
    };
    obtenerRoles();
  }, [Perfiles]);

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
        perfil: selectedPerfil,
      };
      try {
        await axios.post("http://localhost:3000/api/admin", newAdmin);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Usuario creado con éxito",
        }).then((result) => {
          if (result.isConfirmed) {
            resetUsuario();
            fetchUsuarios();
            handleClose();
          }
        });
      } catch (error) {
        console.error("Error en la solicitud POST:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al crear el usuario.",
        });
      }
    }
  };

  // Editar usuario
  const [editUserId, setEditUserId] = useState(null);

  const [editFormValues, setEditFormValues] = useState({});

  const handleEdit = (dni) => {
    setEditUserId(dni);
    setShowEditModal(true);
    const user = Usuarios.find((user) => user.dni === dni);
    setEditFormValues({
      editPerfil: user.perfil,
      editNombre: user.nombre,
      editPapeliido: user.Papellido,
      editSapellido: user.Sapellido,
      editdireccion: user.direccion,
      edittelefono: user.telefono,
      editCorreo: user.correo,
      editContrasena: "",
    });
  };

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
      perfil: editPerfilSlected,
    };
    try {
      await axios.put(`http://localhost:3000/api/admin/${id}`, updatedUser);
      await Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado con éxito",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchUsuarios();
          handleClose();
        }
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
        fetchUsuarios();
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
          <section className="col">
            <div className="table-responsive">
              <div className="col-md-2 pb-3 ms-1">
                <label htmlFor="itemsPerPage" className="form-label">
                  Usuarios por página:
                </label>
                <select
                  className="form-select"
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">dni</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Perfil</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((Usuario) => (
                    <tr key={Usuario.dni}>
                      <th scope="row">{Usuario.dni}</th>
                      <td>
                        {Usuario.nombre} {Usuario.Papellido} {Usuario.Sapellido}
                      </td>
                      <td>{Usuario.direccion}</td>
                      <td>{Usuario.telefono}</td>
                      <td>{Usuario.correo}</td>
                      <td>{Usuario.perfil}</td>
                      <td>
                        <div className="btn-group d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit(Usuario.dni)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => eliminarUsuario(Usuario.dni)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Agregar Usuario
                </button>
                <ul className="pagination">
                  {Array.from({
                    length: Math.ceil(Usuarios.length / itemsPerPage),
                  }).map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <Modal show={showAddModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Agregar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form
                    className="row g-3"
                    id="formulario"
                    onSubmit={enviarUsuario}
                  >
                    <div className="form-floating">
                      <select
                        className="form-select"
                        name="perfil"
                        value={selectedPerfil}
                        onChange={(e) => setselectedPerfil(e.target.value)}
                      >
                        <option value="0">-- SELECIONE UN PERFIL --</option>
                        {Perfiles.map((perfiles) => (
                          <option key={perfiles.id} value={perfiles.id}>
                            {perfiles.nombre}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="floatingSelect">Perfil</label>
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
                        Apellido
                        <samp style={{ color: "red" }}>*</samp>
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
                        Direccion
                        <samp style={{ color: "red" }}>*</samp>
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
                        Telefono
                        <samp style={{ color: "red" }}>*</samp>
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
                        Contraseña
                        <samp style={{ color: "red" }}>*</samp>
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
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    // disabled={perfil === 1}
                    onClick={enviarUsuario}
                  >
                    enviar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </section>
        </div>
      </div>

      {Usuarios.map((Usuario) => (
        <Modal
          key={Usuario.dni}
          show={showEditModal && editUserId === Usuario.dni}
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Editando a {Usuario.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="alert alert-info" role="alert">
              <i className="fa-solid fa-circle-info"></i> Deje en blanco los
              campos que no desea editar.
            </div>
            <form
              className="row g-3"
              onSubmit={(e) => actualizarUsuario(e, Usuario.dni)}
            >
              <div className="col-md-12">
                <label
                  htmlFor={`editPerfil${Usuario.dni}`}
                  className="form-label"
                >
                  Perfil
                </label>
                <select
                  className="form-select"
                  id={`editPerfil${Usuario.dni}`}
                  name="editPerfil"
                  value={editPerfilSlected}
                  onChange={(e) => seteditPerfilSlected(e.target.value)}
                >
                  <option value="0">-- SELECCIONE UN PERFIL --</option>
                  {Perfiles.map((perfile) => (
                    <option key={perfile.id} value={perfile.id}>
                      {perfile.nombre}
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(e) => actualizarUsuario(e, editUserId)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ))}
    </>
  );
};

export default Admin;
