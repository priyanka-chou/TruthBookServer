const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

   
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

module.exports = mongoose.model("Post", PostSchema);