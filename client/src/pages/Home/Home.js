import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import logoImage from "./images/onTapColoradoFlag.png";
import LoginStatus from "../../components/LoginStatus";
import SearchBar from "../../components/SearchBar";
import Background from "../../images/bobRossMountain.jpg";
import ContactBtn from "../../components/ContactBtn";
import Logo from "../../components/Logo";
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
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import "./Home.css";
import { Button } from 'reactstrap';
import ScrollToTop from "react-scroll-up";
import whiteArrow from "../../images/whiteArrow.png";
import Flag from "../../images/blurryFlag.png";
// import ReactCursorPosition from 'react-cursor-position';
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

class Breweries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breweries: [],
      beers: [],
      types: [],
      position: {
        x: 0,
        y: 0
      }
    }
  }

  componentDidMount() {
    // this.loadBreweries();
  };

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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    this.loadBeers();
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
          console.log(marker.brewery)
          console.log('Go to the marker post page')
          window.location = '/breweries/' + marker.breweryURL;
        },
        showInfo: () => (marker) => {
          $("#infoBox").show()
          $("#infoBox").css({ backgroundColor: `white`, color: "black", padding: `12px`, position: "absolute", left: "60%", bottom: "40%"})
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
      <GoogleMap defaultZoom={13} defaultCenter={{ lat: 39.7393, lng: -104.9848 }}>
        {props.isMarkerShown && (
          <div>
            <div id="infoBox">
              <p id="infoText"></p>
            </div>
            {this.props.breweries.map(brewery => (
              <div key={brewery.id}>
                {brewery.position ? (
                  <Marker
                    onClick={props.onMarkerClick.bind(this, brewery)}
                    onMouseOver={props.showInfo.bind(this, brewery)}
                    onMouseOut={props.hideInfo.bind(this, brewery)}
                    key={brewery.id}
                    className={brewery.id}
                    position={brewery.position}
                  >
                  </Marker>
                ) : ("")}
              </div>
            ))}
          </div>
        )}
      </GoogleMap>
    ));
    return (
      <div>
        <Logo style={{position: "absolute"}} />

        <div id="scrollButton" style={{ position: "relative", zIndex: "5" }}>   
          <ScrollToTop id="scroll-button" showUnder={160} style={{ marginBottom: "70px"}}>
            <span style={{ backgroundColor: "rgba(136, 135, 135, 0.65)", padding: "20px", borderRadius: '10px' }}><img style={{ height: "25px", width: "25px" }} src={whiteArrow} /></span>
          </ScrollToTop>
        </div>

        <div id="contact-button-home">
          <ContactBtn />
        </div>

        <div style={{ position: "relative" }}>
          <Container>
            
                <div id="map" style={{ position: "relative", marginTop: "30px" }}>
                  <MyMapComponent isMarkerShown />
                </div>
         
          </Container>
        </div>
        <Container>
          <Col size="md-6">
              {console.log(this.props.breweries)}
              {this.props.breweries.length ? (
                <div className="brewery-list" style={style.breweryList}>
                  <List>
                    {this.props.breweries.map(brewery => (
                      brewery.position ? (
                        <ListItem key={brewery._id}>
                          <Link onClick={this.forceUpdate} to={"/breweries/" + brewery.breweryURL}>
                            <strong>
                              {brewery.brewery}
                            </strong>
                          </Link>
                        </ListItem>
                      ) : ("")
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
        <div className="listbackground">
          <Container>
            <Col size="md-6">
                {console.log(this.state.breweries)}
                {console.log(this.state.beers)}
                {this.state.breweries.length ? (
                  <div className="brewery-list" style={style.breweryList}>
                    <List>
                      {this.state.breweries.map(brewery => (
                        <ListItem key={brewery._id}>
                          <Link onClick={this.forceUpdate} to={"/breweries/" + brewery.brewery}>
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
              <div className="info-list" style={style.breweryList}>
                <p>whatevewhatever
                </p>
              </div>
            </Col>
          </Container>
        </div>
      </div>
    );
  }
}

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//     "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3o7dy50LdekZi5WmxFMHbVK690D3KeKQ&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `95%` }} />,
//     containerElement: <div style={{ height: `700px` }} />,
//     mapElement: <div style={{ height: `95%` }} />
//   }),   
//   withStateHandlers(() => ({
//     isOpen: false,
//   }), {
//     onToggleOpen: ({ isOpen }) => () => ({
//       isOpen: !isOpen,
//     })
//     // onToggleOpen: ( obj ) => (brewery) => {
//     //   console.log(obj);
//     //   console.log("brewery");
//     //   console.log(brewery);
//     //   // obj.isOpen = !obj.isOpen;
//     // }
//     // onToggleOpen: (brewery) => () => {
//     //   // isOpen: !isOpen,
//     //   console.log(brewery);
//   }),
//   withHandlers({
//     onMarkerClick: () => (marker) => {
//       console.log(marker)
//       console.log('Go to the marker post page')
//       window.location = '/breweries/' + marker.id;
//     },
//     showInfo: () => (marker) => {
//       $("#infoBox").show()
//       $("#infoText").text(marker.brewery)
//     },
//     hideInfo: () => (marker) => {
//       $("#infoBox").hide()
//       $("#infoText").text("")
//     }
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props =>
//   <GoogleMap defaultZoom={13} defaultCenter={{ lat: 39.7393, lng: -104.9848 }} style={{ position: "relative" }}>

// {props.isMarkerShown && (
//       <div>
//         {console.log(dyMark)}
//         {markers.map(brewery => (
//         <div>
//         <Marker
//           onClick={props.onMarkerClick.bind(this, brewery)}
//           onMouseOver={props.onToggleOpen.bind(this, brewery)}
//           onMouseOut={props.hideInfo.bind(this, brewery)}
//           key={brewery.id}
//           className={brewery.id}
//           position={brewery.position}
//         >
//           {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
//             <p>
//               {brewery.title}
//               {console.log(brewery)}
//             </p>
//             </InfoWindow>
//           }
//         </Marker>
//       </div>
//       ))}

//       </div>

//     )}

//   </GoogleMap>
// );




export default Breweries;