import express from "express";
import * as model from "./model.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3005;
app.use(cors());
app.get("/", (req, res) => {
    res.send(model.getApiDocHTML());
});
app.get("/jobs", (req, res) => {
    res.json(model.getJobs());
});
app.get("/skills", (req, res) => {
    res.json(model.getSkills());
});
// lowdb
app.get("/jobsLowdb", (req, res) => {
    res.send(model.getJobsLowdb());
});
app.get("/jobsLowdb/:id", async (req, res) => {
    const id = Number(req.params.id);
    const getaJob = await model.getaJob(id);
    if (!getaJob) {
        res.status(404).send({
            error: true,
            message: `job with this ${id} does not exist, failed`
        });
    }
    else {
        res.status(200).json(getaJob);
    }
});
app.get("/skillsLowdb", (req, res) => {
    res.json(model.getSkillsLowdb());
});
app.delete('/jobsLowdb/:id', async (req, res) => {
    const id = Number(req.params.id);
    const deletedObject = await model.deleteJob(id);
    if (deletedObject === undefined) {
        res.status(409).send({
            error: true,
            message: `article with id ${id} does not exist, delete failed`
        });
    }
    else {
        res.status(200).send({ error: true,
            message: `article with this ${id} has been  deleted, success`,
            article: deletedObject
        });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map