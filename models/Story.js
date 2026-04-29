const mongoose = require("mongoose");

const StorySchema = new Schema({

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

    },

    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },

    Views: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }]
})

module.exports = mongoose.model("Story", StorySchema);

