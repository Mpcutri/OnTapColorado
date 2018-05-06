const router = require("express").Router();
const breweriesController = require("../../controllers/breweriesController");

// Matches with "/api/admin"
router.route("/")
  .get(breweriesController.findAll)
  .post(breweriesController.create);

// Matches with "/api/admin/:id" 
router
  .route("/:breweryURL")
  .get(breweriesController.findById)
  .delete(breweriesController.remove)
  .post(breweriesController.updateBrewery)

module.exports = router;