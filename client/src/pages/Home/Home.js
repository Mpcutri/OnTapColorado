import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import logoImage from "./images/onTapColoradoFlag.png";
import LoginStatus from "../../components/LoginStatus";
import SearchBar from "../../components/SearchBar";
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
// import brewMark from "./markers.js";


const style = {
  breweryList: {
    border: 'solid',
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
var dyMark = []
var markers2 = 
    API.getBreweries()
      .then(res =>
        dynamicMarkers.push(res.data)

      )
      .catch(err => console.log(err));
console.log(markers2)
console.log(dynamicMarkers);

for (var i = 0; i < dynamicMarkers.length; i++) {
  dyMark.push(dynamicMarkers[i])
}

var markers = [
{
  position: {lat: 39.7605, lng: -104.9824},
  title: 'Our Mutual Friend',
  id: "OurMutualFriend",
  _id: "5abd202046b5be963d032e36"
},
{
  position: {lat: 39.7615, lng: -104.9811},
  title: 'Ratio Beerworks',
  id: "RatioBeerworks",
  _id: "5abd4bf39fa2d2a11f40b57a"
},
{
  position: {lat: 39.755217, lng: -104.977019},
  title: 'Spangalang Brewery',
  id: "SpanalangBrewery",
  _id: "5abd4c239fa2d2a11f40b57b"
},
{
  position: {lat: 39.7510, lng: -104.9846},
  title: 'Woods Boss Brewing',
  id: "WoodsBossBrewing",
  _id: "5abd4c349fa2d2a11f40b57c"
},
{
  position: {lat: 39.7632, lng: -104.9813},
  title: 'Epic Brewing Company',
  id: "EpicBrewingCompany",
  _id: "5abd4c4b9fa2d2a11f40b57d"
},
{
  position: {lat: 39.753786, lng: -104.988500},
  title: 'Great Divide Brewing Co',
  id: "GreatDivideBrewingCo",
  _id: "5abd4c649fa2d2a11f40b57e"
},
{
  position: {lat: 39.7523, lng: -104.9914},
  title: 'Jagged Mountain Craft Brewing',
  id: "JaggedMountainCraftBrewing",
  _id: "5abd4c7e9fa2d2a11f40b57f"
},
{
  position: {lat: 39.7199, lng: -104.9877},
  title: 'TRVE Brewing Co',
  id: "TRVEBrewingCo",
  _id: "5abd4c919fa2d2a11f40b580"
},
{
  position: {lat: 39.7237, lng: -105.0006},
  title: 'Crazy Mountain Brewery Tap Room',
  id: "CrazyMountainBreweryTapRoom",
  _id: "5abd4ca49fa2d2a11f40b581"
},
{
  position: {lat: 39.7239, lng: -104.9985},
  title: 'Black Sky Brewery',
  id: "BlackSkyBrewery",
  _id: "5abd4cb39fa2d2a11f40b582"
},
{
  position: {lat: 39.7306, lng: -104.9993},
  title: 'Renegade Brewing Company',
  id: "RenegadeBrewingCompany",
  _id: "5abd4cc29fa2d2a11f40b583"
}
];

class Breweries extends Component {
  state = {
    breweries: []
  };

  componentDidMount() {
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
      <Container>
        <SearchBar className="search-bar"/>
        <Row>
          <Logo style={{position: "absolute"}}>
            <img src={logoImage} />
          </Logo>
            
            <div id="map" style={{ marginTop: '490px' }}>
              <MyMapComponent isMarkerShown />
            </div>
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
        </Row>
      </Container>
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
      window.location = '/breweries/' + marker._id;
    },
    showInfo: () => (marker) => {
      $("#infoBox").show()
      $("#infoText").text(marker.title)
    },
    hideInfo: () => (marker) => {
      $("#infoBox").hide()
      $("#infoText").text("")
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 39.7393, lng: -104.9848 }} style={{ position: "relative"}}>
    <div id="infoBox" style={{ backgroundColor: `white`, color: "black", padding: `12px`, position: "absolute", left: "60%", bottom: "-30%" }}>
      <p id="infoText"></p>
    </div>

    {props.isMarkerShown && (
      <div>
        {console.log(dyMark)}
        {markers.map(brewery => (
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