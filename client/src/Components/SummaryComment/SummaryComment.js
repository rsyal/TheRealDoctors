import React from "react";
const dateformat = require("dateformat");

// component called on reading blog
const SummaryComment = props => (
  <div className="card" style={{border: "0", width: "100%"}} >
    <div className="card-body">
      <span><h5 className="card-title" style={{fontSize:"1.3rem",fontWeight:"bold"}}>{props.title}</h5>
      <span className="card-text text-muted d-inline">
        {dateformat(props.date, "mmmm dS, yyyy, h:MM:ss TT")}
      </span></span>
      <p className="card-text">{props.content}</p>
    </div>
  </div>
);

export default SummaryComment;