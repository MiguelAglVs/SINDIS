import React, { useEffect, useState } from "react";
import { uploadFile } from "../../firebase/config";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const Content = () => {
  const [file, setFile] = useState(null);
  const [Imagenes, setImagenes] = useState([]);

  const token = Cookies.get("token");
  const tokenData = JSON.parse(atob(token.split(".")[1]));
  let id = tokenData.id;

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

        // Vaciar el input de archivo
        setFile(null);

        obtenerImagenes();
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error al subir la imagen",
        });
      }
    } else {
      console.error("No se ha seleccionado un archivo.");
    }
  };

  const obtenerImagenes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/image");
      setImagenes(response.data);
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
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
            <div className="accordion" id="accordionFlushExample">
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
                            <th scope="col">Id</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Imagenes.map((Imagen) => (
                            <tr key={Imagen.id}>
                              <th scope="row">{Imagen.id}</th>
                              <td>
                                <img src={Imagen.ruta} alt="" height={50} />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="col mt-3">
            <div className="card">
              <div className="card-header">Subir imagen</div>
              <div className="card-body">
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
                  <div className="col-12 d-grid justify-content-md-end">
                    <button
                      type="submit"
                      className="btn btn-about"
                      value="enviar"
                    >
                      Subir
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Content;
