const mongoose = require('mongoose');

const GamePostSchema = new mongoose.Schema({
    gameTitle: { 
        type: String,
        required: [
            true,
            "A Game Title is required!"
        ],
    },
    genre: { 
        type: String,
        required: [
            true,
            "A genre is required!"
        ],
        enum: [
            "Sandbox",
            "FPS",
            "Role Playing",
            "Action",
            "Puzzle",
            "Sports",
            "MMORPG",
            "Other"
        ]
    },
    objective: { 
        type: String,
        required: [
            true,
            "An objective is required so others know what you are trying to accomplish!"
        ],
    },
    partySize: { 
        type: Number,
        required: [
            true,
            "A party size is required!"
        ],
        
    },
    date: { 
        type: Date,
        required: [
            true,
            "A Date is required!"
        ],
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "Posted by is required!"
        ],
    }
}, { timestamps: true });

module.exports = mongoose.model('GamePost', GamePostSchema);