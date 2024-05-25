import express from "express"
import * as model from "./model.js"
import cors from "cors"

import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 3005
app.use(cors())

app.get("/",(req:express.Request,res:express.Response)=>{
    res.send(model.getApiDocHTML())
})

app.get("/jobs",(req:express.Request,res:express.Response)=>{
    res.json(model.getJobs())
})

app.get("/skills",(req:express.Request,res:express.Response)=>{
    res.json(model.getSkills())
})



// lowdb
app.get("/jobsLowdb",(req:express.Request,res:express.Response)=>{
    res.send(model.getJobsLowdb())
})

app.get("/jobsLowdb/:id",async(req:express.Request,res:express.Response)=>{
    const id = Number(req.params.id)
    const getaJob = await model.getaJob(id);

    if(!getaJob){

        res.status(404).send({
        error:true,
        message: `job with this ${id} does not exist, failed`
    })
}else{

    res.status(200).json(getaJob);
}
})




app.delete('/jobsLowdb/:id', async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    const deletedObject = await model.deleteJob(id);
    if (deletedObject === undefined) {
        res.status(409).send({
            error: true,
            message: `article with id ${id} does not exist, delete failed`
        })
    } else {
        res.status(200).send({  error:true,
            message: `article with this ${id} has been  deleted, success`,
            article: deletedObject



        });
    }
});

app.get("/skillsLowdb",(req:express.Request,res:express.Response)=>{

    //res.json(model.getSkillsLowdb())
    res.json(model.getSkillTotals())
})








app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})