const passport = require("passport");

module.exports = {
  show: function(req, res) {
    res.render("login");
  },

  store: function(req, res) {
    passport.authenticate("local", function(error, user, info) {
      res.json(user);
      if (error) {
        res.flash("error", "Invalid credentials");
        res.redirect("/auth/login");
      }

      console.log(info);

      req.login(user, function(error) {
        if (error) {
          console.log(error);
          res.redirect("/auth/login");
        }
        res.redirect("/protected");
      });
    });
  },
};
