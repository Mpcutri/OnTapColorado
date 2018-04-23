import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) => (
  <div style={{ height: 300, clear: "both", marginTop: "30px" }} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
