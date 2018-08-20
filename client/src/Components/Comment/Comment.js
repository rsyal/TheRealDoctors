import React from "react";
const dateformat = require("dateformat");

const Comment = props => (
  <div className="card" style={{ width: "75%" }}>
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Name?</h6>
      <p className="card-text text-muted">
        {dateformat(props.date, "mmmm dS, yyyy, h:MM:ss TT")}
      </p>
      <p className="card-text">{props.content}</p>
    </div>
  </div>
);

export default Comment;
