import React, { Component } from 'react' // just added this one to test
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { Button } from 'reactstrap';
import LoginStatus from "./components/LoginStatus";
import Home from "./pages/Home";
import Breweries from "./pages/BreweryPortal";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Nav2 from "./components/Nav2";
import { Redirect } from 'react-router-dom';
import "./pages/Home/Home.css";
import API from "./utils/API";


// IF ALL FAILS: changes line 14 to exactly: const App = () => (
// get rid of the } on line 49
// and comment out the entire class App

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      user: null,
      id: null,
      brewery: null,
      breweryURL: null,
      breweries: [],
      beers: [],
      alert: false 
    }
    this._logout = this._logout.bind(this)
    this._login = this._login.bind(this)
  }

  componentDidMount() {
    this.loadBreweries();
    axios.get('/auth/user').then(response => {
      console.log(response.data)
      if (!!response.data.user) {
        console.log('THERE IS A USER')
        this.setState({
          loggedIn: true,
          user: response.data.user,
          info: null,
          id: response.data.user._id,
          brewery: response.data.user.brewery,
          breweryURL: response.data.user.breweryURL
        })
      } else {
        this.setState({
          loggedIn: false,
          user: null,
          info: null,
          brewery: null,
          breweryURL: null         
        })
      }
    })
  }

  loadBreweries = () => {
    API.getBreweries()
      .then(res =>
        this.setState({ breweries: res.data })
      )
      .catch(err => console.log(err));
  };

  loadBeers = () => {
    this.state.breweries.map(brewery => (
      brewery.beer.map(beer => (
        this.state.beers.push(beer)
      ))
    ))
  };  

  _logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/auth/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.setState({
          loggedIn: null,
          user: null
        })
        window.location = '/'
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
          console.log(response.data.user)
          window.location = '/admin/' + response.data.user.breweryURL
        }
      })
  }

  render() {
    this.loadBeers();
    return (
      <div className="App">
        {/* LINKS to our different 'pages' */}
      {/* <Route exact path="/" render={() => <LoginStatus user={this.state.user} />} /> */}
        <DisplayLinks breweries={this.state.breweries} beers={this.state.beers} _logout={this._logout} loggedIn={this.state.loggedIn} id={this.state.id} brewery={this.state.brewery} breweryURL={this.state.breweryURL}/>
        {/*  ROUTES */}
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" render={() => <Home breweries={this.state.breweries} user={this.state.user} />} />
        <Route
          exact
          path="/login"
          render={() =>
            <Login
              _login={this._login}
            />}
        />
        <Route exact path="/signup" component={SignUp} />
        {console.log(this.state.breweries)}
        {console.log(this.state.beers)}
        {/* <Login _login={this._login} /> */}
      </div>
    )
  }
}

const DisplayLinks = props => {
  console.log(props)
  if (props.loggedIn) {
    console.log(props);
    return (
      <Router>
      <div>
        <Nav2 breweries={props.breweries} beers={props.beers} userLogout={props._logout} id={props.id} brewery={props.brewery} breweryURL={props.breweryURL}/>
        <Switch>
          <Route exact path="/admin/:breweryURL" component={Breweries} />
          <Route exact path="/breweries/:breweryURL" component={Detail} />
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
        <Nav breweries={props.breweries} beers={props.beers}/>
        <Switch>
          <Route exact path="/breweries" component={Breweries} />
          <Route exact path="/breweries/:breweryURL" component={Detail} />
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