import React from "react";
import { NavLink } from "react-router-dom";
//import GoogleLogin from "react-google-login";

// console log google auth response
const responseGoogle = response => {
  console.log(response);
};

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
    <a className="navbar-brand text-light blog-name" href="/">
      <img className="logo-nav float-left" src="/assests/images/logo.svg" />
      The Real Doctors
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor02"
      aria-controls="navbarColor02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/DoctorPost">
            Blog
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Detail">
            Detail
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/About">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Signup">
            Signup
          </NavLink>
        </li>
      </ul>
      <GoogleLogin
        clientId="779231878096-k23dj1tdlplrdhbvrlq4uel3c89am084.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="email"
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
          sign in with <i className="fa fa-google" aria-hidden="true" />
        </button>
      </form>
    </div>
  </nav>
);

export default Nav;
