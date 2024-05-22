import fs from "fs";
const jobsRaw = JSON.parse(fs.readFileSync("./src/data/jobs.json", "utf8"));
export const getJobs = () => {
    console.log(jobsRaw);
};
//# sourceMappingURL=model.js.map