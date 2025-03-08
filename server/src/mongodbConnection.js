require("dotenv").config();

const mongoose = require("mongoose")

const UserDetails = mongoose.createConnection(process.env.MONGO_DB_UserDetails_URI);
const TaskDetails = mongoose.createConnection(process.env.MONGO_DB_TaskDetails_URI);
const connectDb= ()=>{
   return new Promise((resolve,reject)=>{
    let userdb = false;
    let taskdb = false; 
   
    //userDetails  

    UserDetails.once('open',()=>{
        console.log("Connected to UserDetailsDB")
        userdb=true;
        if(userdb && taskdb)
            resolve();
    }).on('error',(err)=>{
    reject("Error in connecting to UserdetailsDb"+err)
    })

    //taskDetails 

    TaskDetails.once('open',()=>{ 
        console.log("Connected to TaskDetailsDB")
        taskdb=true;
        if(userdb && taskdb)
            resolve();
    }).on('error',(err)=>{
    reject("Error in connecting to TaskdetailsDb"+err)
    })
   })
}

module.exports ={ UserDetails,TaskDetails,connectDb};  