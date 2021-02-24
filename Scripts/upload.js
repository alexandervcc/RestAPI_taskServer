const multer=require('multer')

const upload = multer({
    dest:"images"
})

app.post("/img",upload.single("upload"),(req,res)=>{
    res.send("ok")
})