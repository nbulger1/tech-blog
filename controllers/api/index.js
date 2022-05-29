//set constants for the express router, user routes, and blog routes
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");

//use the user and blog routes
router.use("/users", userRoutes);
router.use("/blog", blogRoutes);

//export the routes
module.exports = router;
