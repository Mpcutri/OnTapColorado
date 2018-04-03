import React, { Component } from 'react' // just added this one to test
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import LoginStatus from "./components/LoginStatus";
import Home from "./pages/Home";
import Breweries from "./pages/BreweryPortal";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Nav2 from "./components/Nav2";
import { Redirect } from 'react-router-dom'

// IF ALL FAILS: changes line 14 to exactly: const App = () => (
// get rid of the } on line 49
// and comment out the entire class App
let id = null;

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      user: null,
      id: null,
      redirectTo: null
    }
    this._logout = this._logout.bind(this)
    this._login = this._login.bind(this)
  }

  componentDidMount() {
    axios.get('/auth/user').then(response => {
      console.log(response.data)
      if (!!response.data.user) {
        console.log('THERE IS A USER')
        id = response.data._id
        this.setState({
          loggedIn: true,
          user: response.data.user,
          id: response.data._id
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
          user: null,
          redirectTo: '/'
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
            user: response.data.user,
            redirectTo: '/admin/' + response.data.user._id
          })
        }
      })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
    return (
      <div className="App">
        <Route exact path="/" render={() => <LoginStatus user={this.state.user} />} />
        {/* LINKS to our different 'pages' */}
        <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
        {/*  ROUTES */}
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" render={() => <Home user={this.state.user} />} />

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
}

const DisplayLinks = props => {
  if (props.loggedIn) {
    return (
      <Router>
      <div>
        {console.log(id)}
        <Nav2 userLogout={props._logout} id={id}/>
        <Switch>
          <Route exact path="/admin/:id" component={Breweries} />
          <Route exact path="/breweries/:id" component={Detail} />
          {/*
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          */}
        </Switch>
      </div>
    </Router>   
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

export default App;