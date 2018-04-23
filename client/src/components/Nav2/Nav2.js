import React from "react";
import Nav2Icon from "./images/ProfileIcon.png";
import SearchBar from "../SearchBar";
import "./Nav2.css";
import onTapText from "../../images/onTap.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

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
  },
  homePage: {
    fontSize: '30px'
  }
}

function signOut(props) {
  return function() {
    console.log("Logging user out");
    props.userLogout(...arguments);
    console.log(this);
    this.forceUpdate();
  }
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand className="homePage" style={style.homePage} href="/"><img id="logoImage" src={onTapText} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar pills>
              <NavItem>
                <SearchBar className="search-bar"/>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.id}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href={"/admin/" + this.props.id}>
                    View Profile
                  </DropdownItem>
                  <DropdownItem href={"/breweries/" + this.props.id}>
                    Visit Brewery Page
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem className="logout" onClick={this.props.userLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


// const Nav2 = props => (
//   <nav className="navbar navbar-inverse navbar-top">
//     <div className="container-fluid">
//       <div className="navbar-header" style={style.navbarHeader}>
//         <button type="button" className="collapsed navbar-toggle">
//           <span className="sr-only">Toggle navigation</span>
//           <span className="icon-bar" /> <span className="icon-bar" />
//           <span className="icon-bar" />
//         </button>

//         <a href="/" className="navbar-brand">
//             <img  id="home-icon" src={homeIcon} />
//         </a>

//         <div id="profile-icon">

//             <img src={Nav2Icon} style={{ width: "15%", height: "15%" }} className="brewery-profile dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"aria-hidden="true" style={style.breweryProfile} />
          
//           <ul className="dropdown-menu">


//             {console.log(props)}
//             <li><a href={"/admin/" + props.id}>View Profile</a></li>
//             <li><a href={"/breweries/" + props.id}>Visit Brewery Page</a></li>

            // {console.log(props)}
            // <li><a href={"/admin/" + props.id}>Brewery Portal</a></li>
            // <li><a href={"/breweries/" + props.id}>User Portal</a></li>

//             <li role="separator" className="divider"></li>
//             <li> <a className="logout" onClick={props.userLogout}>Sign out</a></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   </nav>

// );

// export default Nav2;
