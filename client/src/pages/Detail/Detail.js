import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import "./Detail.css";
import {render} from 'react-dom';
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
// import {ScrollArea} from'react-scrollbar';
import { TextArea, FormBtn } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { Card, 
          CardImg, 
          CardText, 
          CardBody, 
          CardDeck,
          CardTitle, 
          CardSubtitle, 
          Button, 
          Modal, 
          ModalHeader, 
          ModalBody, 
          ModalFooter, 
          Form, 
          FormGroup, 
          Label, 
          Input, 
          FormText,
          Media,
          Popover, 
          PopoverHeader, 
          PopoverBody } from 'reactstrap';

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

class Detail extends Component {
  constructor(props) {
    super(props);
    this.togglePopOver = this.togglePopOver.bind(this);
    this.state = {
      brewery: "",
      beers: [],
      modal: false,
      // when true backdrop goes black
      // when false backdrop stays with no shade, but then is not clickable for 
        // dismiss of modal and shadow on modal is way bigger than the modal in details
        // backdrop needs to be clickable or we need a cancel button on the modal
      backdrop: false,
      popoverOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  // Modal on/off
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  togglePopOver() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  // Gets called on Beer Form submit and updates DB with new form values
  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  // When page loads
  // When this component mounts, grab the brewery with the _id of this.props.match.params.id
  // e.g. localhost:3000/breweries/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBrewery(this.props.match.params.id)
      .then(res => this.setState({ brewery: res.data, beers: res.data.beer }))
      .catch(err => console.log(err));
  } 

  // Web link to brewery in jumbotron
  handleClick = (e) => {
    e.preventDefault();
    window.location = this.state.brewery.website;
    console.log('Link to brewery URL clicked on Details');
  }
  // // Gets called each time a text field is entered or changed and sets the state to the new value
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  //   console.log("Name: " + name + "  Value: " + value)
  // };

  // Gets called on Notification Form submit and updates DB with new form values
  handleNotificationFormSubmit = event => {
    event.preventDefault();
    this.toggle();
    // API.notificationFormSubmit({
    //   email: this.state.email,
    //   phone: this.state.phone,
    //   id: this.state.id
    // })
    //   .then(res => this.loadBreweryInfo())
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        {/* Jumbotron */}
        <Row>
          <Col size="md-12" style={{ marginTop: "30px" }}>
            <Jumbotron>
              <Media>
                <Media left href="#">
                  {/* maybe try maxHeight and width if image upload doesn't fit in image div*/}
                <Media object src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=200&h=200" 
                        alt="Generic placeholder image" 
                        style={{height: "220px", width: "300", marginRight: "10px"}}/>      
                </Media>
                <Media body>
                  <Media heading>
                    <h1>
                      {this.state.brewery.brewery}
                    </h1>
                  </Media>
                  <Media heading>
                    <p>
                      {this.state.brewery.location}
                    </p>
                  </Media>
                  <Media>
                    <p>
                      {this.state.brewery.phone_number}
                    </p>
                  </Media>
                  <p>
                    <Button onClick={this.handleClick}>
                      Brewery Website
                    </Button>
                  </p>
                </Media>
              </Media>
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
                      <Card key={beer._id}>
                        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                        <CardBody>
                          <CardTitle><h2>{beer.name}</h2></CardTitle>
                          <CardSubtitle><h4>{beer.type}</h4></CardSubtitle>
                          <CardText>&#9632; ABV:{beer.abv} &#9632; IBU:{beer.ibu}</CardText>
                          <CardText>{beer.description}</CardText>
                          <span>
                            <Button color="primary" id="pop-over" onClick={this.togglePopOver}>Description</Button>
                            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="pop-over" toggle={this.togglePopOver}>
                              <PopoverHeader>Popover Title</PopoverHeader>
                              <PopoverBody>{beer.description}</PopoverBody>
                            </Popover>
                          </span>
                          {/* Opens modal */}
                          <Button color="primary" onClick={this.toggle}>
                            Notifications
                          </Button>
                          
                          {/* Actual modal */}
                          <Modal 
                            isOpen={this.state.modal} 
                            toggle={this.toggle} 
                            className={this.props.className} 
                            backdrop={this.state.backdrop}>
                            <ModalHeader toggle={this.toggle}>How would you like to be notified?</ModalHeader>
                              <ModalBody>

                                <form>
                                  <span style={{fontSize: 24, color: "black"}}>Email</span>
                                    <Input
                                      // value={this.state.email}
                                      // onChange={this.handleInputChange}
                                      name="brewery"
                                      placeholder="Email"
                                    />
                                  <span style={{fontSize: 24, color: "black"}}>Text</span>
                                    <Input
                                      // value={this.state.text}
                                      // onChange={this.handleInputChange}
                                      name="brewery"
                                      placeholder="Text"
                                    />
                                </form>
                              </ModalBody>

                            <ModalFooter>
                              <Button 
                                color="primary" 
                                onClick={this.handleNotificationFormSubmit}>Submit
                              </Button>
                            </ModalFooter>

                          </Modal>
                        </CardBody>
                      </Card>
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
