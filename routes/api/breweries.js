const router = require("express").Router();
const breweriesController = require("../../controllers/breweriesController");

// Matches with "/api/breweries"
router.route("/")
  .get(breweriesController.findAll)
  .post(breweriesController.create);

// Matches with "/api/breweries/:id" 
router
  .route("/:breweryURL")
  .get(breweriesController.findById)
  .post(breweriesController.update)
  .delete(breweriesController.remove)

module.exports = router;
