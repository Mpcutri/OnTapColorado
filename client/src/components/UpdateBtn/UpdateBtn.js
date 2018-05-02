import React from "react";
import "./UpdateBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const UpdateBtn = props => (
  <span className="btn update-btn glyphicon glyphicon-sort" {...props} />
);

export default UpdateBtn;


