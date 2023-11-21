import React from "react";

const HomeD = () => {
  return (
    <>
      <section>
        <div className="container-fluid">
        <h2 className="h5">Dashboard</h2>
          <div className="row row-cols-2 row-cols-md-4 g-4">
            <div className="col">
              <div className="card h-100 shadow">
                <div className="card-body border-info border-start border-4 rounded-start">
                  <div className="d-flex align-items-center justify-content-around">
                    <div>
                      <p className="text-muted">Bounce Rate</p>
                      <h3 className="fw-bold">65</h3>
                    </div>
                    <div className="icon-card text-info">
                      <i className="fas fa-users fa-4x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow">
                <div className="card-body border-success border-start border-4 rounded-start">
                  <div className="d-flex align-items-center justify-content-around">
                    <div>
                      <p className="text-muted">Bounce Rate</p>
                      <h3 className="fw-bold">65</h3>
                    </div>
                    <div className="icon-card text-success">
                      <i className="fas fa-clipboard-list fa-4x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow">
                <div className="card-body border-warning border-start border-4 rounded-start">
                  <div className="d-flex align-items-center justify-content-around">
                    <div>
                      <p className="text-muted">Bounce Rate</p>
                      <h3 className="fw-bold">65</h3>
                    </div>
                    <div className="icon-card text-warning">
                      <i className="fas fa-comments fa-4x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow">
                <div className="card-body border-danger border-start border-4 rounded-start">
                  <div className="d-flex align-items-center justify-content-around">
                    <div>
                      <p className="text-muted">Bounce Rate</p>
                      <h3 className="fw-bold">65</h3>
                    </div>
                    <div className="icon-card text-danger">
                      <i className="fas fa-sad-tear fa-4x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeD;
