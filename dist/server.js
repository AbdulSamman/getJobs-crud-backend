import express from "express";
import * as model from "./model.js";
const app = express();
const port = 3066;
app.get("/", (req, res) => {
    res.send("hello getJobs loction");
});
app.get("/jobs", (req, res) => {
    res.json(model.getJobs);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map