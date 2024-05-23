import fs from "fs"
import { Job, JobRaw, RawSkill,nullObjectSkill } from "./types.js"

// lowdb ist db liest json datei
import { join, dirname } from 'path';
import { fileURLToPath } from 'url'
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, `../src/data/db.json`);
const adapter = new JSONFile(dbFile);
const db:any = new Low(adapter,0);
await db.read();

export const getTest=()=>{
    return db.data.test
}

const jobsRaw : JobRaw[]= JSON.parse(fs.readFileSync("./src/data/jobs.json","utf8"))

const skillsRaw : RawSkill= JSON.parse(fs.readFileSync("./src/data/skills.json","utf8"))

export const getJobs=()=>{
    const jobs : Job[]=[];
    jobsRaw.forEach((jobRaw)=>{
        const job : Job= {
            ...jobRaw,
            skills: buildSkills(jobRaw.skillList),
            toDo:{
                text: jobRaw.publicationDate + " send application: ",
                url:jobRaw.url
            }
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