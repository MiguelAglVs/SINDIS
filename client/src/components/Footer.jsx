import React from "react";

import facebook from "/assets/img/facebook.svg";
import twitter from "/assets/img/twitter.svg";
import youtube from "/assets/img/youtube.svg";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    name: "Inicio",
    path: "/Home",
  },
  {
    name: "Pódcast",
    path: "/Podcast",
  },
];

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <section className="footer__container container p-5">
          <nav className="nav nav--footer">
            <h2 className="footer__title">SINDIS</h2>

            <ul className="nav__link nav__link--menu">
              {navLinks.map((link, index) => (
                <li key={index} className="content__item nav__item">
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "link link--leda--footer active"
                        : "link link--leda--footer"
                    }
                    data-text={link.name}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* <form
            className="footer__form"
            action="https://formspree.io/f/mknkkrkj"
            method="POST"
          >
            <h2 className="footer__newsletter">Suscribete a SINDIS</h2>
            <div className="footer__inputs">
              <input
                type="email"
                placeholder="Email:"
                className="footer__input"
                name="_replyto"
              />
              <input
                type="submit"
                value="Registrate"
                className="footer__submit"
              />
            </div>
          </form> */}
        </section>

        <section className="footer__copy container p-2">
          <div className="footer__social">
            <a
              href="https://web.facebook.com/p/Sindis-Semillero-de-atenci%C3%B3n-a-la-discapacidad-100071933754372/?paipv=0&eav=Afb3POqZWeCWENoTQx18O6sJapM6x7JQCjtWhDi_CfAk4vqMXcXSpPZk7MmmSqiawSQ&_rdc=1&_rdrF"
              className="footer__icons"
              target="_blank"
            >
              <img src={facebook} className="footer__img" alt="Facebook" />
            </a>
            <a href="#" className="footer__icons">
              <img src={twitter} className="footer__img" alt="Twitter" />
            </a>
            <a href="https://www.youtube.com/@sindisaudiovisual698" className="footer__icons" target="_blank">
              <img src={youtube} className="footer__img" alt="YouTube" />
            </a>
          </div>

          <h6 className="footer__copyright">
            &copy; <span>{new Date().getFullYear()}</span> - SINDIS, Todos los
            derechos reservados.
          </h6>
        </section>
      </footer>
    </>
  );
};

export default Footer;
