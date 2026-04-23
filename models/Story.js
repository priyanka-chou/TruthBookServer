const mongoose = require("mongoose");

const StorySchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"

    },

    image: {
        type: String,
        default: "",

    },

    text: {
        type: String,

    },

    createAt: {
        type: Date,
        default: Date.now,
        require: true,
    },

    Views: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }]
})

module.exports = mongoose.model("Story", StorySchema);

