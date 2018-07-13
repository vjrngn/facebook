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
    .populate("user")
    .exec(function(err, posts) {
      if (err) {
        return res.render("error", { error: err });
      }

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
      return res.render("errors", { error: err });
    }

    post.addComment(
      {
        content: req.body.content,
        user: req.user,
        post: post,
      },
      function(err) {
        if (err) {
          return res.render("error", { error: err });
        }

        res.redirect("/");
      }
    );
  });
});

module.exports = router;
