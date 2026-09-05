const { followModel } = require("../models/follow.model")
const userModel = require("../models/user.model")

/**
 * POST /api/users/follow/:username (auth required)
 * Makes the authenticated user follow the user named in the URL.
 * Rejects following a non-existent user, following yourself, and
 * is idempotent — following an already-followed user just returns
 * the existing follow record.
 */
async function followUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExist){
        return res.status(404).json({
            message:` user you are trying to follow doesn't exist`
        })
    }

    if (followeeUsername === followerUsername){
        return res.status(400).json({
            message:"You can't follow yourself"
        })
    }

    // FIXME: follower/followee are swapped here — this actually checks
    // whether followeeUsername already follows followerUsername, not
    // the other way around. Should be { follower: followerUsername, followee: followeeUsername }.
    const isAlreadyFollowing = await followModel.findOne({
        followee : followerUsername,
        follower : followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You are already following ${followeeUsername}`,
            follow:isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        followee : followeeUsername
    })

    res.status(201).json({
        message:`You are now following ${followeeUsername}`,
        follow:followRecord
    })
}


/**
 * POST /api/users/unfollow/:username (auth required)
 * Removes the follow relationship from the authenticated user to
 * the user named in the URL, if one exists.
 */
async function unFollowController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(!isUserFollowing){
        return res.status(400).json({
            message:`You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`You have unfollowed  ${followeeUsername}`
    })
}
module.exports = {
    followUserController,
    unFollowController
}