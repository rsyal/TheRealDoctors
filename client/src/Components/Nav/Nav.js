import React from "react";
import { NavLink } from 'react-router-dom';

const Nav = () => (

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand text-light" href="/">
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

<<<<<<< HEAD
          {/* need to figure out a way to have 'active' class added for nav of current page */}
          <Link className="nav-link" to="/DoctorsPost">
            Blog
          </Link>
=======
          <NavLink className="nav-link" to="/DoctorsPost">
            Blog
          </NavLink>
>>>>>>> 0f518a02c9dc5e65c303154617624b2276016d81

        </li>
        <li className="nav-item">

<<<<<<< HEAD
          <Link className="nav-link" to="/Detail">
            Detail
          </Link>
=======
          <NavLink className="nav-link" to="/Detail">
            Detail
          </NavLink>
>>>>>>> 0f518a02c9dc5e65c303154617624b2276016d81

        </li>
        <li className="nav-item">

          <NavLink className="nav-link" to="/About">
            About
<<<<<<< HEAD
          </Link>          
=======
          </NavLink>          
>>>>>>> 0f518a02c9dc5e65c303154617624b2276016d81

        </li>
        <li className="nav-item">

<<<<<<< HEAD
          <Link className="nav-link" to="/Signup">
            Signup
          </Link>          
=======
          <NavLink className="nav-link" to="/Signup">
            Signup
          </NavLink>          
>>>>>>> 0f518a02c9dc5e65c303154617624b2276016d81

        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="email"
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
          sign in with <i class="fa fa-google" aria-hidden="true" />
        </button>
      </form>
    </div>
  </nav>
);

export default Nav;
