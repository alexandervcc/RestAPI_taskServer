const mongodb=require('mongodb')

//functins for conection
const MongoClient=mongodb.MongoClient

//URL for database
const dbURL="mongodb://127.0.0.1:27017"
const dbName="task-manager"

//Coonect to Server
//  1. URL
//  2. Parse correctly to the server
//  3. Callback, when conected to database
MongoClient.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true},
    (err,cli)=>{
    if(err){
        return console.log("Error: ",err)
    }


    const db=cli.db(dbName)

    /*
    //tasks
    //database reference
    //Create collection, and insert 1 document 
    db.collection('users').insertOne({
        userName:"Cosme",
        age:23,
        roles:["User","Owner"]
    },(err,res)=>{
        if(err){
            return console.log("Cannot be saved")
        }
        //Array of documents
         console.log("Insertring: ",res.ops)
        

    })
    */
    /*
    //Insert many document(s)
    const obj=[{description:"Take children to School",completed:true},{description:"House reparations",completed:false}]
    db.collection('tasks').insertMany(obj,(err,res)=>{
        if(err){
            return console.log("Nothing inserted")
        }
        console.log("Inserting: ",res.ops)
    })
    */

    //Generating an ID
    const id=new mongodb.ObjectID()
    console.log(id)


    //Querying Documents
    db.collection("tasks").find({completed:true}).toArray(
        (err,res)=>{
            console.log("Found Many:")
            console.log(res)
        }
    )

    db.collection("tasks").findOne({completed:true},(err,res)=>{
        if(err){
            return console.log("Nothing cannot be recovered")
        }
        console.log("\nFoundOne:")
        console.log(res)
    })

    //Promises

})