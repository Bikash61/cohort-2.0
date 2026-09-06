const mongoose = require("mongoose")

/**
 * Opens the Mongoose connection to MongoDB using the URI from
 * the MONGO_URI environment variable. Call once at server startup.
 */
async function connectToDatabase(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connect to MongoDB")
}

module.exports = connectToDatabase