const express = require('express')

const app = express()

app.use(express.json()) // Middleware

const notes = []

app.post("/",(req,res)=>{
    res.send("Hi finally my code is running in deployment")
})

app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("note created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})