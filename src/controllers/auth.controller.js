const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function registerController(req,res){
    const{username,password} = req.body;

    const exisitingUser = await userModel.findOne({
        username
    })

    if(exisitngUser){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const user = await userModel.create({
        username,password
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"user created successfully",
        user
    })
}

async function loginController(req,res){
    const{username,password} = req.body;

    const user = await userModel.findOne({
        username
    })

    if(!user){
        return res.status(400).json({message: "user not found"})
    }

    const isPasswordValid = user.password === password;

    if(!isPasswordValid){
        return res.status(400).json({message: "Invalid Password"});
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message:"User logged in Successfully",
        user:{
            username: user.username,
            id: user.id
        }
    })
}

module.exports ={
    registerController,
    loginController
}