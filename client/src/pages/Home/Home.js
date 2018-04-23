import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import logoImage from "./images/onTapColoradoFlag.png";
import LoginStatus from "../../components/LoginStatus";
import SearchBar from "../../components/SearchBar";
import Background from "../../images/bobRossMountain.jpg";
import Logo from "../../components/Logo";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { ReactDOM, findDOMNode } from "react-dom";
import $ from "jquery";
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import "./Home.css";
import { Button } from 'reactstrap';
import ScrollToTop from "react-scroll-up";
// import brewMark from "./markers.js";


const style = {
  breweryList: {
    border: 'solid',
    position: "relative", 
    marginBottom: "30px",
    marginTop: "30px"
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

var dynamicMarkers = [];

function markers2() { 
  API.getBreweries()
    .then(res =>
      res.data.map(brewery => (
        dynamicMarkers.push({
          brewery: brewery.brewery,
          position: brewery.position,
          id: brewery._id
        })
      ))
      
    )
    .catch(err => console.log(err));
};

class Breweries extends Component {
  state = {
    breweries: []
  };

  componentDidMount() {
    markers2();
    this.loadBreweries();
  };

  loadBreweries = () => {
    API.getBreweries()
      .then(res =>
        this.setState({ breweries: res.data })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <Logo style={{position: "absolute"}} />
      
        <div id="scrollButton" style={{ position: "relative", zIndex: "5" }}>
            
            
          <ScrollToTop id="scroll-button" showUnder={160}>
            <span style={{ backgroundColor: "rgba(136, 135, 135, 0.65)", padding: "20px", borderRadius: '10px' }}><span class="glyphicon glyphicon-arrow-up"></span></span>
          </ScrollToTop>

        </div>

        <div style={{ backgroundColor: "#2b2b2b", position: "relative" }}>
        <Container>
              <div id="map" style={{ position: "relative", marginTop: "30px" }}>
                <MyMapComponent isMarkerShown />
              </div>
        </Container>
        </div>

        <Container>
          <Col size="md-6">
              {console.log(this.state.breweries)}
              {this.state.breweries.length ? (
                <div className="brewery-list" style={style.breweryList}>
                  <List>
                    {this.state.breweries.map(brewery => (
                      <ListItem key={brewery._id}>
                        <Link onClick={this.forceUpdate} to={"/breweries/" + brewery._id}>
                          <strong>
                            {brewery.brewery}
                          </strong>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                  
                </div>
              ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6">
            <div className="brewery-list" style={style.breweryList}>
              <p>whatevewhatever
              </p>
            </div>
          </Col>
        </Container>
      </div>
    );
  }
}

const MyMapComponent = compose(
  withProps({
    googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3o7dy50LdekZi5WmxFMHbVK690D3KeKQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `95%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `95%` }} />
  }),   
  withHandlers({
    onMarkerClick: () => (marker) => {
      console.log(marker.id)
      console.log('Go to the marker post page')
      window.location = '/breweries/' + marker.id;
    },
    showInfo: () => (marker) => {
      $("#infoBox").show()
      $("#infoText").text(marker.brewery)
    },
    hideInfo: () => (marker) => {
      $("#infoBox").hide()
      $("#infoText").text("")
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 39.7393, lng: -104.9848 }} style={{ position: "relative" }}>
    <div id="infoBox" style={{ backgroundColor: `white`, color: "black", padding: `12px`, position: "absolute", left: "60%", bottom: "40%" }}>
      <p id="infoText"></p>
    </div>
    {console.log(dynamicMarkers)}
    {props.isMarkerShown && (
      <div>
        {dynamicMarkers.map(brewery => (
        <div>
        <Marker
          onClick={props.onMarkerClick.bind(this, brewery)}
          onMouseOver={props.showInfo.bind(this, brewery)}
          onMouseOut={props.hideInfo.bind(this, brewery)}
          key={brewery.id}
          className={brewery.id}
          position={brewery.position}
        >
      </Marker>
      </div>
      ))}

      </div>

    )}
  </GoogleMap>
));


export default Breweries;