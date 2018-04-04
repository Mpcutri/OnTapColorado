import React from "react";
import "./Nav.css";
import $ from "jquery";


const style = {
  signupButton: {
    float: 'right',
    backgroundColor: 'blue',
    margin: "2.5px",
    marginTop: "15px",
    color: "white",
  },
  loginButton: {
    float: 'right',
    backgroundColor: 'orange',
    margin: "2.5px",
    marginTop: "15px",
    color: "white"
  },
  navbarHeader: {
    float: 'none'
  }
}


const Nav = () => (
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header" style={style.navbarHeader}>
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          Colorado Craft Breweries
        </a>
        <a href="/login"><button style={style.loginButton} className="login-button">Log in!</button></a>

      <form id="demo-2">
        <input type="search" placeholder="Search" />
      </form>


        <a href="/signup"><button style={style.signupButton} className="signup-button">Sign Up!</button></a>
      </div>
    </div>
  </nav>
);

export default Nav;
