// Server ko create karna

const express = require("express");
const noteModel = require("./models/note.model");

const app = express();

app.use(express.json());

// Post API Notes
// - Create new note and save in MongoDB

app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "Note created Sucessfully",
        note
    })
});

// Get API Notes
// -Fetch all the note data and send them in the response

app.get("/api/notes", async (req,res)=>{
   const notes = await noteModel.find()

   res.status(200).json({
    message:"Notes Fetched Sucessfully",
    notes
   })
})


// Delete - /api/notes/:id
// Delete note with the id req.params

app.delete("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "Notes deleted Sucessfully"
    })
})


// Patch Method  /api/notes/:id
// update the description of the note by id


app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"Notes Description updated sucessfully"
    })
})


module.exports = app;