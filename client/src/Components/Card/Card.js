import React from "react";
import "./Card.css";
//import { PromiseProvider } from "mongoose";

const Card = props => (
  <div className="card mb-4">
    {/* <img className="card-img-top" src={props.imageSrc} alt={props.topic} /> */}
    {/* NOTE: THE HARD CODED URL BELOW IS ONLY USED BECAUSE THE TAG THAT IS COMMENTED OUT ABOVE WAS NOT GETTING AN IMAGE TO SHOW UP. FEEL FREE TO GET RID OF THE HARD CODED URL IF YOU CAN GET THE props.imageSrc TO WORK */}
    <img
      className="card-img-top"
      src={props.src || "/assests/images/card-default.jpg"}
      alt={props.topic}
      height="190px"
    />

    <div className="card-body">
      <h5 className="card-title">{props.topic}</h5>
      {/* <p className="card-text">{props.content}</p> */}
    </div>
    {/* <div className="card-body text-right">
      <a className="card-link">3 comments</a>
    </div> */}
  </div>
);

export default Card;
