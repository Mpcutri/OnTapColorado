import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import UpdateBtn from "../../components/UpdateBtn";
import EditBtn from "../../components/EditBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

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
              
              <Col size="md-6">
                <h1>{this.state.currentBrewery.brewery}</h1>
                <p>
                  <a onClick={this.handleClick}>
                      {this.state.currentBrewery.website}
                  </a>
                </p>
              </Col>
              <Col size="md-6">
                <h2>{this.state.currentBrewery.location}</h2>
                <p>{this.state.currentBrewery.phone_number}</p>
              </Col>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add a beer to your tap list!</h1>
            </Jumbotron>
            <form>
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
            <Jumbotron>
              <h1>Beers On My List</h1>
            </Jumbotron>
            {console.log(this.state.currentBrewery)}
            {console.log(this.state.beers)}
            {this.state.beers.length ? (
              <div>
              <List>On Tap:
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
              <List>Not On Tap:
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
            <Jumbotron>
              <h1>Update your Brewery Information</h1>
            </Jumbotron>
            <form>
              Brewery Name
              <Input
                value={this.state.brewery}
                onChange={this.handleInputChange}
                name="brewery"
                placeholder="Brewery Name (required)"
              />
              Brewery Address
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location"
              />
              Brewery Website
              <Input
                value={this.state.website}
                onChange={this.handleInputChange}
                name="website"
                placeholder="Website"
              />
              Brewery Phone Number
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
      </Container>
    );
  }
}

export default Breweries;
