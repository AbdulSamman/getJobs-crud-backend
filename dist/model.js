import fs from "fs";
import { nullObjectSkill } from "./types.js";
import * as model from "./model.js";
// lowdb ist db liest json datei
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, `../src/data/db.json`);
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, 0);
await db.read();
// data jsonFIle
const jobsRaw = JSON.parse(fs.readFileSync("./src/data/jobs.json", "utf8"));
const skillsRaw = JSON.parse(fs.readFileSync("./src/data/skills.json", "utf8"));
export const getJobs = () => {
    const jobs = [];
    jobsRaw.forEach((jobRaw) => {
        const job = {
            ...jobRaw,
            skills: buildSkills(jobRaw.skillList),
            toDo: {
                text: jobRaw.publicationDate + " send application: ",
                url: jobRaw.url
            }
        };
        jobs.push(job);
    });
    return jobs;
};
export const getSkills = () => {
    return skillsRaw;
};
const buildSkills = (skillList) => {
    const skills = [];
    const skillIdCodes = skillList.split(",").map((m) => m.trim());
    skillIdCodes.forEach((skillIdCode) => {
        const _skill = skillsRaw[skillIdCode];
        if (_skill === undefined) {
            const skill = {
                ...nullObjectSkill,
                idCode: skillIdCode
            };
            skills.push(skill);
        }
        else {
            const skill = {
                ..._skill,
                idCode: skillIdCode
            };
            skills.push(skill);
        }
    });
    return skills;
};
// delete a job
//lowdb
// get a job lowdb
export const getaJob = async (id) => {
    const job = db.data.jobs.find((m) => m.id === id);
    return job;
};
export const getJobsLowdb = () => {
    try {
        const _jobs = db.data.jobs;
        const jobs = [];
        _jobs.forEach((jobRaw) => {
            const job = {
                ...jobRaw,
                skills: buildSkills(jobRaw.skillList),
                toDo: {
                    text: jobRaw.publicationDate + " send application: ",
                    url: jobRaw.url
                }
            };
            jobs.push(job);
        });
        return jobs;
    }
    catch (error) {
        return error;
    }
};
export const getSkillTotals = () => {
    try {
        const skillTotals = [];
        const jobs = model.getJobsLowdb();
        jobs.forEach(job => {
            job.skills.forEach(skill => {
                const existingSkillTotal = skillTotals.find(skillTotal => skillTotal.skill.idCode === skill.idCode);
                if (!existingSkillTotal) {
                    skillTotals.push({
                        skill,
                        total: 1
                    });
                }
                else {
                    existingSkillTotal.total++;
                }
            });
        });
        return skillTotals;
    }
    catch (error) {
        return { status: "error", errors: ["no access --"] };
    }
};
export const deleteJob = async (id) => {
    const deletedObject = db.data.jobs.find((m) => m.id === id);
    db.data.jobs = db.data.jobs.filter((m) => m.id !== id);
    await db.write();
    return deletedObject;
};
export const getApiDocHTML = () => {
    return `
    <h1>GET A JOB API</h1>
    <li>
    <a href="http://localhost:3066/jobs">/jobs</a> return an array of job objects
    <li>
    <a href="http://localhost:3066/skillsLowdb">/skillsLowdb</a> skills from lowdb
    </li>
    <li>

    <a href="http://localhost:3066/jobsLowdb">/jobsLowdb</a> jobs from lowdb
    </li>
    <li>
    <a href="http://localhost:3066/skills">/skills</a> return an array of skills objects
    </li>
    </li>

    `;
};
//# sourceMappingURL=model.js.map