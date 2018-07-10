const mongoose = require("mongoose");
const Comment = require("./Comment");

const postSchema = new mongoose.Schema(
  {
    content: String,
    likes: Number,
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    comments: [
      {
        ref: "Comment",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Convenience function to add a comment to a post
 */
postSchema.methods.addComment = function(attributes, cb) {
  const post = this;
  const commentData = Object.assign({}, attributes, {
    post: post,
  });

  Comment.create(commentData, function(err, comment) {
    if (err) {
      return cb(err);
    }

    post.comments.push(comment);
    post.save(function(err) {
      if (err) {
        cb(err);
      }

      cb(null, comment);
    });
  });
};

module.exports = mongoose.model("Post", postSchema);
