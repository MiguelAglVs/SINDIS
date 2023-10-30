import React, { useState, useEffect } from "react";

import Navigation from "../components/Navbar";
import Footer from "../components/Footer";

const Inscription = () => {
  return (
    <>
      <Navigation />
      <div className="container-landing p-5 mt-5">
      <div className="container-sm pt-5">
        <form className="row">
          <div className="col-md-6">
            <h2>Formulario 1</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                ></input>
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                ></input>
              </div>
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                ></input>
              </div>
              <div className="col-12">
                <label for="inputAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                ></input>
              </div>
              <div className="col-md-6">
                <label for="inputCity" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                ></input>
              </div>
              <div className="col-md-4">
                <label for="inputState" className="form-label">
                  State
                </label>
                <select id="inputState" className="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-md-2">
                <label for="inputZip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                ></input>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  ></input>
                  <label className="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Formulario 2</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                ></input>
              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                ></input>
              </div>
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                ></input>
              </div>
              <div className="col-12">
                <label for="inputAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                ></input>
              </div>
              <div className="col-md-6">
                <label for="inputCity" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                ></input>
              </div>
              <div className="col-md-4">
                <label for="inputState" className="form-label">
                  State
                </label>
                <select id="inputState" className="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-md-2">
                <label for="inputZip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                ></input>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  ></input>
                  <label className="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div className="col-12 d-grid justify-content-md-end">
                <button type="submit" className="btn btn-about">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Inscription;
