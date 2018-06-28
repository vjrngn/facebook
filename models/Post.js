const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: String,
    likes: Number,
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
