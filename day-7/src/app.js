const express = require("express");
const noteModel = require("./models/notes.models")
const app = express()



app.use(express.json())


//post
app.post("/notes", async(req,res)=>{
    const {title,description} = req.body
    
    const note = await noteModel.create({
        title,
        description
    });

    res.status(201).json({
        message : "Note created sucessfully",
        note
    });
});  

//get 
app.get("/notes", async(req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        messsage:"Notes fetched sucessfully",
        notes
    })

})

module.exports = app;
    