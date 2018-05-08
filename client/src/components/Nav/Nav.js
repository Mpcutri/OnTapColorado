import "./Nav.css";
import $ from "jquery";
import onTapText from "../../images/onTap.png";
import SearchBar from "../SearchBar";
import React from 'react';
import axios from 'axios'
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
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap';
import LoginForm from '../../pages/Login';
import SignupForm from '../../pages/SignUp';

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
    padding: "20px"
  },
  navbarHeader: {
    float: 'none'
  },
  loginButton: {
    paddingLeft: '20px',
    paddingRight: '20px',
    marginLeft: "10px"
  },
  homePage: {
    fontSize: '30px'
  },
  loginForm: {
    textAlign: "center"
  },
  footerText: {
    textAlign: "center", 
    borderTop: "solid", 
    borderWidth: "1px", 
    borderColor: "#e9ecef"
  }
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      signUp: false,
      searchResults: [],
      search: ""
    };
    this._login = this._login.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggle2 = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  _login(username, password) {
    axios
      .post('/auth/login', {
        username,
        password
      })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          })
          window.location = '/admin/' + response.data.user.breweryURL
        } else if (response.status != 200) {
          this.setState({
            alert: true
          })
          console.log("dkfjdlfjdlkfjdlkfjdlkjfdlkjfdlkfjfdlkjfd")
        }
      })
  }

  render() {
    console.log(this.props)
    return (
      <div>
      <div className="navbarDiv">
        <Navbar color="light" light expand="md">
          <NavbarBrand className="homePage" style={style.homePage} href="/"><img id="logoImage" src={onTapText} /></NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar pills>
              <NavItem>
                <SearchBar breweries={this.props.breweries} beers={this.props.beers} className="search-bar"/>
              </NavItem>
              <NavItem>
                <NavLink className="loginButton" onClick={this.toggle} active style={style.loginButton}>Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="signUpLink" onClick={() => {this.setState({ signUp: true, modal: !this.state.modal }) }}>Sign up</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

      <div id="login-modal">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            <span className="loginText" onClick={() => {this.setState({ signUp: false }) }}>
              Log in
            </span>
              {'  |  '}
            <span className="signupText" onClick={() => {this.setState({ signUp: true }) }}>
              Sign up
            </span>
          <div></div>
          </ModalHeader>

          <div>
            {!this.state.signUp ? (
              <div>
                <ModalBody>
                  <LoginForm _login={this._login} alert={this.state.alert}/>
                </ModalBody>

                <ModalBody style={style.footerText}>
                  <h6>
                    Don't have an account? <a style={{ color: "blue" }} onClick={() => {this.setState({ signUp: true }) }}>Sign up today!</a>
                  </h6>
                </ModalBody>
              </div>
            ) : (
              <div>
                <ModalBody>
                  <SignupForm />
                </ModalBody>

                <ModalBody style={style.footerText}>
                  <h6>
                    Already have an account? <a style={{ color: "blue" }} onClick={() => {this.setState({ signUp: false }) }}>Log in!</a>
                  </h6>
                </ModalBody>
              </div>
            )}
          </div>

        </Modal>
      </div>
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
