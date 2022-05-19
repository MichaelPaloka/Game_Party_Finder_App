const GamePost = require('../models/gamePost.model');
const jwt = require('jsonwebtoken')


// Based on instructor Josh's contorller for creating posts

module.exports.createGamePost = async (request, response) => {
    const {body} = request;
    let newPost = new GamePost(body);
    const decodedJWT = await jwt.verify(
        request.cookies.usertoken, 
        process.env.JWT_SECRET);

    newPost.postedBy = decodedJWT.id;

    try {
        newPost = await newPost.save();
        response.json((newPost));
    } catch (error) {
        console.log("error submitting post", error)
        response.status(400).json(error);
        return;
    }
}

// Based on learn Platform getAll

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

// Based on learn Platform get 

module.exports.getSingleGamePost = (request, response) => {
    GamePost.findOne({_id:request.params.id})
        .then(gamePost => response.json(gamePost))
        .catch(err => response.json(err))
}

// Based on learn Platform find one and update

module.exports.updateGamePost = (request, response) => {
        GamePost.findOneAndUpdate({_id:request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedGamePost => response.json(updatedGamePost))
        .catch(err => {response.status(400).json(err)});
}

// Based on learn Platform delete 

module.exports.deleteGamePost = (request, response) => {
    GamePost.deleteOne({ _id: request.params.id })
    .then(confirmDelete => {
        response.json(confirmDelete)})
        // console.log(postToBeDeleted)
    .catch(err => response.json(err))

}