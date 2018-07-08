const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/* GET home page. */
router.get("/", function(req, res, next) {
  Post.find({}, [], {
    sort: {
      createdAt: "desc",
    },
  })
    .populate("comments")
    .exec(function(err, posts) {
      res.render("wall", {
        posts: posts,
      });
    });
});

module.exports = router;
