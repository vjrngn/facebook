const passport = require("../config/passport");

module.exports = {
  show: function(req, res) {
    res.render("login");
  },

  store: function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return res.send(err);
      }

      if (!user) {
        return res.redirect("/auth/login");
      }

      req.login(user, function(error) {
        if (error) {
          return next(error);

          res.redirect("/users");
        }
      });
    })(req, res, next);
  },
};
