import React from "react";

export const Row = ({ fluid, children }) => (
  <div style={{backgroundColor: "#ddddd"}} className={`row${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
