import Express from "express";
import cors from "cors";


const app = Express()

app.use(Express.json());
app.use(cors());


export default app


// Routes
import router from "./routes/notes.route.js";
import bodyParser from "body-parser";

app.use("/api", router);