const express = require("express")
const postController = require("../controllers/post.controller")
const postRouter = express.Router()
const multer = require("multer")
const uplaod = multer({storage:multer.memoryStorage()})
const { identifyUser } = require("../middleware/auth.middleware")



// post => /api/posts[protected]
// - req.body = {caption, image-field}

// =>/api/post/
postRouter.post("/",uplaod.single("image"),identifyUser,postController.createPostController)

// Get => /api/posts [protected]
postRouter.get("/",identifyUser,postController.getPostController)

//Get => /api/posts/details/:postId
// - Return an details about specific post with its id 
// Check wheather the posts belongs to the user that the request from 

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

module.exports = postRouter;