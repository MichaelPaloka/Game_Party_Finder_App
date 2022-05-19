const mongoose = require('mongoose');

const PartyMemberSchema = new mongoose.Schema({
    partyMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    gamePost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GamePost"
    }
}, { timestamps: true });

module.exports = mongoose.model('PartyMember', PartyMemberSchema);