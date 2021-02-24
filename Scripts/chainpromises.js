const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0||b<0){
                return reject("Numbers must not be negative")
            }
            resolve(a+b)
        },2000)
    })
};

add(2,4).then((sum)=>{
    console.log(sum)
    return add(sum,4)
}).then((sum2)=>{
    console.log(sum2)
}).catch((e)=>{
    console.log(e)
})
