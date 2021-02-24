const doWork= async ()=>{
    throw new Error("Something webt Wrong")
    return "Cosme Fulanito"
}



const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0||b<0){
                return reject("Error, negative numbers")
            }
            resolve(a+b)
        },1000)
    })
}

const doWork2=async()=>{
    //Wait for each operation, in order even though async happens behind
    const sum1=await add(1,3)
    const sum2=await add(sum1,5)
    const sum3=await add(sum2,10)

    return sum3 
}

doWork2().then((res)=>{
    console.log("RESULT: ",res)
}).catch((e)=>{
    //If error, in async -> Reject Promise that came back
    console.log("ERROR: ",e)
})

/*
console.log(doWork())

doWork().then((res)=>{
    console.log("RESULT: ",res)
}).catch((e)=>{
    //If error, in async -> Reject Promise that came back
    console.log("ERROR: ",e)
})
*/



/*
    async ->    Create async function
        Add 'async' to the function
            With this, it returns a 'Promise' fulfilled with Content

    If a Use the Promise {then} -> It will return in the result, the return
    from the function


    await ->    Use in the function
        Only be used in Async function


    EASY when usgin chainning Promises, so we chain through an await

*/