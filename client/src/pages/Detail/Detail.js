import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
//Cards
import { Card, CardImg, CardText, CardBody, CardDeck,
  CardTitle, CardSubtitle, Button, Modal, ModalHeader, 
  ModalBody, ModalFooter } from 'reactstrap';
//DND
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
//Sortable
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import "./Detail.css";

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
//Modal
// class ModalExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: false
//     };

//     this.toggle = this.toggle.bind(this);
//   }

//   toggle() {
//     this.setState({
//       modal: !this.state.modal
//     });
//   }
// }

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      brewery: "",
      beers: [],
      backdrop: true,
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  // When this component mounts, grab the brewery with the _id of this.props.match.params.id
  // e.g. localhost:3000/breweries/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBrewery(this.props.match.params.id)
      .then(res => this.setState({ brewery: res.data, beers: res.data.beer }))
      .catch(err => console.log(err));
  } 

  handleClick = (e) => {
    e.preventDefault();
    window.location = this.state.brewery.website;
    console.log('Link to brewery URL has been clicked.');
  }

  render() {
    return (
      <Container fluid>
        {/* Jumbotron */}
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.brewery.brewery}
              </h1>
              <p>
                {this.state.brewery.location}
              </p>
              <p>
                {this.state.brewery.phone_number}
              </p>
              <p>
                <Button onClick={this.handleClick}>
                  Brewery Website
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        {/* Beers on tap list*/}
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>On Tap Right Now!!!</h1>
            </article>
            {this.state.beers.length ? (
              <CardDeck>
                  {this.state.beers.map(beer => (                     
                    <Col size="sm-3">
                        <DragDropContainer>
                          <Card key={beer._id}>
                            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <CardBody>
                              <CardTitle>{beer.name}</CardTitle>
                              <CardSubtitle>{beer.type}</CardSubtitle>
                              <CardText>&#9632; ABV:{beer.abv} &#9632; IBU:{beer.ibu}</CardText>
                              <CardText>{beer.description}</CardText>
                              {/* Notification button opens modal */}
                              <Button color="primary" onClick={this.toggle}>Notifications</Button>
                              {/* Actual modal */}
                              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                                <ModalBody>
                                {/* Form goes here*/}
                                form goes here for user to enter in email or phone # to be notified of state change - inventory > on tap
                                </ModalBody>
                                <ModalFooter>
                                  <Button color="primary" onClick={this.toggle}>Submit</Button>
                                </ModalFooter>
                              </Modal>
                            </CardBody>
                          </Card>
                        </DragDropContainer>
                    </Col>
                  ))}

              </CardDeck>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
