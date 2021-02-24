//PROMISES
//Promsie constructor function, with 1 argument(arrow function with 2 arguments
//  resolve, reject)
//resolve,reject are 2 functions that acts according how things went
const doPromise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //returns the first one, nor compare to catch one 
        resolve([1,2,3])
        reject("Error")
    },2000)
});

//THEN: allow to register a function when things go well
//CATCH: register a function when rejected is call
doPromise.then((result)=>{
    console.log("Sucess",result)
}).catch((err)=>{
    console.log("Error:", err)
})


//CALLBACK
const doCall=(callback)=>{
    setTimeout(()=>{
        //callback("My error",undefined)
        callback(undefined,[1,2])
    },2000)
}
/*
doCall((err,res)=>{
    if(err){
        return console.log(err)
    }
    console.log(res)
})
*/