import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) => (
  <div className="jumbotron jumbotron-fluid">
    <video autoPlay muted loop id="myVideo" width="100%">
      <source src="/assests/videos/doctors.mp4" type="video/mp4" />
    </video>
    <div className="text-box text-center">
      <h3 className="header">The Real Doctors</h3>
      <p className="lead">A blog written by board-certified doctors.</p>
      <a href="#blogs">
        <button type="button" className="btn btn-dark">
          Read now
        </button>
      </a>
    </div>

    {/* <h1 className="display-4">The Real Doctors</h1>
      <p className="lead">A blog written by credentialed medical professionals.</p> */}
  </div>
);

export default Jumbotron;
