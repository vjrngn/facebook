/** This middleware checks if a user is logged in */
module.exports = function isAuthenticated() {
  return function(req, res, next) {
    if (!req.user) {
      return res.redirect("/auth/login");
    }

    return next();
  };
};
