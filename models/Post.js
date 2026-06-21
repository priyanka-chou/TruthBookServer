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

  likesCount: {
    type: Number,
    default: 0
  },

  commentsCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });


postSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);