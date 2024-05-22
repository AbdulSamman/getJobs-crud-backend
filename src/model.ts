import fs from "fs"
import { JobRaw } from "./types.js"


const jobsRaw : JobRaw[]= JSON.parse(fs.readFileSync("./src/data/jobs.json","utf8"))

const skillsRaw = JSON.parse(fs.readFileSync("./src/data/skills.json","utf8"))

export const getJobs=()=>{
return jobsRaw

}


export const getSkills =()=>{
    return skillsRaw
}

export const getApiDocHTML =()=>{
    return `
    <h1>GET A JOB API</h1>
    <li>
    <a href="http://localhost:3066/jobs">/jobs</a> return an array of job objects
    <li>
    <a href="http://localhost:3066/jobsTodos">/jobsTodos</a> return added todos to row job
    </li>
    <li>

    <a href="http://localhost:3066/todos">/todos</a> return an seperate todos
    </li>
    <li>
    <a href="http://localhost:3066/skills">/skills</a> return an array of skills objects
    </li>
    </li>

    `
}