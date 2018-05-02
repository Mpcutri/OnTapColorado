const db = require("../models");

// Defining methods for the breweriesController
module.exports = {

  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ brewery: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findBeer: function(req, res) {
    db.User.beer
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Brewery
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log(req.params.id)
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$push:{ beer: req.body }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateBrewery: function(req, res) {
    console.log("reqbody: ", req.body)
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$set:{ beer: req.body }} )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log(req.params.id)
    console.log(req.name)
    db.User
      .findOneAndRemove( { beer: "kj" } )
      .where( { _id: req.params.id } )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateBreweryInfo: function(req, res) {
    console.log("reqbody: ", req.body)
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$set:{ brewery: req.body.brewery, location: req.body.location, website: req.body.website, phone_number: req.body.phone_number }} )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
