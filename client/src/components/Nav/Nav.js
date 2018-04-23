import "./Nav.css";
import $ from "jquery";
import onTapText from "../../images/onTap.png";
import SearchBar from "../SearchBar";
import React from 'react';
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

const style = {
  signupButton: {
    float: 'right',
    backgroundColor: "#e43b36",
    margin: "30px 2.5px 2.5px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px"
  },
  loginButton: {
    float: 'right',
    backgroundColor: "rgb(236, 103, 99)",
    margin: "30px 2.5px 2.5px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px"
  },
  navbarHeader: {
    float: 'none'
  },
  loginButton: {
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  homePage: {
    fontSize: '30px'
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
              <NavItem>
                <NavLink className="loginButton" href="/login" active style={style.loginButton}>Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Sign up</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// const Nav = () => (
//   <nav className="navbar navbar-inverse navbar-top">
//     <div className="container-fluid">
//       <div className="navbar-header" style={style.navbarHeader}>
//         <button type="button" className="collapsed navbar-toggle">
//           <span className="sr-only">Toggle navigation</span>
//           <span className="icon-bar" /> <span className="icon-bar" />
//           <span className="icon-bar" />
//         </button>
//         <a href="/" className="navbar-brand">
//           <span id="logo-text" style={{ fontSize: '60px', marginTop: '20px'}}>
//             <img id="home-icon" src={homeIcon} />
//           </span>
//         </a>
//         <a href="/login"><button style={style.loginButton} className="login-button">Log in</button></a>

//         <a href="/signup"><button style={style.signupButton} className="signup-button">Sign Up</button></a>
//       </div>
//     </div>
//   </nav>
// );

// export default Nav;
