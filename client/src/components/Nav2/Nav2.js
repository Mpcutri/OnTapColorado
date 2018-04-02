import React from "react";

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

const Nav2 = props => (
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
        <a href="/"><button style={style.loginButton} className="login-button">Home</button></a>
        <a href="#" className="nav-link" onClick={props._logout}><button style={style.signupButton} className="logout-button">Logout</button></a>
      </div>
    </div>
  </nav>
);

export default Nav2;
