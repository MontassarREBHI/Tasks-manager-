const jwt = require('jsonwebtoken');
const User=require('../models/userModel.js');

const protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from the header
            token=req.headers.authorization.split(" ")[1];

            //verify the token 
            const decoded=jwt.verify(token,process.env.JWT_SECRET)

            //Get user id from token
            req.user=await User.findById(decoded.id).select("-password");
            
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json('Not authorized')
        }
    }
    if(!token){
        res.status(401).json('Not authorized , no token ')
    }
}

module.exports={protect};