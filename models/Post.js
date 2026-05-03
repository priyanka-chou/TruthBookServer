const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  caption: {
    type: String,
    maxLength: 500,
    default: ""
  },

  image: {
    type: String,
    default: ""
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  commentsCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

// 🔥 Important for feed performance
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);