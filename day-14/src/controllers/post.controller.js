const postModel = require("../models/post.model")
const ImageKit  = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.models")

// ImageKit client used to upload post images to remote storage.
const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

/**
 * POST /api/post (multipart, field "image", auth required)
 * Uploads the image buffer to ImageKit, then creates a post document
 * pointing at the returned URL for the authenticated user.
 */
async function createPostController(req,res){
    const userId = req.user.id
    if(!req.file){
        return res.status(400).json({
            message:"Image file is required"
        })
    }

    try{
        const file = await imagekit.files.upload({
            file:await toFile(Buffer.from(req.file.buffer),req.file.originalname),
            fileName:`${userId}-${Date.now()}`,
            folder:"cohort-2-insta-clone-posts"
        })

        const post = await postModel.create({
            caption:req.body.caption,
            imgUrl:file.url,
            user:req.user.id
        })

        res.status(201).json({
            message:"Post created sucessfully",
            post
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            message:"Something went wrong while creating the post"
        })
    }
}

/**
 * GET /api/post (auth required)
 * Returns every post created by the authenticated user.
 */
async function getPostController(req,res){

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message:"Post Fetched Sucessfully",
        posts
    })

   
}

/**
 * GET /api/post/details/:postId (auth required)
 * Fetches a single post by id and verifies it belongs to the
 * requesting user before returning it.
 */
async function getPostDetailsController(req,res){

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isValidUser  = post.user.toString()  ===userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbodden Content"
        })
    }

    return res.status(200).json({
        message:"Post fetched sucessfully ",
        post
    })
}


async function likePostController(req,res){
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    try{
        const like = await likeModel.create({
            post:postId,
            user:username
        })

        res.status(200).json({
            message:"Post liked sucessfully",
            like
        })
    }catch(err){
        if(err.code === 11000){
            return res.status(409).json({
                message:"Post already liked"
            })
        }
        console.error(err)
        res.status(500).json({
            message:"Something went wrong while liking the post"
        })
    }
}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController

}