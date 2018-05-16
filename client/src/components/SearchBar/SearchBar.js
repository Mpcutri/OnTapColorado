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

	// handleFormSubmit = event => {
	// // When the form is submitted, prevent its default behavior, get recipes update the recipes state
	// 	event.preventDefault();
	// 	console.log(";lkadsjf;liadsjf;lkdsa;lkdss")
	// 	this.searchBeers(this.state.search);
	// 	// API.getBreweries(this.state.search)
	// 	//   .then(res => this.setState({ BrewerySearchResults: res.data }))
	// 	//   .catch(err => console.log(err));
	// };

	searchBeers = (search) => {
		this.props.breweries.map(brewery => (
			this.state.search === brewery.brewery ? (
				this.state.brewerySearchResults.push(brewery)
			) : ("")
		))
		this.props.beers.map(beer => (
			this.state.search === beer.name ? (
				this.state.beerSearchResults.push(beer)
			) : (""),
			this.state.search === beer.type ? (
				this.state.typeSearchResults.push(beer)
			) : ("")
		))
		console.log(this.state.brewerySearchResults)
		console.log(this.state.beerSearchResults)
		console.log(this.state.typeSearchResults)
	};


		render() {
			console.log(this.props)
			// console.log(Breweries.state.beers);
			return (
				<div>
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
			  <button id="click-me-button" onClick={this.searchBeers}>CLICK ME!!</button>
			  </div>
			);
		}
}