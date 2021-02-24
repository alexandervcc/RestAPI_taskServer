require("./db/mongoose")

const chalk=require("chalk")
const express=require("express")

const userRouter =require("./Router/user")
const taskRouter = require("./Router/task")

const User=require("../modules/user")
require("../db/mongoose")

const app=express();

const port=process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get("/",(req,res)=>{
    res.send("<h2>Cheems Server</h2>")
})

app.get("/users",async (req,res)=>{
    const users=await User.find()
    res.send(users)
})

app.listen(port,()=>{
    console.log(chalk.blue.inverse.bold("Server is on port: "+port))
});
