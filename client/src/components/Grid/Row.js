import React from "react";

export const Row = ({ fluid, children }) => (
  <div style={{backgroundColor: "rgba(255,255,255,0.5)"}} className={`row${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
