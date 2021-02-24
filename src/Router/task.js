require("../db/mongoose")
const Task=require("../modules/task")
const express=require("express")
const router=new express.Router()
const auth=require("../Middleware/auth")



//POST request - TASKS
router.post("/tasks",auth,async (req,res)=>{

    const task=new Task({
        ...req.body, // ... = copy value here
        owner:req.user._id
    })
    console.log(task)
     
    try {
        console.log("Svaing")
        await task.save()
        console.log("Saved")
        res.send(task)
    } catch (error) {
        res.status(500).send("Error")
    }
})


//GET request - ONE USER TASKS
router.get("/tasks/:id",auth, async (req,res)=>{
    const _id=req.params.id;

    try {
        const task=await Task.findOne({_id,owner:req.user._id})

        if(!task){
            res.status(404).send("No task")
        }

        res.send(task)

    } catch (error) {
        res.status(500).send("Server Error")
    }

})

//GET request - All User Tasks 
//  /tasks?completed=_
//  /tasks?limit=10&skip=10
//  /tasks?sortBy=createdAt:asc|des
router.get("/tasks",auth,async (req,res)=>{

    const match={}
    const sort={}

    if(req.query.completed){
        match.state=req.query.completed==='true'
    }
    
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(":")
        sort[parts[0]]= parts[1]==='desc' ? -1 : 1
    }

    console.log({
        "Sort": sort,
        "Completed":match,
        "limit":req.query.limit,
        "skip":req.query.skip
    })
    

    try {
       
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        
        if(!req.user.tasks){
            return res.status(404).send("No tasks for User")
        }

        res.send(req.user.tasks)

    } catch (error) {
        res.status(500).send("Server Error")
    }

})

//PATCH request - USER TASK
router.patch("/tasks/:id",auth,async (req,res)=>{
    console.log("Starting Update")
    const updates=Object.keys(req.body)
    const allowedUpdate=["description","state"]
    const isValid=updates.every((item)=>allowedUpdate.includes(item))

    if(!isValid){
        return res.status(400).send("Error: Invalid Keys")
    }

    console.log("Is valid")
    try {
        console.log("finding")
        const task= await Task.findOne({_id:req.params.id,owner:req.user._id})

        console.log("TASK: ",task)
        if(!task){
            return res.status(404).send("Not Found")
        }

        updates.forEach((upd)=>task[upd]=req.body[upd])
        await task.save()
        console.log("Updated")

        res.send(task)
    } catch (error) {
        res.status(400).send("Server Error")
        
    }
})


//DELETE request - TASKS
router.delete("/tasks/:id",auth,async (req,res)=>{
   
    try {
        const task= await Task.findByIdAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send("No task")
        }    
        res.send(task)
        
    } catch (error) {
        res.status(500).send(error)        
    }
})

//DELETE ALL TASKS


module.exports=router
