const router = require("express").Router();
const breweriesController = require("../../controllers/breweriesController");

// Matches with "/api/books"
router.route("/")
  .get(breweriesController.findAll)
  .post(breweriesController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(breweriesController.findById)
  .put(breweriesController.update)
  .delete(breweriesController.remove);

module.exports = router;
