import React, { useEffect, useState } from "react";
import EpsTable from "../../components/tables/EpsTable";
import Discapacidad from "../../components/tables/Discapacidad";

const Mas = () => {
  return (
    <>
      <h2 className="h5">Tablas</h2>
      <div className="container">
        <div className="row row-cols-2">
          <div className="col pb-4">
            <EpsTable />
          </div>
          <div className="col pb-4">
            <Discapacidad />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mas;
