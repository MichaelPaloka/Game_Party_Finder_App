const GamePost = require('../models/gamePost.model');
const jwt = require('jsonwebtoken')

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

module.exports.updateGamePost = (request, response) => {
    // const {body} = request;
    // let updGamePost = new GamePost(body);
    // decodedJWT = jwt.verify(
    //     request.cookies.usertoken, 
    //     process.env.JWT_SECRET);
    // if(updGamePost.postedBy == decodedJWT.id){
        GamePost.findOneAndUpdate({_id:request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedGamePost => response.json(updatedGamePost))
        .catch(err => {response.status(400).json(err)});
    // } else{
    //     console.log(updGamePost.postedBy)
    //     console.log(decodedJWT.id)
    //     console.log(body)
    //     console.log("Not the creator of post!")
    // }
}

module.exports.deleteGamePost = (request, response) => {
    // decodedJWT = jwt.verify(
    //     request.cookies.usertoken, 
    //     process.env.JWT_SECRET);
    // postToBeDeleted = GamePost.findOne({_id:request.params.id})
    //     .then(gamePost => response.json(gamePost))
    //     .catch(err => response.json(err))
    // if(postToBeDeleted == decodedJWT.id){
        GamePost.deleteOne({ _id: request.params.id })
        .then(confirmDelete => {
            response.json(confirmDelete)})
            // console.log(postToBeDeleted)
        .catch(err => response.json(err))
    // }else{
    //     console.log(response)
    //     console.log(decodedJWT)
    //     console.log("Not the creator of post!")
    // }
}