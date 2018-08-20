import React from "react";
import "./Button.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Button = props => (
  <button className="btn btn-secondary btn-sm" {...props}>{props.btntext}
  </button>
);

export default Button;