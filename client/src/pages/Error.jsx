// import React from 'react';
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="mx-auto p-2">
        <div className="text-center justify-content-center">
          <h3>Error 404</h3>
          <Link to="/">Inicio</Link>
        </div>
      </div>
    </>
  );
};

export default Error;
