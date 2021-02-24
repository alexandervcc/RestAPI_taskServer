const jwt = require("jsonwebtoken")
const User=require("../modules/user")


//Authenticacion
const auth=async (req,res,next)=>{

    try {
        const token=req.header("Authorization").replace("Bearer ","")
        const decode=jwt.verify(token,process.env.JWTSECRET)
        const user=await User.findOne({_id:decode._id,'tokens.token':token})

        if(!user){
            res.status(400).send("Please Authenticate")
        }

        req.token=token
        req.user=user
        next()
    } catch (e) {
        res.status(401).send({error:"Authentication Failed",e})
}

}



module.exports = auth
