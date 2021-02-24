//Middleware for Server Maintance
const maint =async(req,res,next)=>{
    res.status(501).send("Server in Maintance")
}

module.exports=maint