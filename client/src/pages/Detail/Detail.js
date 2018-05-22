import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import "./Detail.css";
import {render} from 'react-dom';
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import { TextArea, FormBtn } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import ExpandText from 'react-expand-text';
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
          Media } from 'reactstrap';

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
    this.state = {
      brewery: "",
      beers: [],
      modal: false,
      // when background true backdrop goes black
      // when background false backdrop stays with no shade, but then is not clickable for 
        // dismiss of modal and shadow on modal is way bigger than the modal in details
        // backdrop needs to be clickable or we need a cancel button on the modal
      backdrop: false,
      description: null,
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
    API.getBrewery(this.props.match.params.breweryURL)
      .then(res => this.setState({ brewery: res.data[0], beers: res.data[0].beer }))
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
      <Container centered>
        {/* Jumbotron */}
        <Row>
          <Col size="md-12" style={{ marginTop: "30px", marginBottom: "30px" }}>
            <Jumbotron>
                  {/*jumbotron image needs to be dynamic to brewery info jumbo background upload*/}
              <Media>
                <Media left href="#">
                  {/*logo image in jumbotron needs to be dynamic to brewery info image upload*/}
                  {/* maybe try maxHeight and width if image upload doesn't fit in image div*/}
                <Media object src="http://www.beersearchparty.com/wp-content/uploads/2014/10/Our-Mutual-Friend.jpg" 
                        alt="Generic placeholder image" 
                        style={{height: "180px", width: "180", marginRight: "10px", marginBottom: "20px"}}/>      
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
                    <Button  size="sm" onClick={this.handleClick}>
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
          <Col size="md-12">
            <article id="beerList-header">
              <h1>On Tap Right Now!!!</h1>
            </article>
            {this.state.beers.length ? (
              <CardDeck className="detail-card">
                  {this.state.beers.map(beer => (                     
                    <Col size="sm-12 md-6 lg-6">

                      <Card size="col-sm-12 col-md-12 col-lg-6" key={beer._id} id="card-width">
                      {/* commented out until made dynamic to image upload on brewery edit button
                            and not even sure it should be here at all. Maybe a circular icon size image like twitter instead.
                        <CardImg top width="100%" src="https://www.drinkpreneur.com/wp-content/uploads/2017/04/drinkpreneur_2016-01-26-1453821995-8643361-beermain.jpg" alt="Card image cap" />
                      */}
                        <CardBody>
                          <CardTitle><h2 id="card-h2">{beer.name}</h2></CardTitle>
                          <CardSubtitle>{beer.type}</CardSubtitle>
                          <CardText id="card-abv">&#9659; ABV:{beer.abv} &#9659; IBU:{beer.ibu}</CardText>
                          <CardText id="card-description">
                            <ExpandText
                              text={beer.description}
                              className="my-css-class"
                              maxLength={200}
                            />
                          </CardText>
                          <CardText style={{color: "grey"}}>Click text for full description &#9663;</CardText>
                        {/* Opens modal */}
                          <Button id="card-button" size="sm" color="primary" onClick={this.toggle}>
                            Be Notified!
                          </Button>
                        {/* Card notification modal */}
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

                            {/* checkboxes are not wired up to anything yet*/}
                              <form>
                                <div id="modalForm-checkHeader">When would you like to be notified?</div>
                                <FormGroup check>
                                  <Label check>
                                    <Input 
                                      // value={this.state.email}
                                      // onChange={this.handleInputChange}
                                      type="checkbox" />{' '}
                                      When it goes on tap
                                  </Label>
                                </FormGroup>
                                <FormGroup check id="form-check">
                                  <Label check>
                                    <Input 
                                      // value={this.state.email}
                                      // onChange={this.handleInputChange}
                                      type="checkbox" />{' '}
                                      When it goes off tap
                                  </Label>
                                </FormGroup>
                              </form> 

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








