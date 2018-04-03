import React from "react";

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

        <div className="btn-group">
          <span className="glyphicon glyphicon-user brewery-profile btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"aria-hidden="true" style={style.breweryProfile}></span>
          <ul className="dropdown-menu">
            {console.log(props)}
            <li><a href={"/admin/" + props.id}>View Profile</a></li>
            <li><a href={"/breweries/" + props.id}>Visit Brewery Page</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Sign out</a></li>
          </ul>
        </div>

        <a href="#" onClick={props.userLogout}><button style={style.logoutButton} className="logout-button">Logout</button></a>
      </div>
    </div>
  </nav>
);

export default Nav2;
