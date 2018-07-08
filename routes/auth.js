const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const loginController = require("../controllers/loginController");

router.get("/login", loginController.show);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", function(req, res) {
  req.logout();

  res.redirect("/auth/login");
});

module.exports = router;
