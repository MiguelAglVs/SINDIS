import React, { useEffect, useState } from "react";
import { uploadFile } from "../../firebase/config";
import { Modal, Button, Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const Content = () => {
  const [file, setFile] = useState(null);
  const [Imagenes, setImagenes] = useState([]);
  const [loadingImages, setLoadingImages] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  const token = Cookies.get("token");
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  let id = tokenData.id;

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Imagenes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      Swal.fire({
        title: "Subiendo imagen",
        html: "Por favor, espera...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        setLoadingImages((prevLoadingImages) => [...prevLoadingImages, true]);
        const uploadedFileUrl = await uploadFile(file);

        const response = await axios.post("http://localhost:3000/api/image", {
          ruta: uploadedFileUrl,
          usuario: id,
        });

        Swal.fire({
          icon: "success",
          title: "Imagen subida correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setFile(null);
        obtenerImagenes();
        handleClose();
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error al subir la imagen",
        });
      } finally {
        setLoadingImages((prevLoadingImages) => prevLoadingImages.slice(0, -1));
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No se ha seleccionado un archivo.",
      });
    }
  };

  const obtenerImagenes = async () => {
    try {
      setLoadingPage(true);
      const response = await axios.get("http://localhost:3000/api/image");
      setImagenes(response.data);
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    obtenerImagenes();
  }, []);

  const eliminarImagen = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la imagen de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/api/image/${id}`
          );
          obtenerImagenes();
        } catch (error) {
          console.error("Error al eliminar la imagen:", error);
        }
      }
    });
  };

  return (
    <>
      <h2 className="h5">Contenido</h2>
      <div className="container-sm pt-3">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-12">
          <section className="col">
            <div className="table-responsive">
              {loadingPage && (
                <div className="d-flex justify-content-center mt-3">
                  <Spinner animation="border" />
                </div>
              )}
              <div className="col-md-2 pb-3 ms-1">
                <label htmlFor="itemsPerPage" className="form-label">
                  Imagenes por página:
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
                    <th scope="col">Id</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((Imagen, index) => (
                    <tr key={Imagen.id}>
                      <th scope="row">{Imagen.id}</th>
                      <td>
                        {loadingImages[index] ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <img src={Imagen.ruta} alt="" height={50} />
                        )}
                      </td>
                      <td>{Imagen.nombre}</td>
                      <td>
                        <div className="btn-group w-100">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => eliminarImagen(Imagen.id)}
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
                <button className="btn btn-primary" onClick={handleShow}>
                  Agregar Imagen
                </button>
                <ul className="pagination">
                  {Array.from({
                    length: Math.ceil(Imagenes.length / itemsPerPage),
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
          </section>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Subir imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label htmlFor="name" className="form-label">
                Imagen
              </label>
              <input
                className="form-control"
                type="file"
                id="name"
                placeholder=""
                name="Nombre"
                autoComplete="off"
                onChange={handleFileChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Subir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Content;
