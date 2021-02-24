const express=require("express")
const router=new express.Router()
const User=require("../modules/user")

require("../db/mongoose")

const auth=require("../Middleware/auth")

//POST request - USERS
app.post("/users",(req,res)=>{
    const user=new User(req.body);
    console.log(user)
    user.save().then(()=>{
        res.status(201).send(user)
        console.log("Saved in Db: ",user)
    }).catch(()=>{
        res.status(400).send("Error")

    })
})



//GET request - USERS

app.get("/users",(req,res)=>{
     User.find({}).then((users)=>{
         res.send(users)
     }).catch((e)=>{
         res.status(400).send("Get Error",e)
     })
})




//GET request - One USER

router.get("/users/:id",(req,res)=>{ 
    const _id=req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send("User not found")
        }
        
        res.send(user)

    }).catch((e)=>{
        res.status(500).send("Error:",e)
    })
})



router.get("/users/:id",async (req,res)=>{
    const _id=req.params.id
    try {
        const user= await User.findById(_id)

        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send("Not Found")
    }
})




//DELETE request - USERS
router.delete("/users/:id",async (req,res)=>{
    try {
        const user= await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    } catch (error) {
        res.status(500).send(error)
    }


})

//DELETE request - USERS
router.delete("/users/:id",async (req,res)=>{
    try {
        const user= await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch("/users/:id",async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdatedArray=["name","age","email","password"]
    const isValid=updates.every((item)=> allowedUpdatedArray.includes(item))

    if(!isValid){
        return res.status(401).send("Error: Invalid Update Keys")
    }

    try {

        const user=await User.findById(req.params.id)
        console.log("user found: ",user)
        updates.forEach((item)=>user[item]=req.body[item])
        await user.save()

        //const user1=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!user){
            return res.status(501).send()
        }
        res.send(user)
    } catch (error) {
        res.status(502).send(error)
    }
})

//Export to be Used
module.exports =router