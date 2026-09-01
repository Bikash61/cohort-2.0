const postModel = require("../models/post.model")
const ImageKit  = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res){
    console.log(req.body,req.file)

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not provided, Unauthorized acess"
        })
    }

    let decoded = null
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch (err){
        return res.status(401).json({
            message:"user not authorized"
        })
    }

    if(!req.file){
        return res.status(400).json({
            message:"Image file is required"
        })
    }

    try{
        const file = await imagekit.files.upload({
            file:await toFile(Buffer.from(req.file.buffer),req.file.originalname),
            fileName:`${decoded.id}-${Date.now()}`,
            folder:"cohort-2-insta-clone-posts"
        })

        const post = await postModel.create({
            caption:req.body.caption,
            imgUrl:file.url,
            user:decoded.id
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

async function getPostController(req,res){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized acess"
        })
    }
    let decoded;
    try{
        decode = jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"Token is Invalid"
        })

    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message:"Post Fetched Sucessfully",
        posts
    })

   
}

async function getPostDetails(req,res){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized acess"
        })
    }
    
    let decoded
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)

    }catch(err){
        return res.status(401).json({
            message:"Unauthorized Acess"
        })
    }

    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return req.status(404).json({
            message:"post not found"
        })
    }

    const isValidUser  = post.user  ===userId

    if(!isValidUser){
        return req.status(403).json({
            message:"Forbodden Content"
        })
    }

    return res.status(200).json({
        message:"Post fetched sucessfully "
    })
}
module.exports = {
    createPostController,
    getPostController

}