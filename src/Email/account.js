const email=require("@sendgrid/mail");

email.setApiKey(process.env.API_SENDGRID)

//Object to specify email details

    
const welcomeEmail= function(dir,name){

    email.send({
        to:dir,
        from:"alex.charco@epn.edu.ec",
        subject:"Welcome Email",
        text:`Welcome ${name}, to Cheems Server`
        //,html:""
    })

    //Promise, only if I wanna wait for Email to be Sent
    /*.then(()=>{
        console.log("Dynamic Email Sent")
    }).catch((e)=>{
        console.log("Dynamei Email Error")
    })*/     
}

const cancelEmail=function(dir,name){
    email.send({
        to:dir,
        from:"alex.charco@epn.edu.ec",
        subject:"Cancelation Email",
        text:`Bye ${name}, we will miss you at Cheems Server`
        //,html:""
    })
}

module.exports={
    welcomeEmail,
    cancelEmail
}