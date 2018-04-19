import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import UpdateBtn from "../../components/UpdateBtn";
import EditBtn from "../../components/EditBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { TextArea, FormBtn } from "../../components/Form";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//DND
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
// import InlineEdit from 'react-edit-inline';

class Breweries extends Component {
  state = {
    currentBrewery: [],
    beers: [],
    id: null,
    name: null,
    type: null,
    abv: null,
    ibu: null,
    description: null,
    brewery: null,
    location: null,
    website: null,
    phone_number: null,
    onTap: false
  };
  

  componentDidMount() {
    this.loadBreweryInfo();
    console.log(this.state.currentBrewery)
  }

  loadBreweryInfo = () => {
    API.getBrewery(this.props.match.params.id)
      .then(res => this.setState({ currentBrewery: res.data, beers: res.data.beer, id: res.data._id, brewery: res.data.brewery, location: res.data.location, website: res.data.website, phone_number: res.data.phone_number }))
      .catch(err => console.log(err));
  };

  deleteBeer = (index) => {
    console.log(index)
    this.state.beers.splice(index, 1)
    console.log(this.state.beers)
    API.deleteBeer({ id: this.state.id}, this.state.beers)
      .then(res => this.loadBreweryInfo())
      .catch(err => console.log(err));
  };

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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("Name: " + name + "  Value: " + value)
  };

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

  handleBreweryFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.id)
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
    console.log('The link was clicked on bwerery portal.');
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.currentBrewery.brewery}
              </h1>
              <p>
                {this.state.currentBrewery.location}
              </p>
              <p>
                {this.state.currentBrewery.phone_number}
              </p>
              <p>
                <Button onClick={this.handleClick}>
                  Brewery Website
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">

              <h1>Add a beer to your tap list!</h1>

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
          </Col>
          <Col size="md-6 sm-12">

              <h1>Beers List</h1>

            {console.log(this.state.currentBrewery)}
            {console.log(this.state.beers)}
            {this.state.beers.length ? (
              <div>
              <List><span style={{fontSize: 24, color: "black"}}>On Tap:</span>
                {this.state.beers.map((beer, index) => (
                  beer.onTap ? (
                      <ListItem key={beer.name} id={index}>
                          <span style={{fontSize: 20}}>
                            {beer.name}
                            {console.log(beer.name)}
                          </span>
                        <DeleteBtn onClick={() => this.deleteBeer(index)} />
                        <UpdateBtn onClick={() => this.toggleBeer(index)} />
                        <EditBtn onClick={() => this.updateBeer(index)} />
                      </ListItem>
                  ) : ("")
                ))}
              </List>
              <List><span style={{fontSize: 24, color: "black"}}>Not On Tap:</span>
                {this.state.beers.map((beer, index) => (
                  !beer.onTap ? (
                      <ListItem key={beer.name} id={index}>
                          <span style={{fontSize: 20}} >
                            {beer.name}
                            {console.log(beer.name)}
                          </span>
                        <DeleteBtn onClick={() => this.deleteBeer(index)} />
                        <UpdateBtn onClick={() => this.toggleBeer(index)} />
                        <EditBtn onClick={() => this.updateBeer(index)} />
                          
                      </ListItem>
                  ) : ("")
                ))}
                </List>
                </div>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-6">

              <h1>Update your Brewery Information</h1>

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
              <FormBtn
                disabled={!(this.state.brewery)}
                onClick={this.handleBreweryFormSubmit}
              >
                Update Info
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          {/* Draggable card for brewery inventory list and on tap list */}
          <div>
            <DragDropContainer>
              <Card body width="100%">
                <CardTitle>beer.name</CardTitle>
                <CardText>Type: beer.type &#9632; ABV: beer.abv &#9632; IBU:beer.ibu</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
            </DragDropContainer>
          </div>
        </Row>
      </Container>
    );
  }
}

export default Breweries;
