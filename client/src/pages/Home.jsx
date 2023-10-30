import React, { Component } from "react";

import Navigation from "../components/Navbar";
import Header from "../components/Header";

import Footer from "../components/Footer";

import view from "/assets/img/view.webp";
import goal from "/assets/img/goal.webp";
import face from "/assets/img/face4.webp";
import face2 from "/assets/img/face2.webp";
import leftarrow from "/assets/img/leftarrow.svg";
import rightarrow from "/assets/img/rightarrow.svg";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      testimonies: [
        {
          id: 1,
          name: "Nicolas Sepulveda",
          course: "Coordinador SINDIS",
          imgSrc: face,
        },
        {
          id: 2,
          name: "Luz Mery León",
          course: "Psicóloga SINDIS",
          imgSrc: face2,
        },
      ],
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.handleNextClick, 5000); // Cambia 3000 a la cantidad de milisegundos que desees
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleNextClick = () => {
    this.setState((prevState) => ({
      currentIndex:
        (prevState.currentIndex + 1) % this.state.testimonies.length,
    }));
  };

  handleBeforeClick = () => {
    this.setState((prevState) => ({
      currentIndex:
        (prevState.currentIndex - 1 + this.state.testimonies.length) %
        this.state.testimonies.length,
    }));
  };

  render() {
    const { currentIndex, testimonies } = this.state;
    const currentTestimony = testimonies[currentIndex];

    return (
      <>
        <Navigation />
        <Header />
        <section className="container-sm py-5">
          <div className="knowledge__container container-sm">
            <div className="knowledge__texts">
              <h2 className="subtitle">¡Inscríbete al Semillero!</h2>
              <p className="knowledge__paragraph">
                Si deseas unirte a esta invaluable experiencia, te invitamos a
                inscribirte en nuestro programa. Para ello, simplemente debes
                cumplir con los siguientes requisitos:
              </p>
              <ul>
                <li>
                  Tener un diagnóstico médico que constate la discapacidad, ya
                  sea cognitiva, física, sensorial, auditiva o visual.
                </li>
                <li>Proporcionar una copia de tu documento de identidad.</li>
                <li>Contar con afiliación a una EPS.</li>
                <li>
                  La edad de los participantes debe estar comprendida entre 4
                  meses y 10 años.
                </li>
                <li>Mantener un estado de salud estable.</li>
                <li>
                  Ser hermano o hijo de una persona vinculada con la Institución
                  en calidad de estudiante, docente, administrativo o graduado.
                  En este caso, se deberá presentar el carné correspondiente.
                </li>
              </ul>
              <p className="knowledge__paragraph">
                Nos enorgullece ofrecer un espacio de acompañamiento familiar y
                de crecimiento para todos los inscritos. Juntos, trabajaremos en
                el empoderamiento y la inclusión de las personas con
                discapacidad. ¡Esperamos contar contigo en nuestro semillero!
              </p>

              <Link to="/Inscription"
                className="btn btn-about"
              >
                Únete a SINDIS
              </Link>
            </div>

            <figure className="knowledge__picture">
              {/* <img src={...} className="knowledge__img" alt="Imagen de un MacBook" /> */}
            </figure>
          </div>
        </section>
        <section className="knowledge about py-5">
          <div className="container-sm">
            <h2 className="subtitle">Sobre nosotros</h2>
            <p className="about__paragraph">
              Nos enfocamos en mejorar la calidad de vida de personas con
              discapacidad y sus familias a través de investigaciones y
              estrategias interdisciplinarias. Nuestro objetivo es liderar en
              proyección social y atención integral, enfocados en el desarrollo
              biopsicosocial y capacidades motrices.
            </p>

            <div className="about__main">
              <article className="container-landing text-center py-1">
                <img
                  src={goal}
                  className="about__icon py-4"
                  alt="Ícono de misión"
                />
                <h3 className="about__title">MISIÓN</h3>
                <p className="about__paragrah">
                  Generar procesos académicos de intervención e investigación
                  mediante estrategias de apoyo interdisciplinario dirigidas a
                  las familias (Padres, cuidadores y/o acompañantes) y a los
                  niños, niñas y jóvenes con discapacidad buscando el desarrollo
                  biopsicosocial de todos los participantes.
                </p>
              </article>

              <article className="container-landing text-center py-1">
                <img
                  src={view}
                  className="about__icon py-4"
                  alt="Ícono de visión"
                />
                <h3 className="about__title">VISIÓN</h3>
                <p className="about__paragrah">
                  Para el 2025, aspiramos a ser una unidad académica reconocida
                  por su proyección social, pedagógica e investigativa,
                  especializada en la atención integral de personas con
                  discapacidad y sus familias. Esto se logrará a través de un
                  enfoque interdisciplinario, centrado en la familia y basado en
                  capacidades motrices.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section className="container-sm p-5">
          <h2 className="subtitle text-center">Lo que hacemos</h2>
          <p className="paragraph">
            En el Semillero de Investigación en Discapacidad, nos dedicamos a
            crear un impacto positivo en la comunidad a través de la
            investigación y la acción. Trabajamos incansablemente para entender
            las necesidades de las personas con discapacidad y sus familias, y
            desarrollamos estrategias efectivas para superar las barreras que
            enfrentan en su aprendizaje y desarrollo. Nuestro enfoque integral y
            colaborativo nos permite marcar la diferencia en la vida de quienes
            servimos.
          </p>
          <p className="paragraph">
            Nuestra labor se enfoca en atender y apoyar a 82 familias de
            personas con discapacidad a través de un modelo de atención centrado
            en la familia, lo que nos permite comprender y abordar las
            necesidades de cada individuo de manera integral.
          </p>
          <h2 className="subtitle fz-3">Nuestro Objetivo General</h2>
          <p className="paragraph">
            Promover espacios de intervención e investigación que giren en torno
            a la diversidad y a las barreras para el aprendizaje. Lo hacemos
            mediante actividades prácticas que estimulan la reflexión y la
            sistematización de los procesos pedagógicos. Buscamos cualificar la
            formación integral de los profesionales que forman parte de nuestro
            semillero de investigación SINDIS en el Politécnico Colombiano Jaime
            Isaza Cadavid.
          </p>
          <h2 className="subtitle fz-3">Nuestros Objetivos Específicos</h2>
          <ol>
            <li>
              Caracterizar a los estudiantes de práctica, voluntarios y usuarios
              que participan en el Semillero de Investigación en Discapacidad de
              forma semestral. Cada persona que se une a nuestro semillero
              aporta su valiosa perspectiva y experiencia.
            </li>
            <li>
              Asesorar las propuestas de intervención de los estudiantes de
              práctica que están dirigidas a nuestros usuarios, así como a los
              padres y acudientes del Semillero de Investigación en
              Discapacidad. Buscamos encontrar soluciones efectivas y centradas
              en las necesidades de cada familia.
            </li>
            <li>
              Evaluar continuamente el proceso que llevamos a cabo
              semestralmente con nuestros usuarios, padres y acudientes. Esta
              evaluación constante nos permite aprender y adaptarnos para
              abordar nuevos desafíos y seguir avanzando hacia un futuro más
              inclusivo.
            </li>
          </ol>

          <p className="paragraph">
            En el Semillero de Investigación en Discapacidad, creemos en la
            importancia de la diversidad y la inclusión. Si eres un estudiante
            que busca aprender, crecer y contribuir a la construcción de un
            mundo más accesible y equitativo, ¡te invitamos a unirte a nuestro
            semillero! Juntos, podemos marcar la diferencia.
          </p>
          <h2 className="subtitle text-center pt-5">
            ¡Escucha Voces que Cuidan!
          </h2>
          <p className="paragraph">
            No te pierdas nuestro apasionante podcast, Voces que Cuidan. En
            este espacio, exploramos historias inspiradoras, compartimos
            consejos prácticos y sostemos conversaciones enriquecedoras sobre
            discapacidad e inclusión. A través de las voces de expertos y
            personas que viven experiencias únicas, descubrirás perspectivas
            valiosas y nuevas formas de apoyar a quienes más lo necesitan. Únete
            a nosotros en esta emocionante aventura de aprendizaje y
            construcción de un mundo más inclusivo.
          </p>
          <Link to="/Podcast" className="btn btn-about">Voces que Cuidan</Link>
        </section>
        <section className="testimony p-5">
          <div className="testimony__container container-sm">
            <img
              src={leftarrow}
              className="testimony__arrow"
              id="before"
              onClick={this.handleBeforeClick}
              alt="Flecha izquierda"
            />

            <section
              className={`testimony__body ${
                currentIndex === currentTestimony.id - 1
                  ? "testimony__body--show"
                  : ""
              }`}
              data-id={currentTestimony.id}
            >
              <div className="testimony__texts">
                <h2 className="subtitle">
                  {currentTestimony.name},{" "}
                  <span className="testimony__course">
                    {currentTestimony.course}
                  </span>
                </h2>
                <p className="testimony__review">{currentTestimony.review}</p>
              </div>

              <figure className="testimony__picture">
                <img
                  src={currentTestimony.imgSrc}
                  className="testimony__img"
                  alt="Testimonio"
                />
              </figure>
            </section>
            <img
              src={rightarrow}
              className="testimony__arrow"
              id="next"
              onClick={this.handleNextClick}
              alt="Flecha derecha"
            />
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Home;
