// helper function to verify the user is logged in
const withAuth = (req, res, next) => {
  // If the user is not logged in then redirect them to the login page
  if (!req.session.logged_in) {
    res.redirect("/api/users/login");
  } else {
    //if they are logged in then call the next function
    next();
  }
};
//export the withAuth helper
module.exports = withAuth;
