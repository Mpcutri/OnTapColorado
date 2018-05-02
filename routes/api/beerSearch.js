const router = require("express").Router();
const breweriesController = require("../../controllers/breweriesController");

// Matches with "/api/admin"
router.route("/")
  .get(breweriesController.findAll)

// Matches with "/api/admin/:id" 
router.route("/:id")
  .get(breweriesController.findById)
  .get(breweriesController.findBeer)

module.exports = router;