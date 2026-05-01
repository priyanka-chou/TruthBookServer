const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  userId: {
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

 
  likesCount: {
    type: Number,
    default: 0
  },

  commentsCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);