const app=require("./app")

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(chalk.blue.inverse.bold("SERVER STARTED ON: "+port))
});
