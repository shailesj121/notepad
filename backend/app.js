import Express from "express";
import cors from "cors";
import { Router } from "express";



const app = Express()

app.use(Express.json());
app.use(cors({
    origin: ["notepad-m5xg.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));


export default app


// Routes

import router from "./routes/notes.route.js";

import bodyParser from "body-parser";

app.use("/api", router);
app.use("/", (req,res, next)=> {
    res.status(200).json(
        {
            Message: "OK"
        }
    )
})