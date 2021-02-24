const email=require("@sendgrid/mail");

email.setApiKey(process.env.API_SENDGRID)

//Object to specify email details

const sendE=function(){
    
email.send({
    to:"alex.charco@epn.edu.ec",
    from:"alex.charco@epn.edu.ec",
    subject:"Que mas ve",
    text:"q+b",
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}).then(()=>{
    console.log("Email Sent")
}).catch((e)=>{
    console.log("Error: ")
})

}