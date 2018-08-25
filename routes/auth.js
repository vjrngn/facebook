const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const loginController = require("../controllers/loginController");

router.get("/login", loginController.show);

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      return next(err);
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(401);
      return res.json({
        error: {
          message: "Invalid credentials",
        },
      });
    }

    return res.json({
      token: jwt.sign({ sub: user.id }, process.env.JWT_SECRET),
    });
  });
});

router.get("/logout", function(req, res) {
  req.logout();

  res.redirect("/auth/login");
});

module.exports = router;
