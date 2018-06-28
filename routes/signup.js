const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/", function(req, res) {
  res.render("signup");
});

router.post("/", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmation = req.body.confirmation;

  if (password.trim() === "") {
    req.flash("error", "Password field cannot be empty");
    return res.redirect("/signup");
  }

  if (password !== confirmation) {
    req.flash("error", "Password does not match confirmation");
    return res.redirect("/signup");
  } else {
    User.create(
      {
        email: email,
        password: bcrypt.hashSync(password, 10),
      },
      function(error, user) {
        if (error) {
          req.flash("error", error);
          res.redirect("/signup");
        }

        req.flash("success", "You have successfully signed up! You may now login.")
        res.redirect("/auth/login");
      }
    );
  }
});

module.exports = router;
