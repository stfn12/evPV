import React from "react";
import ControlorCtA from "../../ctas/AddControlorCtA";
import ListControlori from "../forms/ListControlori";

function ControloriPage() {
  return (
    <div>
      <h1 align="center" style={{ padding: "15px" }}>Controlori</h1>
      <ControlorCtA/>
      <ListControlori/>
    </div>
  );
}

export default ControloriPage;