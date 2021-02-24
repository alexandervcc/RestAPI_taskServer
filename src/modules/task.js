const mongoose=require("mongoose");
const validator = require('validator')

//SCHEMA

const taskSchema = new mongoose.Schema({
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
    timestamps:true
})

const Task=mongoose.model("Task",taskSchema)

module.exports=Task