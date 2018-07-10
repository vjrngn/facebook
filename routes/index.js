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

router.post("/posts", function(req, res) {
  const post = req.body.post;

  Post.create(
    {
      content: post,
      user: req.user,
    },
    function(err, post) {
      res.redirect("/");
    }
  );
});

router.post("/posts/:id/comments", function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      res.redirect("/");
    }

    post.addComment(
      {
        content: req.body.content,
        user: req.user,
        post: post,
      },
      function(err, comment) {
        res.redirect("/");
      }
    );
  });
});

module.exports = router;
