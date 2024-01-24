import 'dotenv/config'
import Express from "express";
import cors from "cors";

const app = Express()

app.use(Express.json());
app.use(cors());

app.get("/api/notes", (req, res) => {
    res.json("server is ready")
})

app.listen(process.env.PORT || 4000, () => {console.log(`server is listening at http://localhost:${process.env.PORT}/api/notes`)})