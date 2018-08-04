import React from "react";
import "./Card.css";
import { PromiseProvider } from "mongoose";

const Card = props => (
  <div className="card">
    <img className="card-img-top" src={props.imageSrc} alt={props.topic} />
    <div className="card-body">
      <h5 className="card-title">{props.topic}</h5>
      <p className="card-text">{props.content}</p>
    </div>
    <div className="card-body text-right">
      <a className="card-link">3 comments</a>
    </div>
  </div>
);

export default Card;
