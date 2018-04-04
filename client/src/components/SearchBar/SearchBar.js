import React from "react";
import "./Nav.css";
import $ from "jquery";

const SearchBar = () => (
  <Row>
    <Col size="md-12">
      <form>
        <Container>
          <Row>
            <Col size="xs-9 sm-10">
              <Input
                name="recipeSearch"
                value={this.state.recipeSearch}
                onChange={this.handleInputChange}
                placeholder="Search For a Recipe"
              />
            </Col>
            <Col size="xs-3 sm-2">
              <Button
                onClick={this.handleFormSubmit}
                type="success"
                className="input-lg"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Container>
      </form>
    </Col>
  </Row>
);

export default SearchBar;