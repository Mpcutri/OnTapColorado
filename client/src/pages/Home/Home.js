import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
// import { initMap } from "../../components/Map/gMap.js";

// import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

var markers = [
{
  position: {lat: -34.397, lng: 150.644},
  title: 'Our Mutual Friend',
  url: "http://www.google.com/",
  id: "OurMutualFriend"
},
{
  position: {lat: -34.497, lng: 150.744},
  title: 'Ratio Beerworks',
  url: "http://www.google.com/",
  id: "RatioBeerworks"
}
]

const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3o7dy50LdekZi5WmxFMHbVK690D3KeKQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),   
  withHandlers({
    onMarkerClick: () => (marker) => {
      console.log(marker.id)
      console.log('Go to the marker post page')
      window.location = '/breweries/' + marker.id;
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      <div>
        {markers.map(marker => (
        <Marker
          onClick={props.onMarkerClick.bind(this, marker)}
          key={marker.id}
          className={marker.id}
          position={marker.position}
        />
      ))}
      </div>

    )}
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
      <Container fluid>

        <Row>
            <Jumbotron>
              <h1>Breweries On My List</h1>
            </Jumbotron>
            <div id="map">
            <MyMapComponent isMarkerShown />, document.getElementById("map")
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
