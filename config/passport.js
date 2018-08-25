const passport = require("passport");
const User = require("../models/User");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload, cb) => {
      User.findById(payload.sub, (error, user) => {
        if (error) {
          return cb(error);
        }

        return cb(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, cb) {
  return cb(null, user);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, cb);
});

module.exports = passport;
