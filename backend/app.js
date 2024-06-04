import Express from "express";
import cors from "cors";
import { Router } from "express";



const app = Express()

app.use(Express.json());
app.use(cors());


export default app


// Routes

import router from "./routes/notes.route.js";

import bodyParser from "body-parser";
app.use("/", (req,res, next)=> {
    res.status(200).json(
        {
            Message: "OK"
        }
    )
    next()
})
app.use("/api", router);