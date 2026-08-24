const express = require("express");
const userModel = require("../models/user.model");

const authRouter = express.Router();

authRoutes.post("/register",async(req,res)=>{
    const{email,username,password,bio,profileImage} = req.body

    const isUserExistsByEmail = await userModel.findOne({email})
    if(isUserExistsByEmail){
        return res.status(409).json({
            message:"user already exist with same email"
        })
    }

    const isUserExistByUserName = await userModel.findOne({username})
    if(isUserExistByUserName){
        return res.status(409).json({
            message:"user already exist by same username"
        })
    }
})