const router = require("express").Router();
const breweryRoutes = require("./breweries");
const adminRoutes = require("./admin");

router.use("/breweries", breweryRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
