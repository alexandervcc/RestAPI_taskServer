const mongoose=require("mongoose");
const validator = require('validator')

//SCHEMA


const Task=mongoose.model("Tasks",{
    description:{
        type:String,
        required:true,
        trim:true

    },
    state:{
        type:Boolean,
        default:false
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"    //Reference to another module
    }
},{
    times
})

module.exports=Task