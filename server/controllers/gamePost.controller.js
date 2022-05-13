const GamePost = require('../models/gamePost.model');
const jwt = require('jsonwebtoken')

module.exports.createGamePost = async (request, response) => {
    const {body} = request;
    let newPost = new GamePost(body);
    let decodedJWT;
    try{
        decodedJWT =  await jwt.verify(
            request.cookies.usertoken, 
            process.env.JWT_SECRET);
            console.log("It worked!", decodedJWT)
            response.json({message: "finally worked"})
    } catch(error) {
        console.log("Token Error");
        console.log(decodedJWT)
        response.status(400).json({message: "You must be logged in!"})
        return;
    }

    newPost.postedBy = decodedJWT.id;

    try {
        newPost = await newPost.save();
        response.json((newPost));
        return;
    } catch (error) {
        console.log("error", error)
        response.status(400).json(error)
        return;
    }
}

module.exports.getAllGamePosts = (request, response) => {
    GamePost.find()
        .then(allGamePosts => {
            console.log(allGamePosts);
            response.json(allGamePosts);
        }) 
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

module.exports.getSingleGamePost = (request, response) => {
    GamePost.findOne({_id:request.params.id})
        .then(gamePost => response.json(gamePost))
        .catch(err => response.json(err))
}

module.exports.deleteGamePost = (request, response) => {
    GamePost.deleteOne({ _id: request.params.id })
        .then(confirmDelete => response.json(confirmDelete))
        .catch(err => response.json(err))
}