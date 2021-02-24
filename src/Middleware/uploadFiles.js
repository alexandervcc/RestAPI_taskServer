
const multer=require("multer");
const uploadImg = require("./uploadImages");


const uploadPdf = multer({
    dest:"images/PDF/",
    limits:{
        fileSize: 2000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(doc|docx|pdf)$/)){
            return callback(new Error("Invalid Format"))
        }
        callback(undefined,true)
    }
});


module.exports=uploadPdf