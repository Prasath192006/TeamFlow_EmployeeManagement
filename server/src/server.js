require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const AddUser = require("./User/AddUser.routes");
const {connectDb} = require("./mongodbConnection.js")
const port = process.env.PORT_NO;
const app = express();
app.use(cors())
connectDb().then(()=>{
  console.log("From server.js , Databases Connected successfully")


//middleware
app.use(express.json())   
  app.use("/api/LogIN",AddUser)


 
 
  app.listen(port,()=>{
      console.log("Server running at PORT:5000")
  })

}).catch((err) => {
  console.error('Failed to connect to databases:', err);
});



//mongoose
// mongoose.connect("mongodb+srv://EmployeeManagementTeamFlow:tf%4012345@c0.t9ucf.mongodb.net/UserDetails?retryWrites=true&w=majority&appName=C0")
// .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.log("connection failed",err);
//   });




//routes
