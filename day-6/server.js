const app = require("./src/app");
const dotenv = require("dotenv")
const mongoose = require("mongoose");



dotenv.config();

function connectToDb(){
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Connected to database");
        
  })
};

connectToDb();

const PORT = process.env.PORT || 3000

app.listen(3000,()=>{
    console.log(`Server is running on port ${PORT}`);
    
});