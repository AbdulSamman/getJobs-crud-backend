import fs from "fs"
import { Job, JobRaw, RawSkill,nullObjectSkill } from "./types.js"


const jobsRaw : JobRaw[]= JSON.parse(fs.readFileSync("./src/data/jobs.json","utf8"))

const skillsRaw : RawSkill= JSON.parse(fs.readFileSync("./src/data/skills.json","utf8"))

export const getJobs=()=>{
    const jobs : Job[]=[];
    jobsRaw.forEach((jobRaw)=>{
        const job : any= {
            ...jobRaw,
            skills: buildSkills(jobRaw.skillList)
        }
        jobs.push(job)
    })
    return jobs
}


export const getSkills =()=>{
    return skillsRaw
}

const buildSkills = (skillList:string)=>{
    const skills:RawSkill[]=[];
    const skillIdCodes=skillList.split(",").map((m)=>m.trim())
    skillIdCodes.forEach((skillIdCode)=>{
        const _skill = skillsRaw[skillIdCode];
        if(_skill===undefined){
            const skill: RawSkill={
                ...nullObjectSkill,
                idCode: skillIdCode
            }
            skills.push(skill)
        }else{
            const skill:RawSkill={
                ..._skill,
                skillIdCode
            }
            skills.push(skill);
        }
    })
    return skills
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