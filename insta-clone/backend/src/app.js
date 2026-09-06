/**
 * Application entry point.
 * Creates the Express app, wires up global middleware, and mounts
 * all feature routers under their `/api/*` base paths.
 */

const express = require("express");
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());      // parse incoming JSON request bodies
app.use(cookieParser());      // populate req.cookies (used to read the JWT auth cookie)

// Required Routes
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const { userRouter } = require("./routes/user.routes")

//Using routes
app.use("/api/auth",authRouter)   // register / login
app.use("/api/posts",postRouter)   // create / list / view posts
app.use("/api/users",userRouter)  // follow / unfollow other users

module.exports = app;

