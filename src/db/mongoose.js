const mongoose=require('mongoose')

console.log(process.env.MONGOURL)
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true
})

