import React from "react";
import "./Nav.css";
import $ from "jquery";


const style = {
  signupButton: {
    float: 'right',
    backgroundColor: "#e43b36",
    margin: "15px 2.5px 2.5px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px"
  },
  loginButton: {
    float: 'right',
    backgroundColor: "rgb(236, 103, 99)",
    margin: "15px 2.5px 2.5px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px"
  },
  navbarHeader: {
    float: 'none'
  }
}

// -
function expand() {
  $(".search").toggleClass("close");
  $(".input").toggleClass("square");
  if ($('.search').hasClass('close')) {
    $('input').focus();
  } else {
    $('input').blur();
  }
}
$('.search').on('click', expand);


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
        <a href="/login"><button style={style.loginButton} className="login-button">Log in</button></a>

        {/*<div id="search-bar" className="search-container">
          <div className="search-box">
              <input type="text" />
                <span></span>
          </div>
        </div>*/}

        <a href="/signup"><button style={style.signupButton} className="signup-button">Sign Up</button></a>
      </div>
    </div>
  </nav>
);

export default Nav;
