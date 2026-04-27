const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  
  type: {
    type: String,
    enum: ["image", "text"],
    required: true
  },

  caption: {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: ""
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]

}, {
  timestamps: true   
});

module.exports = mongoose.model("Post", PostSchema);