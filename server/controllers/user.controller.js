const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.register = async(request, response) => {
    User.create(request.body)
    .then(user => {
        res.json({ msg: "success!", user: user });
    })
    .catch(err => response.status(400).json(err));
}

module.exports.login = (request, response) => {
    User.findOne({ email: request.body.email })
        .then((user)=> {
            if(user === null) {
                return response.status(400).json({message: "Invalid Login1"});
            }
            else{
                bcrypt.compare(request.body.password, user.password)
                    .then((correctPassword)=>{
                        if(correctPassword){
                            console.log('Password is valid')
                            response.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: user._id
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                        {
                                            httpOnly: true,
                                            expires: new Date(Date.now() + 9000000)
                                        }
                                    )
                                    .json({ msg: "success!" });
                        }
                        else{
                            response.status(400).json({message: "Invalid Login2"});
                        };
                    })
                    .catch((err)=>{
                        console.log(err);
                        console.log(request.body.password)
                        response.status(400).json({message: "Invalid Login3"})
                    })
            }
        })
        .catch((err)=>{
            console.log(err);
            response.status(400).json({message: "Invalid Login4"})
        })
}

module.exports.logout = (request, response) => {
    response.clearCookie('usertoken');
    response.json({message: "You have been logged out!"})
}