const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: String,
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    content: String,
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    comments: [commentSchema],
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

  this.comments.push(attributes);
  this.save(function(err) {
    cb(null, post);
  });
};

module.exports = mongoose.model("Post", postSchema);
