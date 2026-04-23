const mongoose = require('mongoose');

const CommentSchema = new Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        require: true

    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
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
        require: true
    },

    reply: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
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
            require: true
        }
    }],

})

 module.export = mongoose.model("Comment",CommentSchema);
