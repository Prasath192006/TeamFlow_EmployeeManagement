const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const AddUser = require("./Add User/AddUser.routes");


const app = express();


//middleware
app.use(express.json())
app.use(cors())

//mongoose
mongoose.connect("mongodb://localhost:27017/UserDetails")
.then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(() => {
    console.log("connection failed");
  });




//routes
app.use("/api/LogIN",AddUser)




app.listen(5000,()=>{
    console.log("Server running at PORT:5000")
})