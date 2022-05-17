const jwt = require('jsonwebtoken');

const authenticateJwt = async (req, res, next) => {
    let decodedJwt;
    try {
        decodedJwt = await jwt.verify(
            req.cookies.usertoken,
            process.env.JWT_SECRET
        );
        console.log("Success", decodedJwt);
        next();
    } catch (error) {
        console.log("Token Error");
        console.log(decodedJwt)
        res.status(400).json({ message: "You must be logged in to access that!" });
    }
}

module.exports = {authenticateJwt}


// module.exports = {
//     authenticate(request, response, next){
//         jwt.verify(request.cookies.usertoken,
//             process.env.JWT_SECRET,
//             (err, payload)=>{
//                 if(err){
//                     console.log(err);
//                     response.status(401).json({verified: false})
//                 }
//                 else{
//                     console.log(payload);
//                     req.jwtpayload = payload
//                     next()
//                 }
//             })
//     }
// }