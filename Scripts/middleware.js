
const app=express();
const port=process.env.PORT || 4000;

//Middleware for Server Maintance
app.use((req,res,next)=>{
    res.status(501).send("Server in Maintance")
})

//New Middleware, function we define
//next: to register middleware
app.use((req,res,next)=>{
    console.log("Action: ",req.method,req.path)
    if(req.method==="GET"){
        res.send("GET request 'disabled'")
    }else{
    //Run next, to continue to handler
    next()
    }
})



//PARSE json for use
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
