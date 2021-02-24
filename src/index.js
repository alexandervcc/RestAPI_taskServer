require("./db/mongoose")

const chalk=require("chalk")
const express=require("express")

const userRouter =require("./Router/user")
const taskRouter = require("./Router/task")

const app=express();

const port=process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get("/",(req,res)=>{
    res.send("Cheems Server")
})

app.listen(port,()=>{
    console.log(chalk.blue.inverse.bold("SERVER STARTED ON: "+port))
});
