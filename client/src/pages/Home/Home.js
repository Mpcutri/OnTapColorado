import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

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
