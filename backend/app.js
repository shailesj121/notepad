import Express from "express";
import cors from "cors";

const app = Express()

app.use(Express.json());
app.use(cors({
    origin: 'https://notepad-rho-pink.vercel.app/',
    credentials: true,
}));

export default app


// Routes

import router from "./routes/notes.route.js";
import userRouter from "./routes/user.route.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


app.use(bodyParser.json())
app.use(cookieParser());
app.use("/api", router);
app.use("/auth", userRouter)