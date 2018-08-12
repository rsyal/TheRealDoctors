import React from "react";
// import "./Comment.css";
//import { PromiseProvider } from "mongoose";

const Comment = props => (
  <div class="card" style={{ width: 100 }}>
    <div class="card-body">
      <h5 class="card-title">{props.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Name?</h6>
      <p class="card-text">{props.content}</p>
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
