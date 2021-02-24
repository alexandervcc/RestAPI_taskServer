
const multer=require("multer")

const uploadImg = multer({
   // dest:"images/avatar/",
    limits:{
        fileSize: 2000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return callback(new Error("Only Images accepted"))
        }
        callback(undefined,true)
    }
})

module.exports=uploadImg