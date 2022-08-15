import React from 'react';
import {
  Outlet
} from "react-router-dom";
import './App.scss';


function Code() {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h2>Code</h2>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Code;