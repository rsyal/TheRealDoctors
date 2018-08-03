import React from "react";
import "./Card.css";

const Card = () => (
  <div className="card" >
    <img
      className="card-img-top"
      src=".../100px180/?text=Image cap" 
      alt="I mean it!"
    />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
    </div>
    <div className="card-body text-right">
      <a className="card-link">
        3 comments
      </a>
    </div>
  </div>
);

export default Card;
