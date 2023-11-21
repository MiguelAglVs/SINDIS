import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const Eps = () => {
  const [nombre, setNombre] = useState("");
  const [editNombre, setEditNombre] = useState("");
  const [epsData, setEpsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editEpsId, setEditEpsId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => setShowAddModal(false) || setShowEditModal(false);

  const handleAdd = () => setShowAddModal(true);

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
      fetchEpsData();
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
    setShowEditModal(true);
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
        handleClose();
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
      <h2 className="h5">Dashboard</h2>
      <div className="container-sm">
        <div className="table-responsive">
          <div className="col-md-2 pb-3 ms-1">
            <label htmlFor="itemsPerPage" className="form-label">
              Eps por página:
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
                    <div className="btn-group d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(eps.id)}
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
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleAdd}>
              Agregar EPS
            </Button>
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
        </div>
        <Modal show={showAddModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Agregar EPS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {currentItems.map((eps) => (
        <Modal key={eps.id} show={showEditModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ))}
    </>
  );
};

export default Eps;
