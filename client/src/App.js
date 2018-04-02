import React, { Component } from 'react' // just added this one to test
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import LoginStatus from "./components/LoginStatus";
import Breweries from "./pages/Breweries";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// IF ALL FAILS: changes line 14 to exactly: const App = () => (
// get rid of the } on line 49
// and comment out the entire class App

const DisplayLinks = props => {
  if (props.loggedIn) {
    return (
      <nav className="navbar">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link" onClick={props._logout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/breweries" component={Breweries} />
          <Route exact path="/breweries/:id" component={Detail} />
          {/*
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          */}
          
        </Switch>
      </div>
    </Router>
    )
  } // end of else statement
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      user: null
    }
    this._logout = this._logout.bind(this)
    this._login = this._login.bind(this)
  }

  componentDidMount() {
    axios.get('/auth/user').then(response => {
      console.log(response.data)
      if (!!response.data.user) {
        console.log('THERE IS A USER')
        this.setState({
          loggedIn: true,
          user: response.data.user
        })
      } else {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
  }

  _logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/auth/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
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
        }
      })
  }

  render() {
    return (
      <div className="App">
        <h1>This is the main App component</h1>
        {/* LINKS to our different 'pages' */}
        <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
        {/*  ROUTES */}
        {/* <Route exact path="/" component={LoginStatus} /> */}
        <Route exact path="/" render={() => <LoginStatus user={this.state.user} />} />
        <Route
          exact
          path="/login"
          render={() =>
            <Login
              _login={this._login}
            />}
        />
        <Route exact path="/signup" component={SignUp} />
        {/* <Login _login={this._login} /> */}
      </div>
    )
  }
}

export default App;