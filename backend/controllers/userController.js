const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js')


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    //input validation
    if (!name || !email || !password) {
        res.status(400).send('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).send('user already exists')
    }

    // Hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);

    // Create User 
    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400).json('Invalid user data')
    }

}

const loginUser =async (req, res) => {
    const {email,password}=req.body;
    const user=await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400).json('Invalid credentials')
    }
}

const getMe = async (req, res) => {
    res.status(200).json(req.user)
}

// Generate JWT
const generateToken=(id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:'30d'  
   })
}

module.exports = { registerUser, loginUser, getMe }