const express = require("express");
const followUserController = require("../controllers/user.controller")
const identifyUser = require("../middleware/auth.middleware")

const userRouter = express.Router();

/**
 * @routes Post /api/users/follow/:userid
 * @description follow a user
 * @acess Private
 */

userRouter.post("/follow/:username",identifyUser,followUserController.followUserController)

/**
 * @routes Post /api/users/unfollow/:userid
 * @description unfollow a user
 * @acess Private
 */

userRouter.post("/unfollow/:username",identifyUser,followUserController.unFollowController)
module.exports = {
    userRouter,
};

