import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

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
  state = {
    brewery: "",
    beers: []
  };
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
    console.log('The link was clicked.');
  }

  render() {
    return (
      <Container fluid>
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
                <a 
                  onClick={this.handleClick}>
                  {this.state.brewery.website}
                </a>
              </p>
            </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Brews currently on tap</h1>
            </article>
            {this.state.beers.length ? (
              <div className="brewery-list" style={style.breweryList}>
                <List>
                  {this.state.beers.map(beer => (
                    <ListItem key={beer._id}>
                      <Row>
                        <Col size="md-5 md-offset-1">
                          <strong>
                          <h2>
                            {beer.name}
                          </h2>
                          </strong>
                          <p>
                            Type: {beer.type}
                          </p>
                          <p>
                            ABV: {beer.abv}
                          </p>
                          <p>
                            IBU: {beer.ibu}
                          </p>
                        </Col>
                        <Col size="md-5 md-offset-1">
                          <strong>
                          <p>
                            Description
                          </p>
                          </strong>
                          <p>
                            {beer.description}
                          </p>
                        </Col>
                      </Row>
                      
                    </ListItem>
                  ))}
                </List>
              </div>
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
