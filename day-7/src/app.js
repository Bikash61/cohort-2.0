const express = require("express");

const app = express()

module.exports = app;

app.use(express.json())


//post
app.post("/notes",(req,res)=>{
    const {title,description} = req.body
})