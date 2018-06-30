const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const crypto = require("crypto");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const LocalStragegy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const flash = require("express-flash");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authenticationRouter = require("./routes/auth");
const signupRouter = require("./routes/signup");
const User = require("./models/User");

const { HOST = "localhost", PORT = 27017 } = process.env;
const ONE_WEEK = 60 * 24 * 7 * 60 * 1000;

mongoose.connect(
  `mongodb://${HOST}:${PORT}/facebook`,
  function(error) {
    if (!error) {
      console.log("Successfully connected to monogoDb.");
    }
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/** setup sessions */
app.use(
  // @ts-ignore
  session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: ONE_WEEK,
    },
    store: new MongoDBStore({
      uri: `mongodb://${HOST}:${PORT}/facebook`,
      collection: "sessions",
    }),
  })
);

passport.use(
  new LocalStragegy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function(req, email, password, done) {
      console.log(email, password);
      User.findOne({ email: email }, function(error, user) {
        if (error) {
          return done(error);
        }

        const isVerified = bcrypt.compareSync(password, user.password);

        if (!isVerified) {
          return req.redirect("/login");
        }

        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authenticationRouter);
app.use("/signup", signupRouter);

app.get(
  "/protected",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
