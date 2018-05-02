const router = require("express").Router();
const breweryRoutes = require("./breweries");
const adminRoutes = require("./admin");
const breweryUpdateRoutes = require("./breweryUpdate");
const beerSearchRoutes = require("./beerSearch");

router.use("/breweries", breweryRoutes);
router.use("/admin", adminRoutes);
router.use("/breweryUpdate", breweryUpdateRoutes);
router.use("/beerSearch", beerSearchRoutes);

module.exports = router;
