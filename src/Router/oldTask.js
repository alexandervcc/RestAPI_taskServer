const Task=require("../modules/task")
const express=require("express")
const router=new express.Router()



//POST request - TASKS
router.post("/tasks", (req,res)=>{
    const task=new Task(req.body);
    console.log(task)
    task.save().then(()=>{
        res.send(task)
    }).catch(()=>{
        res.status(400).send("Error")
    })
})

//GET request - TASKS
router.get("/tasks",(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.status(201).send(tasks)
    }).catch((e)=>{
        res.status(404).send("Nothing found")
    })
})

//GET request - One TASK
router.get("/tasks/:id",(req,res)=>{
    const _id=req.params.id;
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send("Task not Found")
        }
        res.status(202).send(task)
    }).catch(()=>{
        res.status(500).send("Conection Failed")
    })
})

//PATCH request - TASK
router.patch("/tasks/:id",async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdate=["description","state"]
    const isValid=updates.every((item)=>allowedUpdate.includes(item))

    if(!isValid){
        return res.status(400).send("Error: Invalid Keys")
    }

    try {
        const task= await Task.findById(req.params.id)

        updates.forEach((upd)=>tasl[upd]=req.params[upd])
        await task.save()
        //const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send("Not Found")
        }
        console.log("Updated")
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
        
    }
})


//DELETE request - TASKS
router.delete("/tasks/:id",async (req,res)=>{
   
    try {
        const task= await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send("No task")
        }    
        res.send(task)
        
    } catch (error) {
        res.status(500).send(error)        
    }
})


module.exports=router
