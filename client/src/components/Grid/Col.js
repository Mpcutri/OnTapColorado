import React from "react";

export const Col = ({ size, children }) => (
  <div className={size.split(" ").map(size => "col-" + size).join(" ")} style={{paddingLeft: 0, paddingRight: 0}}>
    {children}
  </div>
);
