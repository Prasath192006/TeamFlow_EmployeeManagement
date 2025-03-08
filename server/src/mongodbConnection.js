const mongoose = require("mongoose")

const UserDetails = mongoose.createConnection("mongodb+srv://EmployeeManagementTeamFlow:tf%4012345@c0.t9ucf.mongodb.net/UserDetails?retryWrites=true&w=majority&appName=C0");
const TaskDetails = mongoose.createConnection("mongodb+srv://EmployeeManagementTeamFlow:tf%4012345@c0.t9ucf.mongodb.net/TaskDetails?retryWrites=true&w=majority&appName=C0");
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