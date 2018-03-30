import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import background from "./images/ccbBackground.jpg";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { ReactDOM, findDOMNode } from "react-dom";
import $ from "jquery";
import { compose, withProps, withHandlers, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import FaAnchor from "react-icons/lib/fa/anchor";

var markers = [
{
  position: {lat: 39.7605, lng: -104.9824},
  title: 'Our Mutual Friend',
  url: "http://www.google.com/",
  id: "OurMutualFriend"
},
{
  position: {lat: 39.7615, lng: -104.9811},
  title: 'Ratio Beerworks',
  url: "http://www.google.com/",
  id: "RatioBeerworks"
},
{
  position: {lat: 39.755217, lng: -104.977019},
  title: 'Spangalang Brewery',
  url: "http://www.google.com/",
  id: "SpanalangBrewery",
},
{
  position: {lat: 39.7510, lng: -104.9846},
  title: 'Woods Boss Brewing',
  url: "http://www.google.com/",
  id: "WoodsBoss"
},
{
  position: {lat: 39.7632, lng: -104.9813},
  title: 'Epic Brewing Company',
  url: "http://www.google.com/",
  id: "EpicBrewing"
},
{
  position: {lat: 39.753786, lng: -104.988500},
  title: 'Great Divide Brewing Co',
  url: "http://www.google.com/",
  id: "GreatDivide"
},
{
  position: {lat: 39.7523, lng: -104.9914},
  title: 'Jagged Mountain Craft Brewing',
  url: "http://www.google.com/",
  id: "JaggedMountain"
},
{
  position: {lat: 39.7199, lng: -104.9877},
  title: 'TRVE Brewing Co',
  url: "http://www.google.com/",
  id: "TRVEBrewing"
},
{
  position: {lat: 39.7237, lng: -105.0006},
  title: 'Crazy Mountain Brewery Tap Room',
  url: "http://www.google.com/",
  id: "CrazyMountain"
},
{
  position: {lat: 39.7239, lng: -104.9985},
  title: 'Black Sky Brewery',
  url: "http://www.google.com/",
  id: "BlackSky"
},
{
  position: {lat: 39.7306, lng: -104.9993},
  title: 'Renegade Brewing Company',
  url: "http://www.google.com/",
  id: "RenegadeBrewing"
}
]

  const MapWithAMakredInfoWindow = compose(
    withStateHandlers(() => ({
      isOpen: false,
    }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }), 
      onToggleClose: ({ isNotOpen }) => () => ({
        isOpen: isNotOpen,
      })
  }),
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3o7dy50LdekZi5WmxFMHbVK690D3KeKQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `80%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `80%` }} />
  }),   
  withHandlers({
    onMarkerClick: () => (marker) => {
      console.log(marker.id)
      console.log('Go to the marker post page')
      window.location = '/breweries/' + marker.id;
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
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 39.7393, lng: -104.9848 }} style={{ position: "relative" }}>

      <div>
        
        {markers.map(marker => (
        <Marker
          onClick={props.onMarkerClick.bind(this, marker)}
          onMouseOver={props.onToggleOpen.bind(this, marker)}
          onMouseOut={props.onToggleClose.bind(this, marker)}
          position={marker.position}
          key={marker.id}
        >
          {props.isOpen && <InfoWindow onMouseOut={props.onToggleClose}>
        <p>Hello</p>
      </InfoWindow>}
        </Marker>
      ))}
      </div>
  </GoogleMap>
));


// ReactDOM.render(<MyMapComponent isMarkerShown />, document.getElementById("root"));



class Breweries extends Component {
  state = {
    breweries: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBreweries();
  }

  loadBreweries = () => {
    API.getBreweries()
      .then(res =>
        this.setState({ breweries: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  // deleteBreweries = id => {
  //   API.deleteBreweries(id)
  //     .then(res => this.loadBreweries())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };



  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBrewery({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBreweries())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {

    return (
      <Container>

        <Row>
          <div id="background">
            <img src={background} style={{ width: "100%" }}/>
          </div>
            <Jumbotron>
              <h1>Breweries On My List</h1>
            </Jumbotron>
            <div id="map">
              <MapWithAMakredInfoWindow isMarkerShown />
            </div>
            {this.state.breweries.length ? (
              <List>
                {this.state.breweries.map(brewery => (
                  <ListItem key={brewery._id}>
                    <Link to={"/breweries/" + brewery._id}>
                      <strong>
                        {brewery.title} by {brewery.author}
                      </strong>
                    </Link>
                    
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        </Row>
      </Container>
    );
  }
}

export default Breweries;
