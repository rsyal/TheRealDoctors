import React from "react";
import "./Footer.css";
import { SocialIcon } from "react-social-icons";

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
        <div className="col-md-4 col-xs-12 created-by">
          The Real Doctors was created by:
          <p className="team-names">
            Dr. Reetu Syal | Grace Rhee | Steph Japs | Barbey Ng
          </p>
        </div>
        <div className="col-md-4 col-xs-12 social-icons">
          <SocialIcon
            url="mailto:therealdoctors1@gmail.com"
            color="#33bbff"
            className="email-icon"
          />
          &nbsp;&nbsp;&nbsp;
          <SocialIcon
            url="https://m.facebook.com/The-Real-Doctors-2128813360720648/"
            color="#ff4d4d"
            className="fb-icon"
          />
          &nbsp;&nbsp;&nbsp;
          <SocialIcon
            url="https://twitter.com/doctors_real"
            color="#4d94ff"
            className="twitter-icon"
          />
        </div>
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
