// To start the server
// To connect with the database

const app = require("./src/app");

const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect("mongodb+srv://bashyalb96_db_user:bzKdJ2aIh1FFJKGf@cluster-day-7.qcub7vd.mongodb.net/day-7")
    .then(()=>{
        console.log("Server is connected to DB")
    })
};

connectToDb();

app.listen(3000,()=>{
    console.log('Server is running in port 3000');
    
});