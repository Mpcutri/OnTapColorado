import React from "react";
import "./SearchBar.css";
import API from "../../utils/API.js";	
import Breweries from "../../pages/Home";


export default class SearchBar extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      brewerySearchResults: [],
      beerSearchResults: [],
      typeSearchResults: [],
      search: ""
    };
  }


	handleInputChange = event => {
	    // Destructure the name and value properties off of event.target
	    // Update the appropriate state
	    const { name, value } = event.target;
	    this.setState({
	      [name]: value
	    });
	  };

	// searchBeers = () => {
 //    	Breweries.state.beer.map(beer => (
 //    		console.log()
 //        	this.state.beerSearchResults.push(beer)
 //    	))
 // 	};

	  // handleFormSubmit = event => {
	  //   // When the form is submitted, prevent its default behavior, get recipes update the recipes state
	  //   event.preventDefault();
	  //   this.searchBeers(this.state.search);
	  //   // API.getBreweries(this.state.search)
	  //   //   .then(res => this.setState({ BrewerySearchResults: res.data }))
	  //   //   .catch(err => console.log(err));
	  // };


		render() {
			// console.log(Breweries.state.beers);
			return (
			  <div id="wrap">
			    <form action="" autoComplete="on">
			    	<input
				      	id="search"
				      	name="search"
				      	type="text"
				      	onChange={this.handleInputChange}
				      	placeholder="Search for brewery, beer, type. . ."
			      	/>
			      	<input id="search_submit" type="submit" />
			    </form>
			  </div>
			);
		}
	}