import 'dotenv/config'
import app from "./app.js"

import database from "./db/database.js"

dotenv.config({
    path: './env'
})

database().then(() => {
    app.listen(process.env.PORT || 4000, () => { console.log(`server is listening at http://localhost:${process.env.PORT}/api/notes`) })
}).catch((err) => {
    console.log(`connection error at: ${err}`)
})
