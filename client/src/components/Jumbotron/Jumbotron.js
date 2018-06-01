import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) => (
  <div style={{ height: "auto", clear: "both", marginTop: "120px" }} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
