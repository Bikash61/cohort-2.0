const mongoose = require("mongoose");

/**
 * A single image post. `imgUrl` points to the ImageKit-hosted file
 * uploaded via the create-post endpoint. `user` is the author's ObjectId.
 */
const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"imgUrl is required to create a post " ]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User id is required for creating a post"]
    }
})


const postModel = mongoose.model("posts",postSchema)

module.exports = postModel;