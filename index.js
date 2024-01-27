const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { bugRouter } = require("./routes/bug.routes");



const app = express();
app.use(cors());
app.use(express.json());




app.use("/user", userRouter)

app.use("/api", bugRouter)



app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log(`server is running at ${process.env.PORT}`)
    } catch (error) {
        console.log(error);
    }
})