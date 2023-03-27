const express = require('express');
const { connection } = require('./db');
const { auth } = require('./middelware/auth.middelware');
const { postRouter } = require('./routers/post.routes');
const { userRouter } = require('./routers/user.routes');
require('dotenv').config();
const app = express()

app.use(express.json())

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)


app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("connected to db");
    } catch (err) {
        console.log(err);
    }
    console.log("server is runing");
})