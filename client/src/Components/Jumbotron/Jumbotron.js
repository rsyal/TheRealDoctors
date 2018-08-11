import React from "react";

const Jumbotron = ({ children }) => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-4">The Real Doctors</h1>
      <p className="lead">A blog written by credentialed medical professionals.</p>
 
    </div>
   
<video autoPlay muted loop id="myVideo">
  <source src="/assests/videos/doctorsWalking.mp4" type="video/mp4"/>
</video>
</div>

);

export default Jumbotron;
