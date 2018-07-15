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
    .populate("comments.user")
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

router.post("/comments/:id/like", function(req, res) {
  Post.findOne({ "comments._id": req.params.id }, function(error, post) {
    if (error) {
      return res.json({
        success: false,
        error: error,
      });
    }

    const comment = post.comments.find(comment => comment.id === req.params.id);
    comment.likes++;

    post.save(function (err) {
      res.json({
        success: true,
        likes: comment.likes
      });
    });
  });
});

module.exports = router;
