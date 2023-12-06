import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal, Button } from "react-bootstrap";
import { differenceInYears } from "date-fns";

const Inscripcion = () => {
  const token = Cookies.get("token");
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  let perfil = tokenData.perfil;

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => setShowAddModal(false) || setShowEditModal(false);

  const handleAdd = () => setShowAddModal(true);

  const valorInicial = {
    Cedula: "",
    Nombre: "",
    PApellido: "",
    SApellido: "",
    Fecha: "",
    Eps: "",
    Diagnostico: "",
    Discapacidad: "",
  };

  const [values, setValues] = useState(valorInicial);
  const [Inscritos, setInscritos] = useState([]);

  const [selectedEps, setselectedEps] = useState("");
  const [selectedDiagnostico, setselectedDiagnostico] = useState("");
  const [selectedDiscapacidad, setselectedDiscapacidad] = useState("");

  const [editEpsSlected, setEditEpsSlected] = useState("");
  const [editDiagnosticoSlected, setEditDiagnosticoSlected] = useState("");
  const [editDiscapacidadSlected, setEditDiscapacidadSlected] = useState("");

  const [Eps, setEps] = useState([]);
  const [Diagnosticos, setDiagnosticos] = useState([]);
  const [Discapacidades, setDiscapacidades] = useState([]);

  const [errores, setErrores] = useState({});
  const [validClasses, setValidClasses] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Inscritos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetUsuario = () => {
    setValues(valorInicial);
    setselectedEps("0");
    setselectedDiagnostico("0");
    setselectedDiscapacidad("0");
    setValidClasses({});
  };

  useEffect(() => {
    fetchInscritos();
  }, []);

  const fetchInscritos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Inscritos");
      setInscritos(response.data);
    } catch (error) {
      console.error("Error al obtener datos de Inscritos:", error);
    }
  };

  useEffect(() => {
    const obtenereps = async () => {
      const response = await axios.get("http://localhost:3000/api/eps");
      setEps(response.data);
    };
    obtenereps();
  }, [Eps]);

  useEffect(() => {
    const obtenerDiagnosticos = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/Diagnosticos"
      );
      setDiagnosticos(response.data);
    };
    obtenerDiagnosticos();
  }, [Diagnosticos]);

  useEffect(() => {
    const obtenerDiscapacidades = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/Discapacidades"
      );
      setDiscapacidades(response.data);
    };
    obtenerDiscapacidades();
  }, [Discapacidades]);

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
    const fechaRegex = /\S/;
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

    if (name === "Fecha") {
      if (!fechaRegex.test(value)) {
        nuevosErrores.Fecha = true;
      } else {
        delete nuevosErrores.Fecha;
        setValidClasses({ ...validClasses, Fecha: "is-valid" });
      }
    }

    setErrores(nuevosErrores);
  };

  const enviarInscripcion = async (e) => {
    e.preventDefault();

    // Obtén la fecha de nacimiento del formulario
    const fechaNacimiento = new Date(values.Fecha);

    // Calcula la edad en meses
    const hoy = new Date();
    const edadEnMeses =
      (hoy.getFullYear() - fechaNacimiento.getFullYear()) * 12 +
      hoy.getMonth() -
      fechaNacimiento.getMonth();

    // Verifica que la edad esté entre 4 meses y 10 años
    if (edadEnMeses >= 4 && edadEnMeses <= 10) {
      const newInscrp = {
        cedula: values.Cedula,
        nombre: values.Nombre,
        apellido: values.PApellido,
        segundo_apellido: values.SApellido,
        fecha_nacimiento: values.Fecha,
        discapacidad: selectedDiscapacidad,
        diagnostico: selectedDiagnostico,
        eps: selectedEps,
        usuario: tokenData.id,
      };

      console.log(newInscrp);

      try {
        await axios.post("http://localhost:3000/api/Inscritos", newInscrp);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Usuario creado con éxito",
        }).then((result) => {
          if (result.isConfirmed) {
            resetUsuario();
            fetchInscritos();
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
    } else {
      // Muestra un mensaje si la edad no está en el rango deseado
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La edad debe estar entre 4 meses y 10 años.",
      });
    }
  };

  // Editar usuario
  const [editUserId, setEditUserId] = useState(null);

  const [editFormValues, setEditFormValues] = useState({});

  const handleEdit = (dni) => {
    setEditUserId(dni);
    setShowEditModal(true);
    const user = Inscritos.find((user) => user.dni === dni);
    setEditFormValues({
      editNombre: user.nombre,
      editPapeliido: user.Papellido,
      editSapellido: user.Sapellido,
      editFecha: user.Fecha,
      eps: user.eps,
      diagnostico: user.diagnostico,
      discapacidad: user.discapacidad,
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
      fecha_nacimiento: editFormValues.editFecha,
      eps: editEpsSlected,
      diagnostico: editDiagnosticoSlected,
      discapacidad: editDiscapacidadSlected,
    };
    console.log(updatedUser);
    try {
      await axios.put(`http://localhost:3000/api/Inscritos/${id}`, updatedUser);
      await Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado con éxito",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchInscritos();
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
        await axios.delete(`http://localhost:3000/api/Inscritos/${id}`);
        await Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
        fetchInscritos();
      } catch (error) {
        await Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      }
    }
  };

  function calcularEdad(fechaNacimiento) {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  }

  return (
    <>
      <h2 className="h5">Inscripción</h2>
      <div className="container-sm pt-3">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-12">
          {perfil !== 1 ? (
            <section className="col">
              <div className="table-responsive">
                <div className="col-md-2 pb-3 ms-1">
                  <label htmlFor="itemsPerPage" className="form-label">
                    Items por página:
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
                      <th scope="col">Edad</th>
                      <th scope="col">Eps</th>
                      <th scope="col">Diagnostico</th>
                      <th scope="col">Discapacidad</th>
                      <th scope="col">Acudiente</th>
                      <th scope="col">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((Inscritos) => (
                      <tr key={Inscritos.dni}>
                        <th scope="row">{Inscritos.dni}</th>
                        <td>
                          {Inscritos.nombre} {Inscritos.p_apellido}{" "}
                          {Inscritos.s_apellido}
                        </td>
                        <td>
                          {differenceInYears(
                            new Date(),
                            new Date(Inscritos.nacimiento)
                          )}
                        </td>
                        <td>{Inscritos.eps}</td>
                        <td>{Inscritos.diagnostico}</td>
                        <td>{Inscritos.discapacidad}</td>
                        <td>
                          {Inscritos.nombre_acudiente}{" "}
                          {Inscritos.apellido_acudiente}
                        </td>
                        <td>
                          <div className="btn-group d-flex justify-content-center">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEdit(Inscritos.dni)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarUsuario(Inscritos.dni)}
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
                    Inscribir
                  </button>
                  <ul className="pagination">
                    {Array.from({
                      length: Math.ceil(Inscritos.length / itemsPerPage),
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
                    <Modal.Title>Inscribir</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form
                      className="row g-3"
                      id="formulario"
                      onSubmit={enviarInscripcion}
                    >
                      <div className="col-md-12 form-floating">
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
                          Identificacion<samp style={{ color: "red" }}>*</samp>
                        </label>
                        <div className="invalid-feedback">
                          {errores.Cedula &&
                            "Ingrese un numero de identificacion válido."}
                        </div>
                      </div>
                      <div className="col-md-4 form-floating">
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
                      <div className="col-md-4 form-floating">
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
                      <div className="col-md-4 form-floating">
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
                      <div className="col-md-12 form-floating">
                        <input
                          type="date"
                          className={`form-control ${
                            errores.Fecha ? "is-invalid" : ""
                          } ${validClasses.Fecha || ""}`}
                          id="Fecha"
                          placeholder=""
                          name="Fecha"
                          value={values.Fecha}
                          onChange={capturarUsuario}
                          autoComplete="off"
                        />
                        <label htmlFor="Fecha">
                          Fecha de nacimiento
                          <samp style={{ color: "red" }}>*</samp>
                        </label>
                        <div className="invalid-feedback">
                          {errores.Fecha && "Ingrese una Fecha válida."}
                        </div>
                      </div>
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="Eps"
                          value={selectedEps}
                          onChange={(e) => setselectedEps(e.target.value)}
                        >
                          <option value="0">-- SELECIONE UNA EPS --</option>
                          {Eps.map((eps) => (
                            <option key={eps.id} value={eps.id}>
                              {eps.nombre}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="floatingSelect">
                          Eps<samp style={{ color: "red" }}>*</samp>
                        </label>
                      </div>
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="Diagnostico"
                          value={selectedDiagnostico}
                          onChange={(e) =>
                            setselectedDiagnostico(e.target.value)
                          }
                        >
                          <option value="0">
                            -- SELECIONE UN DAGNOSTICO --
                          </option>
                          {Diagnosticos.map((diagnosticos) => (
                            <option
                              key={diagnosticos.id}
                              value={diagnosticos.id}
                            >
                              {diagnosticos.nombre}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="floatingSelect">
                          Diagnostico<samp style={{ color: "red" }}>*</samp>
                        </label>
                      </div>
                      <div className="form-floating">
                        <select
                          className="form-select"
                          name="Discapacidad"
                          value={selectedDiscapacidad}
                          onChange={(e) =>
                            setselectedDiscapacidad(e.target.value)
                          }
                        >
                          <option value="0">
                            -- SELECIONE UN DISCAPACIDAD --
                          </option>
                          {Discapacidades.map((discapacidades) => (
                            <option
                              key={discapacidades.id}
                              value={discapacidades.id}
                            >
                              {discapacidades.nombre}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="floatingSelect">
                          Discapacidad<samp style={{ color: "red" }}>*</samp>
                        </label>
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={enviarInscripcion}>
                      enviar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </section>
          ) : (
            <div className="card p-3">
              <form
                className="row g-3"
                id="formulario"
                onSubmit={enviarInscripcion}
              >
                <div className="col-md-12 form-floating">
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
                    Identificacion<samp style={{ color: "red" }}>*</samp>
                  </label>
                  <div className="invalid-feedback">
                    {errores.Cedula &&
                      "Ingrese un numero de identificacion válido."}
                  </div>
                </div>
                <div className="col-md-4 form-floating">
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
                <div className="col-md-4 form-floating">
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
                <div className="col-md-4 form-floating">
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
                <div className="col-md-12 form-floating">
                  <input
                    type="date"
                    className={`form-control ${
                      errores.Fecha ? "is-invalid" : ""
                    } ${validClasses.Fecha || ""}`}
                    id="Fecha"
                    placeholder=""
                    name="Fecha"
                    value={values.Fecha}
                    onChange={capturarUsuario}
                    autoComplete="off"
                  />
                  <label htmlFor="Fecha">
                    Fecha de nacimiento
                    <samp style={{ color: "red" }}>*</samp>
                  </label>
                  <div className="invalid-feedback">
                    {errores.Fecha && "Ingrese una Fecha válida."}
                  </div>
                </div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="Eps"
                    value={selectedEps}
                    onChange={(e) => setselectedEps(e.target.value)}
                  >
                    <option value="0">-- SELECIONE UNA EPS --</option>
                    {Eps.map((eps) => (
                      <option key={eps.id} value={eps.id}>
                        {eps.nombre}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">
                    Eps<samp style={{ color: "red" }}>*</samp>
                  </label>
                </div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="Diagnostico"
                    value={selectedDiagnostico}
                    onChange={(e) => setselectedDiagnostico(e.target.value)}
                  >
                    <option value="0">-- SELECIONE UN DAGNOSTICO --</option>
                    {Diagnosticos.map((diagnosticos) => (
                      <option key={diagnosticos.id} value={diagnosticos.id}>
                        {diagnosticos.nombre}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">
                    Diagnostico<samp style={{ color: "red" }}>*</samp>
                  </label>
                </div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="Discapacidad"
                    value={selectedDiscapacidad}
                    onChange={(e) => setselectedDiscapacidad(e.target.value)}
                  >
                    <option value="0">-- SELECIONE UN DISCAPACIDAD --</option>
                    {Discapacidades.map((discapacidades) => (
                      <option key={discapacidades.id} value={discapacidades.id}>
                        {discapacidades.nombre}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">
                    Discapacidad<samp style={{ color: "red" }}>*</samp>
                  </label>
                </div>
              </form>
              <button className="btn btn-primary mt-3" onClick={enviarInscripcion}>Enviar</button>
            </div>
          )}
        </div>
      </div>

      {Inscritos.map((Inscritos) => (
        <Modal
          key={Inscritos.dni}
          show={showEditModal && editUserId === Inscritos.dni}
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Editando a {Inscritos.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="alert alert-info" role="alert">
              <i className="fa-solid fa-circle-info"></i> Deje en blanco los
              campos que no desea editar.
            </div>
            <form
              className="row g-3"
              id="formulario"
              onSubmit={enviarInscripcion}
            >
              <div className="col-md-4 form-floating">
                <input
                  type="text"
                  className={`form-control ${
                    errores.Nombre ? "is-invalid" : ""
                  } ${validClasses.Nombre || ""}`}
                  id={`editNombre${Inscritos.dni}`}
                  placeholder=""
                  name="editNombre"
                  value={editFormValues[`editNombre${Inscritos.dni}`]}
                  onChange={capturarEdit}
                />
                <label htmlFor="Nombre">
                  Nombre<samp style={{ color: "red" }}>*</samp>
                </label>
                <div className="invalid-feedback">
                  {errores.Nombre && "Ingrese un nombre válido."}
                </div>
              </div>
              <div className="col-md-4 form-floating">
                <input
                  className={`form-control ${
                    errores.PApellido ? "is-invalid" : ""
                  } ${validClasses.PApellido || ""}`}
                  type="text"
                  id={`editPapeliido${Inscritos.dni}`}
                  name="editPapeliido"
                  value={editFormValues[`editPapeliido${Inscritos.dni}`]}
                  onChange={capturarEdit}
                />
                <label htmlFor="PApellido">
                  Apellido
                  <samp style={{ color: "red" }}>*</samp>
                </label>
                <div className="invalid-feedback">
                  {errores.SApellido && "Ingrese un apellido válido."}
                </div>
              </div>
              <div className="col-md-4 form-floating">
                <input
                  type="text"
                  className={`form-control ${
                    errores.SApellido ? "is-invalid" : ""
                  } ${validClasses.SApellido || ""}`}
                  id={`editSapellido${Inscritos.dni}`}
                  name="editSapellido"
                  value={editFormValues[`editSapellido${Inscritos.dni}`]}
                  onChange={capturarEdit}
                  autoComplete="off"
                />
                <label htmlFor="SApellido">Segundo pellido</label>
                <div className="invalid-feedback">
                  {errores.SApellido && "Ingrese un apellido válido."}
                </div>
              </div>
              <div className="col-md-12 form-floating">
                <input
                  type="date"
                  className={`form-control ${
                    errores.Fecha ? "is-invalid" : ""
                  } ${validClasses.Fecha || ""}`}
                  id={`editFecha${Inscritos.dni}`}
                  name="editFecha"
                  value={editFormValues[`editFecha${Inscritos.dni}`]}
                  onChange={capturarEdit}
                  autoComplete="off"
                />
                <label htmlFor="Fecha">
                  Fecha de nacimiento
                  <samp style={{ color: "red" }}>*</samp>
                </label>
                <div className="invalid-feedback">
                  {errores.Fecha && "Ingrese una Fecha válida."}
                </div>
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id={`editEps${Inscritos.dni}`}
                  name="editEps"
                  value={editEpsSlected}
                  onChange={(e) => seteditEpsSlected(e.target.value)}
                >
                  <option value="0">-- SELECIONE UNA EPS --</option>
                  {Eps.map((eps) => (
                    <option key={eps.id} value={eps.id}>
                      {eps.nombre}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingSelect">
                  Eps<samp style={{ color: "red" }}>*</samp>
                </label>
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id={`editDiagnostico${Inscritos.dni}`}
                  name="editDiagnostico"
                  value={editDiagnosticoSlected}
                  onChange={(e) => seteditDiagnosticoSlected(e.target.value)}
                >
                  <option value="0">-- SELECIONE UN DAGNOSTICO --</option>
                  {Diagnosticos.map((diagnosticos) => (
                    <option key={diagnosticos.id} value={diagnosticos.id}>
                      {diagnosticos.nombre}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingSelect">
                  Diagnostico<samp style={{ color: "red" }}>*</samp>
                </label>
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id={`editDiscapacidad${Inscritos.dni}`}
                  name="editDiscapacidad"
                  value={editDiscapacidadSlected}
                  onChange={(e) => setEditDiscapacidadSlected(e.target.value)}
                >
                  <option value="0">-- SELECIONE UN DISCAPACIDAD --</option>
                  {Discapacidades.map((discapacidades) => (
                    <option key={discapacidades.id} value={discapacidades.id}>
                      {discapacidades.nombre}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingSelect">
                  Discapacidad<samp style={{ color: "red" }}>*</samp>
                </label>
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

export default Inscripcion;
