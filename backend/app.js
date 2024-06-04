import Express from "express";
import cors from "cors";
import { Router } from "express";



const app = Express()

app.use(Express.json());
app.use(cors({
    origin: ["https://notepad-one-orcin.vercel.app"]
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