import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Discapacidad = () => {
  const [nombre, setNombre] = useState("");
  const [editNombre, setEditNombre] = useState("");
  const [epsData, setEpsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editEpsId, setEditEpsId] = useState(null);

  useEffect(() => {
    fetchEpsData();
  }, []);

  const fetchEpsData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/eps");
      setEpsData(response.data);
    } catch (error) {
      console.error("Error al obtener datos de EPS:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/eps", {
        nombre,
      });
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "El formulario se ha enviado correctamente.",
      });
      setNombre("");
      fetchEpsData(); // Actualiza los datos después de agregar un nuevo EPS
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.",
      });
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleDelete = async (epsId) => {
    try {
      await axios.delete(`http://localhost:3000/api/eps/${epsId}`);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "La EPS se ha eliminado correctamente.",
      });
      fetchEpsData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al eliminar la EPS. Por favor, inténtalo de nuevo.",
      });
      console.error("Error al eliminar la EPS:", error);
    }
  };

  const handleEdit = (epsId) => {
    setEditEpsId(epsId);
    const eps = epsData.find((eps) => eps.id === epsId);
    setEditNombre(eps.nombre);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editEpsId) {
        await axios.put(`http://localhost:3000/api/eps/${editEpsId}`, {
          nombre: editNombre,
        });
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "La EPS se ha actualizado correctamente.",
        });
        setEditEpsId(null);
        setEditNombre("");
        fetchEpsData();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.",
      });
      console.error("Error al enviar el formulario:", error);
    }
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = epsData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="accordion" id="accordionEps">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEps"
              aria-expanded="true"
              aria-controls="collapseEps"
            >
              Eps
            </button>
          </h2>
          <div
            id="collapseEps"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionEps"
          >
            <div className="accordion-body">
              <div className="">
                <div className="table-responsive overflow-x-hidden">
                  <table className="table table-bordered table-hover mt-3">
                    <thead className="table-dark">
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((eps) => (
                        <tr key={eps.id}>
                          <td>{eps.id}</td>
                          <td>{eps.nombre}</td>
                          <td>
                            <div className="btn-group me-2">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={`#EditarEps${eps.id}`}
                                onClick={() => handleEdit(eps.id)} // Asigna handleEdit al evento onClick
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(eps.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="pagination justify-content-end">
                    {Array.from({
                      length: Math.ceil(epsData.length / itemsPerPage),
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
                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#EpsModal"
                >
                  Agregar EPS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="EpsModal"
        aria-labelledby="EpsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EpsModalLabel">
                Agregar EPS
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Agregar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {currentItems.map((eps) => (
        <div
          className="modal fade"
          id={`EditarEps${eps.id}`}
          aria-labelledby="EditarEpsLabel"
          aria-hidden="true"
          key={eps.id}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="EditarEpsLabel">
                  Editar EPS
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Editar
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

export default Discapacidad;
