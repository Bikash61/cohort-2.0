const express = require("express");
const followUserController = require("../controllers/user.controller")
const identifyUser = require("../middleware/auth.middleware")

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:username
 * @description follow a user
 * @access Private
 */

userRouter.post("/follow/:username",identifyUser,followUserController.followUserController)

/**
 * @route POST /api/users/unfollow/:username
 * @description unfollow a user
 * @access Private
 */

userRouter.post("/unfollow/:username",identifyUser,followUserController.unFollowController)
module.exports = {
    userRouter,
};

