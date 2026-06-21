const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"

    },

    image: {
        type: String,
        default: "",

    },

    text: {
        type: String,
        default: "",

    },

    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },

    expiresAt: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000,
    },

    views: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }]
})


StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Story", StorySchema);