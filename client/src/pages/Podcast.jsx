import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navbar";
import Footer from "../components/Footer";

const Podcast = () => {
  const [Imagenes, setImagenes] = useState([]);

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

  return (
    <>
      <Navigation />
      <section className="knowledge">
        <div className="container container-landing">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {Imagenes.map((Imagen, index) => (
                <div
                  className={`carousel-item ${Imagen.id === 1 ? "active" : ""}`}
                  key={Imagen.id}
                >
                  <img src={Imagen.ruta} className="d-block w-100" alt="..." />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="row pt-4">
            <div className="col-sm-12 mb-3 mb-sm-4">
              <div className="card">
                <div className="card-body">
                  <iframe
                    width="100%"
                    height="450"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1225428679&color=%235c5c58&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Podcast;
