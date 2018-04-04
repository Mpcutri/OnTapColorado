import React from "react";
import Nav2Icon from "./images/ProfileIcon.png";
import $ from "jquery";
import "./Nav2.css";

// const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

const style = {
  logoutButton: {
    float: 'right',
    background: "blue",
    margin: "2.5px",
    marginTop: "15px",
    color: "white",
  },
  breweryProfile: {
    float: 'right',
    background: 'none',
    borderRadius: "10px",
    marginTop: "0px",
    color: "white",
    padding: "0px",
    height: "90px",
    margin: "3px"
  },
  navbarHeader: {
    float: 'none',
    height: '100px'
  }
}

$( document ).ready(function() {
    $(".dropdown-menu").addClass("scale-out")
});

$('.brewery-profile').on('click', function(){

  $(".dropdown-menu").addClass("scale-in")
});

function signOut(props) {
  return function() {
    console.log("Logging user out");
    props.userLogout(...arguments);
    console.log(this);
    this.forceUpdate();
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
          <span id="logo-text" style={{ fontSize: '60px', marginTop: '20px'}}>
            Home
          </span>
        </a>

        <div id="profile-icon">

            <img src={Nav2Icon} style={{ width: "15%", height: "15%" }} className="brewery-profile dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"aria-hidden="true" style={style.breweryProfile} />
          
          <ul className="dropdown-menu">

            {console.log(props)}
            <li><a href={"/admin/" + props.id}>View Profile</a></li>
            <li><a href={"/breweries/" + props.id}>Visit Brewery Page</a></li>

            <li role="separator" className="divider"></li>
            <li> <a className="logout" onClick={props.userLogout}>Sign out</a></li>
          </ul>
        </div>
        {/*onClick={(e) => {props.userLogout(e); console.log(this); this.forceUpdate();}}*/}
        {/*<a href="#" onClick={props.userLogout}><button style={style.logoutButton} className="logout-button">Logout</button></a>*/}

      </div>
    </div>
  </nav>

);

export default Nav2;
