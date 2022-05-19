const PartyMember = require('../models/partyMember.model');
const GamePost = require('../models/gamePost.model')
const jwt = require('jsonwebtoken')


// Based on instructor Josh's comments model, made changes to make it apply to my newParty member controller
module.exports.createPartyMember = async (request, response) => {
    const {body, params} = request;
    let newPartyMember = new PartyMember(body);
    const decodedJWT = await jwt.verify(
        request.cookies.usertoken, 
        process.env.JWT_SECRET);
    
    newPartyMember.partyMember = decodedJWT.id;
    newPartyMember.gamePost = params.id;
    
    console.log(newPartyMember)

    try {
        newPartyMember = await newPartyMember.save();
        findGamePartyPost = await GamePost.findByIdAndUpdate(
            newPartyMember.gamePost,
            { $push: { partyMembers: newPartyMember._id } },
            { new: true, userFindAndModify: true }
        );
        response.json({ newPartyMember, findGamePartyPost })
    } catch (error) {
        console.log("Error adding a new party member!")
        response.status(400).json(error);
    }
}
