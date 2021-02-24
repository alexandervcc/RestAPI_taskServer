require("../db/mongoose")
const Task=require("../modules/task")
const User=require("../modules/user")
/*
Task.findByIdAndDelete("602f2bd3d69a3f3e5f2f11a8").then((task)=>{
    console.log("task: ", task)
    return Task.countDocuments({"state":true})
}).then((res)=>{
    console.log("Result: ",res)
}).catch((e)=>{
    console.log("Error: ",e)
})
*/

//ASYNC-AWAIT VERSION
const updateCount=async(id,age)=>{
    const user1=await User.findByIdAndUpdate(id,{"age":age})
    const user2=await User.countDocuments({"age":age})
    return user2
}

const deleteCount=async(id)=>{
    const del1=await Task.findByIdAndDelete(id)
    const del2=await Task.countDocuments({"state":false})
    return del2
}

updateCount("603025f68c5bf964e977cd74",99).then((count)=>{
    console.log("Count: ",count)
}).catch((e)=>{
    console.log("Error: ",e)
})

deleteCount("603015496d8fb853cb9a461a").then((count)=>{
    console.log("Count: ",count)
}).catch((e)=>{
    console.log("Error: ",e)
})