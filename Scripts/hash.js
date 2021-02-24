//HashExample
const bcryptjs=require("bcryptjs")

const func=async()=>{
    const password ="12345678"
    const hashPass=await bcryptjs.hash(password,8 )
    console.log("Hash: ",hashPass)

    const match=await bcryptjs.compare("12345678",hashPass)
    console.log(match)
}

func()