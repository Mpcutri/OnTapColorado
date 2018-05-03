import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import UpdateBtn from "../../components/UpdateBtn";
import EditBtn from "../../components/EditBtn";
import API from "../../utils/API";
import "./Breweries.css";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
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

class Breweries extends Component {
  constructor(props) {
    super(props);
    this.togglePopOver = this.togglePopOver.bind(this);
    this.state = {
      currentBrewery: [],
      beers: [],
      id: null,
      name: null,
      type: null,
      abv: null,
      ibu: null,
      description: null,
      brewery: "",
      location: null,
      website: null,
      phone_number: null,
      onTap: false,
      modal: false,
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

  toggleEditBeerModal() {
    this.setState({
      modal1: !this.state.modal1
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
  componentDidMount() {
    this.loadBreweryInfo();
    console.log(this.state.currentBrewery)
  }

  // Web link to brewery in jumbotron
  handleClick = (e) => {
    e.preventDefault();
    window.location = this.state.website;
    console.log('Link to brewery URL clicked on Brewery Potal');
  }

  // Loads current brewery content on page load
  loadBreweryInfo = () => {
    API.getBrewery(this.props.match.params.id)
      .then(res => this.setState({ currentBrewery: res.data, beers: res.data.beer, id: res.data._id, brewery: res.data.brewery, location: res.data.location, website: res.data.website, phone_number: res.data.phone_number }))
      .catch(err => console.log(err));
  };
  
  // On tap/Off tap toggle
  toggleBeer = (index) => {
    console.log(index)
    if (this.state.beers[index].onTap) {
      this.state.beers[index].onTap = false
    } else {
      this.state.beers[index].onTap = true
    }
    console.log(this.state.beers)
    API.deleteBeer({ id: this.state.id}, this.state.beers)
      .then(res => this.loadBreweryInfo())
      .catch(err => console.log(err));
  };

  // Gets called when edit button on beer is clicked and populates update form with respective beers data
  updateBeer = (index) => {
    console.log(index)
    this.setState({
      name: this.state.beers[index].name,
      type: this.state.beers[index].type,
      abv: this.state.beers[index].abv,
      ibu: this.state.beers[index].ibu,
      description: this.state.beers[index].description,
      onTap: this.state.beers[index].onTap,
      id: this.state.beers[index].id
    });
    this.state.beers.splice(index, 1)
    console.log(this.state.beers)
    API.deleteBeer({ id: this.state.id}, this.state.beers)
      .then(res => this.loadBreweryInfo())
      .catch(err => console.log(err));
  };

  // Obvious
  deleteBeer = (index) => {
    console.log(index)
    this.state.beers.splice(index, 1)
    console.log(this.state.beers)
    API.deleteBeer({ id: this.state.id}, this.state.beers)
      .then(res => this.loadBreweryInfo())
      .catch(err => console.log(err));
  };

  // Gets called each time a text field is entered or changed and sets the state to the new value
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("Name: " + name + "  Value: " + value)
  };

  // Gets called on Beer Form submit and updates DB with new form values
  handleBeerFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.id)
    if (this.state.name) {

      API.saveBeer({
        name: this.state.name,
        type: this.state.type,
        abv: this.state.abv,
        ibu: this.state.ibu,
        description: this.state.description,
        onTap: this.state.onTap,
        id: this.state.id
      })
        .then(res => this.loadBreweryInfo())
        .catch(err => console.log(err));
    }
  };

  // Gets called on Brewery Form (inside modal) submit and updates DB with new form values
  handleBreweryFormSubmit = event => {
    event.preventDefault();
    this.toggle();
    API.updateBreweryInfo({
      brewery: this.state.brewery,
      location: this.state.location,
      website: this.state.website,
      phone_number: this.state.phone_number,
      id: this.state.id
    })
      .then(res => this.loadBreweryInfo())
      .catch(err => console.log(err));
    };

  handleClick = (e) => {
    e.preventDefault();
    window.location = this.state.brewery.website;
    console.log(this.state);
    console.log('The link was clicked on brewery portal.');
  }

  render() {
    return (
      <Container centered>
        <Row>
          <Col size="md-12" style={{ marginTop: "30px" }}>
            <Jumbotron>
              <Media>
                <Media left href="#">
                  {/* maybe try maxHeight and width if image upload doesn't fit in image div*/}
                <Media object src="http://www.beersearchparty.com/wp-content/uploads/2014/10/Our-Mutual-Friend.jpg" 
                        alt="Generic placeholder image" 
                        style={{height: "180px", width: "180", marginRight: "10px", marginBottom: "20px"}}/>      
                </Media>
                <Media body>
                  <Media heading>
                    <h1>
                      {this.state.currentBrewery.brewery}
                    </h1>
                  </Media>
                  <Media heading>
                    <p>
                      {this.state.currentBrewery.location}
                    </p>
                  </Media>
                  <Media>
                    <p>
                      {this.state.currentBrewery.phone_number}
                    </p>
                  </Media>
                  <Col size="md-1">
                  <div>
                    <Button size="sm" onClick={this.handleClick}>
                      Brewery Website
                    </Button>
                  </div>   
                  </Col>        
                </Media>

                <div>
                  <i class="material-icons" onClick={this.toggle}>
                    border_color
                  </i> 
                </div>

              </Media>
              <Modal 
                isOpen={this.state.modal} 
                toggle={this.toggle} 
                className={this.props.className} 
                backdrop={this.state.backdrop}>
                <ModalHeader toggle={this.toggle}>Update your Brewery Information</ModalHeader>
                  <ModalBody>
                  
                    <form>
                      <span style={{fontSize: 24, color: "black"}}>Brewery Name</span>
                      <Input
                        value={this.state.brewery}
                        onChange={this.handleInputChange}
                        name="brewery"
                        placeholder="Brewery Name (required)"
                      />
                      <span style={{fontSize: 24, color: "black"}}>Brewery Address</span>
                      <Input
                        value={this.state.location}
                        onChange={this.handleInputChange}
                        name="location"
                        placeholder="Location"
                      />
                      <span style={{fontSize: 24, color: "black"}}>Brewery Website</span>
                      <Input
                        value={this.state.website}
                        onChange={this.handleInputChange}
                        name="website"
                        placeholder="Website"
                      />
                      <span style={{fontSize: 24, color: "black"}}>Brewery Phone Number</span>
                      <Input
                        value={this.state.phone_number}
                        onChange={this.handleInputChange}
                        name="phone_number"
                        placeholder="Phone Number"
                      />   

                  {/*here goes the upload buttons*/}    
                  {/*logo image upload*/}
                  {/*jumbotron image upload*/}

                    </form>

                  </ModalBody>
                <ModalFooter>
                  <Button 
                    // disabled={!(this.state.brewery)} 
                    size="sm"
                    color="primary" 
                    onClick={this.handleBreweryFormSubmit}>Submit
                  </Button>
                </ModalFooter>
              </Modal>
            </Jumbotron>
          </Col>
        </Row>
      {/* End Jumbotron and Modal*/}
{/*-------------------------------------------------------------*/}
      <div>
        <Row>
            <Col size="md-1"/>
            <Col size="md-5 sm-12">
              <div>
                {console.log(this.state.currentBrewery)}
                {console.log(this.state.beers)}
                {this.state.beers.length ? (
              <div>
              <span style={{fontSize: 24, color: "black"}}>Currently On Tap:</span>
                {this.state.beers.map((beer, index) => (
                  beer.onTap ? (
                      <CardDeck className="brewery-card">
                        <Card key={beer.name} id={index} body width="100%">
                          <CardTitle><h2 id="onTapCard-h2">{beer.name}</h2></CardTitle>
                          <CardSubtitle>{beer.type}</CardSubtitle>
                          <CardText id="card-abv">&#9659; ABV:{beer.abv} &#9659; IBU:{beer.ibu}</CardText>
                          <div>
                            <Button size="sm" onClick={() => this.deleteBeer(index)} >delete</Button>{' '}
                            <Button size="sm" onClick={() => this.toggleBeer(index)} >move</Button>{' '}
                            <Button size="sm" onClick={() => this.updateBeer(index)} >edit</Button>{' '}
                          </div>
                        <div>  
                        <Modal 
                            isOpen={this.state.modal1} 
                            toggle={this.toggleEditBeerModal} 
                            className={this.props.className} 
                            backdrop={this.state.backdrop}>
                          <ModalHeader toggle={this.toggleEditBeerModal}><h1>Add a beer to your tap list!</h1></ModalHeader>
                            <ModalBody>
                              <form style={{backgroundColor: "rbga(0,0,0,0.1)"}}>
                                <Input
                                  value={this.state.name}
                                  onChange={this.handleInputChange}
                                  name="name"
                                  placeholder="Name (required)"
                                />
                                <Input
                                  value={this.state.type}
                                  onChange={this.handleInputChange}
                                  name="type"
                                  placeholder="Type"
                                />
                                <Input
                                  value={this.state.abv}
                                  onChange={this.handleInputChange}
                                  name="abv"
                                  placeholder="ABV"
                                />
                                <Input
                                  value={this.state.ibu}
                                  onChange={this.handleInputChange}
                                  name="ibu"
                                  placeholder="IBUs"
                                />
                                <TextArea
                                  value={this.state.description}
                                  onChange={this.handleInputChange}
                                  name="description"
                                  placeholder="Description"
                                  style={{height: 200}}
                                />
                                <FormBtn
                                  disabled={!(this.state.name)}
                                  onClick={this.handleBeerFormSubmit}
                                >
                                  Add/Update Beer
                                </FormBtn>
                              </form>
                            </ModalBody>
                          </Modal>
                          </div>
                        </Card>
                      </CardDeck>
                  ) : ("")
                ))}
              </div>
              ) : (
              <h3>No Results to Display</h3>
              )}
              </div>
              </Col>
              
              <Col size="md-5 sm-12">
              <div>
              <span style={{fontSize: 24, color: "black"}}>Inventory Not on Tap:</span>
              <List>
                {this.state.beers.map((beer, index) => (
                  !beer.onTap ? (
                      
                      <CardDeck className="brewery-card">
                        <Card key={beer.name} id={index} body width="100%">
                          <CardTitle><h2 id="onTapCard-h2">{beer.name}</h2></CardTitle>
                          <CardSubtitle>{beer.type}</CardSubtitle>
                          <CardText id="card-abv">&#9659; ABV:{beer.abv} &#9659; IBU:{beer.ibu}</CardText>
                          <div>
                            <Button size="sm" onClick={() => this.deleteBeer(index)} >delete</Button>{' '}
                            <Button size="sm" onClick={() => this.toggleBeer(index)} >move</Button>{' '}
                            <Button size="sm" onClick={() => this.updateBeer(index)} >edit</Button>{' '}
                          </div>

                        </Card>
                      </CardDeck>
                   
                  ) : ("")
                ))}
                </List>
                </div>
            
          </Col>
          
        </Row>
      </div>
{/*-------------------------------------------------------------*/}
      </Container>
    );
  }
}

export default Breweries;
