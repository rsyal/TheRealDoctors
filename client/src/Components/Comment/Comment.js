import React from "react";
// import "./Comment.css";
//import { PromiseProvider } from "mongoose";

const Comment = props => (
  <div className="card" style={{ width: 100 }}>
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Name?</h6>
      <p className="card-text text-muted">{props.date}</p>
      <p className="card-text">{props.content}</p>
    </div>
  </div>
  //   <div className="card mb-4 h-100">
  //     <img
  //       className="card-img-top"
  //       src={props.src || "/assests/images/card-default.jpg"}
  //       alt={props.topic}
  //     />

  //     <div className="card-body">
  //       <h5 className="card-title">{props.topic}</h5>
  //     </div>
  //   </div>
);

export default Comment;
