/*const calcTip=(total,perc)=>{
    const tip=total*perc;
    return total+tip;
};
*/
const calcTip=(total,perc)=> total+total*perc;
    

const calcTipWrong=(total,perc)=>{
    const tip=total+perc;
    return total+tip;
};

const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0||b<0){
                return reject("Error, negative numbers")
            }
            resolve(a+b)
        },1000)
    })
};


module.exports={
    calcTip,
    calcTipWrong,
    add
}