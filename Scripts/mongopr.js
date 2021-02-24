const mongodb=require("mongodb")

const MongoClient=mongodb.MongoClient


const dbURL="mongodb://127.0.0.1:27017"
const dbName="task-manager";

MongoClient.connect(dbURL,{useUnifiedTopology:true},(err,res)=>{
    if(err){
        return console.log("Cannot conect to Database")
    }

    const db=res.db(dbName)

  /*  const upUser=db.collection("users").updateOne(
        {
            _id: new mongodb.ObjectID("60255a12606748b917946bb4")   
        },
        {
            //SET: set a new value
            $set:{
                userName:"Fulanitos",
                age:39
            }
        })
        
       upUser.then((result)=>{
            console.log("SUCESS: ",result)
        }).catch((error)=>{
            console.log("ERROR: ",error)
        })


    db.collection("tasks").updateMany(
        {completed:false},
        {
            $set:{
                completed:true
            }
        }
    ).then((result)=>{
        console.log("SUCESS: "+result.modifiedCount)
    }).catch((error)=>{
        console.log("ERROR: "+error)
    })*/

    //DELETE DOCUMENTS
  /*  db.collection('users').deleteMany({
        age: 27
        }).then((result) => {
        console.log(result)
        }).catch((error) => {
        console.log(error)
        });
    */
    db.collection('tasks').deleteOne({
            description: "Clean House"
            }).then((result) => {
            console.log(result.deletedCount)
            }).catch((error) => {
            console.log(error)
            })

})
