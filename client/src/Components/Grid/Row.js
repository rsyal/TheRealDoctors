import React from "react";

export const Row = ({ fluid, children }) => (
  <div className={`row${fluid ? "-fluid" : ""}`} style={{marginTop:"5 rem"}}>
    {children}
  </div>
);
