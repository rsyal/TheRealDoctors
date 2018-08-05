import React from "react";

const Footer = () => (

    <footer className="footer text-center">
      <div className="container">
        <span className="text-muted">
          Copyright &copy; {(new Date().getFullYear())}
          </span>
      </div>
    </footer>

);

export default Footer;
