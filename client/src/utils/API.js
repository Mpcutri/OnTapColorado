import axios from "axios";

export default {
  // Gets all breweries
  getBreweries: function() {
    return axios.get("/api/breweries");
    
  },
  // Gets the brewery with the given id
  getBrewery: function(breweryURL) {
    return axios.get("/api/breweries/" + breweryURL);
  },

  saveBrewery: function(breweryData) {
    return axios.post("/api/breweries", breweryData);
  },

  saveBeer: function(beerData) {
    console.log(beerData)
    return axios.post("/api/breweries/" + beerData.id, beerData);
  },

  //deletes a beer from the brewery array
  deleteBeer: function(id, beers) {
    console.log(id)
    console.log(beers)
    return axios.post("/api/admin/" + id.id, beers);
  },

  updateBreweryInfo: function(breweryInfo) {
    console.log(breweryInfo)
    return axios.post("/api/breweryUpdate/" + breweryInfo.id, breweryInfo);
  },


// search bar implementation
  getBeers: function(query) {
    return axios.get("/api/", { params: { q: query } });
  }


};
