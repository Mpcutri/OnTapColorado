import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Breweries extends Component {
  state = {
    brewery: [],
    beers: [],
    id: null,
    name: null,
    type: null,
    abv: null,
    ibu: null,
    description: null
  };

  componentDidMount() {
    this.loadBreweryInfo();
    console.log(this.state.brewery)
  }

  loadBreweries = () => {
    API.getBreweries()
      .then(res =>
        this.setState({ brewery: res.data })
      )
      .catch(err => console.log(err));
  };

  loadBreweryInfo = () => {
    API.getBrewery(this.props.match.params.id)
      .then(res => this.setState({ brewery: res.data, beers: res.data.beer, id: res.data._id }))
      .catch(err => console.log(err));
  };

  deleteBeer = (index) => {
    console.log(index)
    this.state.beers.splice(index, 1)
    console.log(this.state.beers)
    API.updateBrewery({ id: this.state.id}, this.state.beers)
      .then(res => this.loadBreweryInfo())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.id)
    if (this.state.name) {
      API.saveBeer({
        name: this.state.name,
        type: this.state.type,
        abv: this.state.abv,
        ibu: this.state.ibu,
        description: this.state.description,
        id: this.state.id
      })
        .then(res => this.loadBreweryInfo())
        .catch(err => console.log(err));
    }
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
              <img src={this.state.brewery.img}
                <h1>{this.state.brewery.brewery}</h1>
                <p>
                  <a onClick={this.handleClick}>
                      {this.state.brewery.website}
                  </a>
                </p>
              </Col>
              <Col size="md-6">
                <h2>{this.state.brewery.location}</h2>
                <p>{this.state.brewery.phone_number}</p>
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
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.abv)}
                onClick={this.handleFormSubmit}
              >
                Add Beer
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Beers On My List</h1>
            </Jumbotron>
            {console.log(this.state.brewery)}
            {console.log(this.state.beers)}
            {this.state.beers.length ? (
              <List>
                {this.state.beers.map((beer, index) => (
                  <ListItem key={beer.name} id={index}>
                    <Link to={"/breweries/" + beer.name}>
                      <strong>
                        {beer.name}
                        {console.log(beer.name)}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBeer(index)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Breweries;
