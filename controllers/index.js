//require express router
const router = require("express").Router();

//require the home routes and all routes in the api folder
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

//use the homeroutes and api routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

//export the router
module.exports = router;
