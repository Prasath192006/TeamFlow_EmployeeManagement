const { TaskDetails } = require("../mongodbConnection.js");

const mongoose = require("mongoose");


const EmplTaskSchema = mongoose.Schema(
  {
    assignedTo: {
      type: String,
      required: true,
    },
    taskID: [
      {
       type: mongoose.Schema.Types.ObjectId, 
       ref: "TaskList" 
      }
      ], // Store as ObjectId[]
  },
  {
    timestamps: true,
    collection: "EmplTask",
  }
);

const EmployeeTaskModel = TaskDetails.model(
  "EmployeeTaskModel",
  EmplTaskSchema
);

const TaskListSchema = mongoose.Schema(
  {
    taskTitle: {
      type: String,
    },
    taskDesc: {
      type: String,
    },
    keyList: {
      type: [String],
      default: [],
    },
    dueDate: {
      type: Date,
    },
    assignedBy: {
      MuserID: { type: String, default: null },
      Mname: { type: String, default: null },
    },
    completedOn: {
      type: Date,
      default: null,
    },
    verifiedOn: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "TaskList",
  }
);

const TaskListModel = TaskDetails.model("TaskListModel", TaskListSchema);


//verifyTask

const verifyTaskSchema = mongoose.Schema({
  managerID:{
    type:String
  },
  taskID:{
    type:Object
  },
  emplDetails:{ 
    EmpName:{type:String},
    EmpID:{type:String} 
  },
  link:{
    type:String
  }
},
{
  timestamps: true,
  collection: "VerifyTask",
}
)
const VerifyTaskModel = TaskDetails.model("verifyTask", verifyTaskSchema);

module.exports = { EmployeeTaskModel, TaskListModel,VerifyTaskModel };
 