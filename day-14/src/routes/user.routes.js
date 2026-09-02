const express = require("express");
const userController = require("../controllers/user.controller") 
const identifyUser = require("../middleware/auth.middleware")

const userRouter = express();

/**
 * @routes Post /api/users/follow/:userid
 * @description follow a user
 * @acess Private
 */

userRouter.post("/follow/:username",identifyUser,userController.followUserController)

module.exports = {
    userRouter,
};