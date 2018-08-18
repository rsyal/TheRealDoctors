import React from "react";
import "./Nav.css";
// import { NavLink } from "react-router-dom";
import Login from "../../Pages/Login";

// console log google auth response
// const responseGoogle = response => {
//   console.log(response);

// email = response.profileObj.email
//registeredBlogger(response.profileObj.email) ? this.props.history.push('/') :
//};

// const logout = () => {
//   console.log("logout");
// };

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
    <a className="navbar-brand text-light blog-name" href="/">
      <img
        className="logo-nav float-left"
        alt="medical symbol"
        src="/assests/images/logo.svg"
      />
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

    {/*BEGIN STEPH NAV */}
    {/* Links dependent on login status*/}
    <Login />
    {/*END STEPH NAV */}

    {/* <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/DoctorPost">
                Blog
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

          <Login />

    </div> */}
  </nav>
);

export default Nav;
