const mongoose = require('mongoose');

<<<<<<< HEAD
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
=======
  const PostSchema = new mongoose.Schema({
      user :{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref : "User"
>>>>>>> 0b791f9769207020e7c86677094a73072cc97e3a

   
    type: {
        type: String,
        enum: ["image", "tweet"],
        required: true,
        default: "image"
    },

    caption: {
        type: String,
    },

    
    image: {
        type: String,
        default: "",
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],

    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

<<<<<<< HEAD
module.exports = mongoose.model("Post", PostSchema);
=======
      createdAt:{
        type : Date,
        default :Date.now(),
        required: true,
      }

  })
  module.exports = mongoose.model("Post",PostSchema);
>>>>>>> 0b791f9769207020e7c86677094a73072cc97e3a
