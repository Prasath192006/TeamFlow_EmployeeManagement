const { TaskListModel , EmployeeTaskModel , VerifyTaskModel } = require("./taskSchema.js");
const AddUserModel = require("../User/AddUserSchema.js");
const mongoose = require("mongoose");


// ASSIGNING TASK
const assignTask = async (req, res) => {
  console.log("Inside assignTask api");
  console.log(req.body);
  const { taskTitle, taskDesc, dueDate, assignedTo, assignedBy, keyList } =  req.body;
  const taskList = await TaskListModel.create({
    taskTitle,
    taskDesc,
    keyList,
    dueDate,
    assignedBy,
  });
  console.log("Added to TaskList", taskList);
  const updateEmplTask = await EmployeeTaskModel.findOneAndUpdate(
    {assignedTo},
    { $push: { taskID: new mongoose.Types.ObjectId(taskList._id) } },
    { new: true}
  );

  console.log("Updated empltask collection", updateEmplTask);
};

//GET TASK TO DISPLAY ON EMPLOYEE PAGE

const getTask = async(req,res)=>{
  const {userID} = req.query;
console.log("Inside GetTask api",userID)

const userTasks = await EmployeeTaskModel.aggregate([
  {
    $match: { assignedTo: userID } // Filter by userID
  },
  // { 
  //   $set: { 
  //     taskID: { 
  //       $map: { input: "$taskID", as: "id", in: { $toObjectId: "$$id" } }
  //     } 
  //   } // Convert String taskID to ObjectId if necessary
  // },
  {
    $lookup: {
      from: "TaskList",
      localField: "taskID",
      foreignField: "_id",
      as: "taskDetails"
    }
  },
  {
    $project: {
      _id: 0,
      assignedTo: 1,
      taskDetails: 1
    }
  }
]);


res.json({message:"Data Fetched successfully",serverData:userTasks[0].taskDetails})
}


//ALL EMPLOYEE STATUS TO DISPLAY IN MANAGERS PAGE

const employeeStatus = async (req, res) => {
  try {
    // (Excluding Managers) from UserData
    const employees = await AddUserModel.find({ role: { $ne: "Manager" } });

    // Fetch task details for each employee
    const results = await Promise.all(
      employees.map(async (employee) => {
        // Find the employee's assigned tasks in EmplTask
        const assignedTask = await EmployeeTaskModel.findOne({ assignedTo: employee.userID });

        // If no tasks are found, return only user details
        if (!assignedTask || !assignedTask.taskID.length) {
          return {
            userID: employee.userID,
            name: employee.name,
            role: employee.role,
            logStatus: employee.logStatus || "Unknown",
            tasks: [{ taskTitle: "No Task Assigned", dueDate: "N/A" }],
          };
        }

        // Find all task details using $in operator (taskID is already ObjectId)
        const taskDetails = await TaskListModel.find({ _id: { $in: assignedTask.taskID } });

        // Return user details with all assigned task details
        return {
          userID: employee.userID,
          name: employee.name,
          role: employee.role,
          logStatus: employee.logStatus || "Unknown",
          tasks: taskDetails.length > 0
            ? taskDetails.map(task => ({
                taskTitle: task.taskTitle,
                dueDate: task.dueDate || "N/A",
              }))
            : [{ taskTitle: "Task Not Found", dueDate: "N/A" }],
        };
      })
    );

    //console.log("Employee Task Status:",JSON.stringify(results, null, 2));
      res.json({ success: true, data: results });

  } catch (err) {
      console.error("Error at employeeStatus:", err); 
      res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
}; 
 


//ADD TASK TO VERIFY TASK MODEL
const verifyTask = async(req,res)=>{
console.log("inside verifyTask") 
 const {managerID,taskID,emplDetails,link} = req.body;
 const newtaskID = new mongoose.Types.ObjectId(taskID);
 const today = new Date();
 try{
  //update TaskList
  const UpdatedData = await TaskListModel.findOneAndUpdate({_id:newtaskID} ,{completedOn:today})

  const storedData = await VerifyTaskModel.create({
   managerID,
   taskID:newtaskID,
   emplDetails,
   link
  })

  res.status(200).json({message:"Stored Successfully [verifyTask]"})
 
 }catch(err){
  res.status(402).json({message:"Error in storing Data in VerifyTask [verifyTask]"})

 }

}


const getVerificationStatus = async(req,res)=>{
try{
const verifyPendingData = await VerifyTaskModel.aggregate([
  {
    $lookup: {
      from: 'TaskList', // collection name in MongoDB (lowercase + plural)
      localField: 'taskID',
      foreignField: '_id',
      as: 'taskInfo'
    }
  },
  {
    $unwind: '$taskInfo' // Flatten the taskInfo array
  },
  {
    $project: {
      _id: 0,
      emplName: '$emplDetails.EmpName',
      emplID: '$emplDetails.EmpID',
      taskDescription: '$taskInfo.taskDesc',
      taskID:'$taskID',
      link:'$link',
      assignedDate: '$taskInfo.createdAt',
      completedOn: '$taskInfo.completedOn'

    }
  }
]); 

res.status(200).json(verifyPendingData);
} catch (error) {
console.error('Error fetching completed tasks:', error);
res.status(500).json({ message: 'Internal server error' });
}
}

//GET TASKDETAILS FOR TASK VERIFICATION
const getTaskDetails = async(req,res)=>{
  const taskID = new mongoose.Types.ObjectId(req.query.taskID);
  console.log("sdvsf--------------",taskID);
  try{
    const TaskDetails = await TaskListModel.findById(taskID,"taskTitle taskDesc  keyList assignedBy")
    res.status(200).json(TaskDetails);
    } catch (error) {
    console.error('Error fetching TaskDetails:', error);
    res.status(500).json({ message: 'Internal server error' }); 
    }
}




module.exports = { assignTask,getTask,employeeStatus,verifyTask,getVerificationStatus,getTaskDetails };
 