// To start the server
// To connect with the database

require("dotenv").config()
const app = require("./src/app");

const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to DB")
    })
};

connectToDb();

app.listen(3000,()=>{
    console.log('Server is running in port 3000');
    
});