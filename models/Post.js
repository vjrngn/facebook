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
 * Post.findById(id, function (err, post) {
 *  post.comments(function (comment) {
 *   comment.content = req.body.content;
 *   comment.save(function (err) {
 *     req.redirect('/');
 *   })
 *  })
 * })
 */

 /** Post.load('comments').create({}) */

// postSchema.methods.comments = function(cb) {
//   const post = this.model("Post");

//   return {
//     ...new Comment({
//       post: post
//     })
//   };
// };

module.exports = mongoose.model("Post", postSchema);
