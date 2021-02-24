const mongoose=require("mongoose");
const validator = require('validator')
const bcryptjs=require("bcryptjs")
const jwt = require("jsonwebtoken")

const Task=require("../modules/task")

//SCHEMA
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Age must be positive ")
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,    //Index in mongo to uniqueness
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }

    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(validator.contains(value.toLowerCase(),"password")){
                throw new Error("Invalid Password Content")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }],
    avatar:{
        type:Buffer     //Binary Image
    }
},{
    timestamps:true //Created-Updated
})

userSchema.virtual('tasks',{
    ref:"Task",
    localField:"_id",
    foreignField:"owner"
})

//METHODS
userSchema.methods.genAuthToken=async function (){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWTSECRET)

    user.tokens=user.tokens.concat({token})
    await user.save()

    return token
}


userSchema.methods.toJSON= function(){
    const user=this
    const userObject=user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials=async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        console.log("Unable to Log-Ing")
        return undefined
    }
    const isMatch=await bcryptjs.compare(password,user.password)
    if(!isMatch){
        console.log("Invalid Password")
        return undefined
    }
    return user
}

//HAshPassword
userSchema.pre("save",async function(next){
    const user=this
    if (user.isModified("password")) {
        user.password=await bcryptjs.hash(user.password,8)
    }
    next()
})

//Middleware - Deleta User+Tasks
userSchema.pre("remove",async function(next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model("User",userSchema)

module.exports=User