// Server create
// server configuration

const express = require("express")

const app = express()   

app.use(express.json())

const notes = [

]

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.post("/notes",(req,res)=>{
    // console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send("Notes Created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("note deleted sucessfully")
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("Notes updated sucessfully")
})
module.exports = app