import express from "express";

import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("server is running");
});

app.listen(5000, () => {
    console.log("server is running");
});
