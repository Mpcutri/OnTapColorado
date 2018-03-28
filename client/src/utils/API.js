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
  deleteBrewery: function(id) {
    return axios.delete("/api/breweries/" + id);
  },
  // Saves a brewery to the database
  saveBrewery: function(breweryData) {
    return axios.post("/api/breweries", breweryData);
  }
};
