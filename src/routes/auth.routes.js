const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userModel = require('../models/user.model')


router.post('/register',async(req,res)=>{
    const {username,password} = req.body

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
})

module.exports = router