import React, { useEffect, useState } from "react";
import { uploadFile } from "../../firebase/config";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const Roles = () => {
  return (
    <>
      <h2 className="h5">Dashboard</h2>
      <div className="container">
        <div className="row row-cols-2">
          <div className="col">
            <div class="card">
              <div class="card-header">Roles</div>
              <div class="card-body">
                <form class="row g-3 needs-validation" novalidate>
                  <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom01"
                      value="Mark"
                      required
                    />
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom02"
                      value="Otto"
                      required
                    />
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <div class="col-md-4">
                    <label for="validationCustomUsername" class="form-label">
                      Username
                    </label>
                    <div class="input-group has-validation">
                      <span class="input-group-text" id="inputGroupPrepend">
                        @
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        id="validationCustomUsername"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <div class="invalid-feedback">
                        Please choose a username.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label for="validationCustom03" class="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom03"
                      required
                    />
                    <div class="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </div>
                  <div class="col-md-3">
                    <label for="validationCustom04" class="form-label">
                      State
                    </label>
                    <select
                      class="form-select"
                      id="validationCustom04"
                      required
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option>...</option>
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  <div class="col-md-3">
                    <label for="validationCustom05" class="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom05"
                      required
                    />
                    <div class="invalid-feedback">
                      Please provide a valid zip.
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label class="form-check-label" for="invalidCheck">
                        Agree to terms and conditions
                      </label>
                      <div class="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary" type="submit">
                      Submit form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-header">Roles</div>
              <div className="card-body"></div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;
