const mongoose = require('mongoose');

const CommentSchema = new Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true

    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"

    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }],

    text: {
        type: String,
        required: true
    },

    reply: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"

        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

        }],

        text: {
            type: String,
            required: true
        }
    }],

})

 module.export = mongoose.model("Comment",CommentSchema);
