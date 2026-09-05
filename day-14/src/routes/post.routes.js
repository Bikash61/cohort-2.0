const express = require("express")
const postController = require("../controllers/post.controller")
const postRouter = express.Router()
const multer = require("multer")
// Buffers the uploaded file in memory so it can be streamed straight
// to ImageKit without writing it to disk first.
const uplaod = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middleware/auth.middleware")

/**
 * @route POST /api/post
 * @description create a post; multipart form with a "caption" field
 *              and an "image" file field
 * @access Private
 * NOTE: multer runs before identifyUser, so the file is parsed even
 * for unauthenticated requests before the 401 is returned.
 */
postRouter.post("/",uplaod.single("image"),identifyUser,postController.createPostController)

/**
 * @route GET /api/post
 * @description list all posts created by the authenticated user
 * @access Private
 */
postRouter.get("/",identifyUser,postController.getPostController)

/**
 * @route GET /api/post/details/:postId
 * @description fetch one post by id; rejected if it doesn't belong
 *              to the requesting user
 * @access Private
 */
postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

/**
 * @route POST /api/posts/like/:postId
 * @description like a post with id provided in the request params.
 * 
 */
postRouter.post("/like/:postId",identifyUser,postController.likePostController)

module.exports = postRouter;