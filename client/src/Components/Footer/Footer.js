import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid text-center bg-dark">
      <div className="row">
        <div className="col-md-4 col-xs-12">
          <img
            className="logo"
            alt="medical symbol"
            src="/assests/images/logo.svg"
            width="100"
          />
        </div>
        <div className="col-md-4 col-xs-12">
          The Real Doctors was created by:
          <p className="team-names">
            Dr. Reetu Syal | Grace Rhee | Steph Japs | Barbey Ng
          </p>
        </div>
        <div className="col-md-4 col-xs-12">Social Media icons here</div>
      </div>
      <div className="row">
        <div className="col-12">
          Copyright &copy; The Real Doctors {new Date().getFullYear()}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
