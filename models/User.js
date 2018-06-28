const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    age: Number,
    gender: {
      type: String,
      enum: ["m", "f"],
    },
    country: String,
    relationshipStatus: String,
    profilePhotoUrl: String,
    coverPhotoUrl: String,
    friends: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
