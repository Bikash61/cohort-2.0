const express = require("express");
const authController = require("../controllers/auth.controller")

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description create a new account
 * @access Public
 */
authRouter.post("/register",authController.registerController)

/**
 * @route POST /api/auth/login
 * @description authenticate and receive a session cookie
 * @access Public
 */
authRouter.post("/login", authController.loginController)


module.exports = authRouter