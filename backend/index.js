import 'dotenv/config'
import Express from "express";


const app = Express()

app.get("/notes", (req, res) => {
    res.send("server is ready")
})

app.listen(process.env.PORT || 4000, () => {console.log(`server is listening at http://localhost:${process.env.PORT}`)})