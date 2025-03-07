const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const AddUser = require("./User/AddUser.routes");


const app = express();
 

//middleware
app.use(express.json())
app.use(cors())

//mongoose
mongoose.connect("mongodb+srv://EmployeeManagementTeamFlow:tf%4012345@c0.t9ucf.mongodb.net/UserDetails?retryWrites=true&w=majority&appName=C0")
.then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("connection failed",err);
  });




//routes
app.use("/api/LogIN",AddUser)



 
app.listen(5000,()=>{
    console.log("Server running at PORT:5000")
})