const jwt = require("jsonwebtoken")

/**
 * Auth middleware — reads the JWT from the "token" cookie (set on
 * register/login), verifies it, and attaches the decoded payload
 * ({ id, username }) to req.user for downstream route handlers.
 * Responds 401 if the cookie is missing or the token is invalid/expired.
 */
async function identifyUser(req,res,next){
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

    req.user = decoded
    next()
}

module.exports = identifyUser;