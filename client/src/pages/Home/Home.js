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
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

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
];

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
        <div id="infoBox" style={{ backgroundColor: `white`, color: "black", padding: `12px`, position: "absolute", left: "60%", bottom: "-30%" }}>
          <p id="infoText"></p>
        </div>

        {props.isMarkerShown && (
          <div>
            
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

class Breweries extends Component {
  state = {
    breweries: []
  };

  componentDidMount() {
    this.loadBreweries();


  }

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

        <Row>
          <div id="background">
            <img src={background} style={{ width: "100%" }}/>
          </div>
            <Jumbotron>
              <h1>Breweries On My List</h1>
            </Jumbotron>
            <div id="map">
              <MyMapComponent isMarkerShown />
            </div>
            {this.state.breweries.length ? (
              <List>
                {this.state.breweries.map(brewery => (
                  <ListItem key={brewery._id}>
                    <Link to={"/breweries/" + brewery._id}>
                      <strong>
                        {brewery.local.brewery}
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