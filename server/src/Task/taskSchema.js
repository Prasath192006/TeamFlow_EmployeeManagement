const {TaskDetails} = require("../mongodbConnection.js")

const mongoose = require("mongoose")

const EmplTaskSchema = mongoose.Schema({
    userID:{
        type:String
    },
    taskID:{
        type: [String], 
    default: [] 
    }

},
{
    timestamps:true,
    collection: "EmplTask",

})

module.exports = EmployeeTaskModel = TaskDetails.model("EmployeeTaskModel",EmplTaskSchema);