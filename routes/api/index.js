const router = require("express").Router();
const breweryRoutes = require("./breweries");
const adminRoutes = require("./admin");
const breweryUpdateRoutes = require("./breweryUpdate");

router.use("/breweries", breweryRoutes);
router.use("/admin", adminRoutes);
router.use("/breweryUpdate", breweryUpdateRoutes);

module.exports = router;
