import React from "react";
import { Spinner } from "react-bootstrap";
function Spinner1() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          display: "block",
          margin : 'auto'
        }}
      ></Spinner>
    </div>
  );
}

export default Spinner1;
