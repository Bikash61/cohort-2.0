const mongoose = require("mongoose")

/**
 * A directed follow relationship: `follower` follows `followee`.
 * Both fields store the user's `username` (not an ObjectId) so the
 * follow/unfollow controllers can query directly by username.
 */
const followSchema = new mongoose.Schema({
    follower:{
        type:String,
        ref:"users",
        required:[true,"Follower is required"]
    },
    followee:{
        type:String,
        ref:"users",
        required:[true,"Followee is required"]
    }
},{
    timestamps:true
})

// Unique compound index: a given follower can only have one follow
// record per followee, preventing duplicate follows.
followSchema.index({follower:1,followee:1},{unique:true})
const followModel = mongoose.model("follows",followSchema)

module.exports = {
    followModel,
}