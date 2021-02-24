
const errorMidd=(req,res,next)=>{
    throw new Error("From Error Middleware");

}



router.post("/users/me/error",errorMidd,
    (req,res)=>{
        res.send()
        },
    (error,req,res,next)=>{
        res.status(400).send({e:error.message})
});
