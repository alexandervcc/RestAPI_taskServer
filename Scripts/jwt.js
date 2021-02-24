const jwt=require("jsonwebtoken")

const func2=async()=>{
    //Token provide to the Client
    const token= jwt.sign({_id:"admin123"},"secret1",{expiresIn:"7 days"})
    //Sign:
        //1.Data embedded in token
        //2.Secret, to sign the token
    
    console.log("TOKEN: ",token)

    const data=   jwt.verify(token,"secret1")
    //1. Token a verificar
    //2. Secreto a usar

    console.log("Verific: ",data)
}

func2()