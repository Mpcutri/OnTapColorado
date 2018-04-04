const router = require("express").Router();
const breweriesController = require("../../controllers/breweriesController");

// Matches with "/api/breweryUpdate/:id" 
router
  .route("/:id")
  .get(breweriesController.findById)
  .delete(breweriesController.remove)
  .post(breweriesController.updateBreweryInfo)

module.exports = router;