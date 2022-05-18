const jwt = require('jsonwebtoken')
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.register = async (request, response) => {
    
    const newUser = new User(request.body);
    try {
        const newUserObject = await newUser.save();
        const userToken = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
        response.cookie("usertoken", userToken, process.env.JWT_SECRET, {
            httpOnly:true,
            expires: new Date(Date.now() + 90000000),
        })
        response.json(newUserObject);
    } catch(error) {
        console.log("Error saving to Mongoose!");
        response.status(400).json(error);
        return;
    }
}

module.exports.login = async (request, response) => {
    const {body} = request;

    if (!body.email) {
        response.status(400).json({ error: "No email entered!" });
        return;
    }

    let userQuery;
    try {
        userQuery = await User.findOne({ email: body.email });
    } catch (error) {
        response.status(400).json({ error: "Email cannot be found!" });
    }

    console.log("query: ", userQuery);

    if (userQuery === null) {
        response.status(400).json({ err: "Email cannot be found!!" });
        return;
    }

    const passwordCheck = bcrypt.compareSync(body.password, userQuery.password);

    if (!passwordCheck) {
        response.status(400).json({ error: "Email or Password is incorrect!" });
        return;
    }

    const userToken = jwt.sign({ id: userQuery._id}, process.env.JWT_SECRET);
    console.log("token", userToken);

    response.cookie("usertoken", userToken, process.env.JWT_SECRET, {
        httpOnly:true,
        expires: new Date(Date.now() + 90000000),
    })
    .json({message: "Successful Login"})
    // User.findOne({ email: request.body.email })
    //     .then((user)=> {
    //         if(user === null) {
    //             return response.status(400).json({message: "Invalid Login1"});
    //         }
    //         else{
    //             bcrypt.compare(request.body.password, user.password)
    //                 .then((correctPassword)=>{
    //                     if(correctPassword){
    //                         console.log('Password is valid');
    //                         response.cookie(
    //                             "usertoken",
    //                             jwt.sign(
    //                                 {
    //                                     id: user._id
    //                                 },
    //                                 process.env.JWT_SECRET
    //                             ),
    //                                 {
    //                                     httpOnly: true,
    //                                     expires: new Date(Date.now() + 9000000)
    //                                 }
    //                             )
    //                             .json({ msg: "success!" });
    //                     }
    //                     else{
    //                         response.status(400).json({message: "Invalid Login2"});
    //                     };
    //                 })
    //                 .catch((err)=>{
    //                     console.log(err);
    //                     console.log(request.body.password)
    //                     response.status(400).json({message: "Invalid Login3"})
    //                 })
    //         }
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //         response.status(400).json({message: "Invalid Login4"})
    //     })
}

module.exports.logout = (request, response) => {
    response.clearCookie('usertoken');
    response.json({message: "You have been logged out!"})
}

module.exports.getUser = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.updateProfile = (request, response) => {
    User.findOneAndUpdate({_id:request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => {response.status(400).json(err)});
}

module.exports.getLoggedInUser = (request, response) => {
    const decodedJWT = jwt.verify(
        request.cookies.usertoken, 
        process.env.JWT_SECRET);
    User.findOne({_id:decodedJWT.id})
        .then(user => {
            response.json(user)})
        .catch(err => response.json(err))
}