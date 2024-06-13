import Express from "express";
import cors from "cors";
import { Router } from "express";



const app = Express()

app.use(Express.json());
app.use(cors({
    origin: 'https://notepad-rho-pink.vercel.app',
    credentials: 'omit'
}));

export default app


// Routes

import router from "./routes/notes.route.js";
import userRouter from "./routes/user.route.js"
import bodyParser from "body-parser";

app.use(bodyParser.json())
app.use("/api", router);
app.use("/auth", userRouter)