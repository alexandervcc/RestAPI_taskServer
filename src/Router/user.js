const express=require("express")
const sharp=require("sharp")
const router=new express.Router()
const User=require("../modules/user")

require("../db/mongoose")

const auth=require("../Middleware/auth")
const uploadImg=require("../Middleware/uploadImages")
const uploadPdf=require("../Middleware/uploadFiles")
const {welcomeEmail, cancelEmail} =require("../Email/account")

router.get("/users",async (req,res)=>{
    const users=await User.find()
    res.send(users)
})


//POST request - SIGNUP
router.post("/users",async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save() 
        welcomeEmail(user.email,user.name)
        const token= await user.genAuthToken()

        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send({"Error: ":"Invalid Data",e})
    }
});

//POST request - LOG IN
router.post("/users/login",async (req,res)=>{
    try {
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.genAuthToken()

        if(!user){
            return res.status(404).send("Invalid Credentials")
        }

        res.status(201).send({user,token})

    } catch (error) {
        res.status(400).send(error)
    } 
});

//Midleware(Route): Second Argument
router.get("/users/me",auth,async(req,res)=>{
    console.log("Starting Router GET",req.user)
    res.send(req.user)
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

//PATCH urequest - USER
router.patch("/users/me",auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdatedArray=["name","age","email","password"]
    const isValid=updates.every((item)=> allowedUpdatedArray.includes(item))

    if(!isValid){
        return res.status(400).send("Error: Invalid Update Keys")
    }

    try {
        updates.forEach((item)=>req.user[item]=req.body[item])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(502).send(error)
    }
})

//POST request - USER LOG OUT
router.post("/users/logout",auth,async(req,res)=>{
    console.log("Logging Out")
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })        
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send("XD")
    }
})

router.post("/users/logoutAll",auth,async (req,res)=>{
    console.log("Logging Out All")

    try {
        const user=req.user
        user.tokens=[]
        await user.save()
        res.send()
    } catch (error) {
        res.status(500).send()

    }
})


//DELETE request - USERS
router.delete("/users/me",auth,async (req,res)=>{
    try {
        await req.user.remove()
        console.log(req.user.email,req.user.name)
        cancelEmail(req.user.email,req.user.name)
        res.send({"status":"Removed","user":req.user})
    } catch (error) {
        res.status(500).send({"Error":"Server Error",error})
    }
})

//POST request - IMAGES
router.post("/users/me/avatar",auth,uploadImg.single('avatar'),async (req,res)=>{
    //Option only valid, when not definind route in multer, so it is access in callback
    //req.user.avatar=req.file.buffer       //Save file as it arrived

    //Save with Modifications, with 'sharp'
    const buffer= await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send("Image Uploaded")
},
(error,req,res,next)=>{ 
    res.status(400).send({e:error.message})
});

//POST request - FILES
router.post("/users/me/pdf",auth,uploadPdf.single('pdf'), (req,res)=>{
    res.send("Text File Uploaded")
},
(error,req,res,next)=>{
    res.status(400).send({e:error.message})
})

//DELETE request - Avatar Image
router.delete("/users/me/avatar",auth,async (req,res)=>{
    try {
        req.user.avatar=undefined
        await req.user.save()
        res.send("Image Deleted")   
    } catch (error) {
        res.status(500).send("Server Error")
    }
})

//GET request - Fetch Image
router.get("/users/:id/avatar",async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error("No Data to Fetch")
        }

        //Response Header: key value pair
        //1. Name of the response Header
        //2. Value on it
        res.set("Content-Type","image/png")
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send(e.message)
    }
})

//Export to be Used
module.exports =router