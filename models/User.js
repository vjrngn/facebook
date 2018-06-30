const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    age: Number,
    gender: {
      type: String,
      enum: ["m", "f"],
    },
    country: String,
    relationshipStatus: {
      type: String,
      enum: [
        "single",
        "in a relationship",
        "divorced",
        "married",
        "it's complicated",
      ],
    },
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
