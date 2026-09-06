const mongoose = require("mongoose")

/**
 * A registered user. `password` stores a bcrypt hash, never plaintext.
 * `profileImage` defaults to a generic avatar when none is uploaded.
 */
const userSchema = new mongoose.Schema({
    username : {
    type:String,
    unique:[true,"User name already exists"],
    required:true
    },
    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/otesavegh/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports =  userModel