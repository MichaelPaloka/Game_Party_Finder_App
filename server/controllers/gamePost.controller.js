const GamePost = require('../models/gamePost.model');
const jwt = require('jsonwebtoken')

module.exports.createGamePost = (request, response) => {

    const newGamePostObject = new GamePost(request.body);
    const decodedJWT = jwt.decode(request.cookie.usertoken,{
        complete:true
    })
    newGamePostObject.postedBy = decodedJWT.payload.id

    newGamePostObject.save()
    .then(gamePost => {
        response.json((gamePost));
    })
    .catch(err => response.status(400).json(err));
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