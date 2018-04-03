import axios from "axios";

export default {
  // Gets all breweries
  getBreweries: function() {
    return axios.get("/api/breweries");
  },
  // Gets the brewery with the given id
  getBrewery: function(id) {
    return axios.get("/api/breweries/" + id);
  },
  // Deletes the brewery with the given id
  deleteBeer: function(id, name) {
    console.log(id)
    console.log(name)
    return axios.put("/api/breweries/" + id, name);
  },
  // Saves a brewery to the database
  saveBrewery: function(breweryData) {
    return axios.post("/api/breweries", breweryData);
  },

  saveBeer: function(beerData) {
    console.log(beerData)
    return axios.post("/api/breweries/" + beerData.id, beerData);
  }
};
