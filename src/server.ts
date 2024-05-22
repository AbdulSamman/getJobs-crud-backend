import express from "express"
import * as model from "./model.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 3005


app.get("/",(req,res)=>{
    res.send(model.getApiDocHTML())
})

app.get("/jobs",(req,res)=>{
    res.json(model.getJobs())
})

app.get("/skills",(req,res)=>{
    res.json(model.getSkills())
})



app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})