const express = require("express")
const postController = require("../controllers/post.controller")
const postRouter = express.Router()
const multer = require("multer")
const uplaod = multer({storage:multer.memoryStorage()})



// post => /api/posts[protected]
// - req.body = {caption, image-field}

// =>/api/post/
postRouter.post("/",uplaod.single("image"),postController.createPostController)

module.exports = postRouter;