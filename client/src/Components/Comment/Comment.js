import React from "react";
import "./Comment.css";
const dateformat = require("dateformat");

const Comment = props => (
  <div className="comment">
    <div className="comment-body">
      <h5 className="comment-title">{props.title}</h5>
      <p className="comment-text">{props.content}</p>
      <p className="comment-text text-muted">
        commented on: {dateformat(props.date, "mmmm dS, yyyy, h:MM:ss TT")}
      </p>
    </div>
  </div>
);

export default Comment;
